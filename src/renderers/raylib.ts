import type { CanvasRenderer, Rgba } from "../index";

declare const RAYLIB_CANVAS_IMPORT_META_URL: string | undefined;

export interface RaylibCanvasWasmModule {
  readonly HEAPU8: Uint8Array;
  _rcl_init(width: number, height: number): number;
  _rcl_destroy(handle: number): void;
  _rcl_fill_rect(
    handle: number,
    x: number,
    y: number,
    width: number,
    height: number,
    red: number,
    green: number,
    blue: number,
    alpha: number
  ): void;
  _rcl_clear_rect(handle: number, x: number, y: number, width: number, height: number): void;
  _rcl_pixels_ptr(handle: number): number;
  _rcl_pixels_len(handle: number): number;
}

export interface RaylibCanvasWasmModuleFactoryOptions {
  locateFile?(path: string, prefix: string): string;
  wasmBinary?: Uint8Array;
}

export type RaylibCanvasWasmModuleFactory = (
  options?: RaylibCanvasWasmModuleFactoryOptions
) => RaylibCanvasWasmModule | Promise<RaylibCanvasWasmModule>;

export interface RaylibCanvasModuleLoadOptions {
  module?: RaylibCanvasWasmModule | Promise<RaylibCanvasWasmModule> | RaylibCanvasWasmModuleFactory;
  moduleUrl?: string | URL;
}

export interface RaylibCanvasRendererOptions extends RaylibCanvasModuleLoadOptions {}

export class RaylibCanvasRenderer implements CanvasRenderer {
  readonly width: number;
  readonly height: number;
  readonly #module: RaylibCanvasWasmModule;
  #handle: number;
  #pixelPointer: number;
  #pixelLength: number;
  #pixels: Uint8ClampedArray;

  constructor(width: number, height: number, module: RaylibCanvasWasmModule) {
    assertPositiveInteger(width, "width");
    assertPositiveInteger(height, "height");

    this.width = width;
    this.height = height;
    this.#module = module;
    this.#handle = module._rcl_init(width, height);

    if (this.#handle === 0) {
      throw new Error("raylib renderer allocation failed");
    }

    this.#pixelPointer = module._rcl_pixels_ptr(this.#handle);
    this.#pixelLength = module._rcl_pixels_len(this.#handle);

    if (this.#pixelPointer === 0 || this.#pixelLength !== width * height * 4) {
      module._rcl_destroy(this.#handle);
      this.#handle = 0;
      throw new Error("raylib renderer returned an invalid pixel buffer");
    }

    this.#pixels = this.#createPixelsView();
  }

  fillRect(x: number, y: number, width: number, height: number, color: Rgba): void {
    this.#assertNotDisposed();
    this.#module._rcl_fill_rect(this.#handle, x, y, width, height, color[0], color[1], color[2], color[3]);
    this.#refreshPixelsView();
  }

  clearRect(x: number, y: number, width: number, height: number): void {
    this.#assertNotDisposed();
    this.#module._rcl_clear_rect(this.#handle, x, y, width, height);
    this.#refreshPixelsView();
  }

  getPixels(): Uint8ClampedArray {
    this.#assertNotDisposed();
    this.#refreshPixelsView();
    return this.#pixels;
  }

  dispose(): void {
    if (this.#handle === 0) {
      return;
    }

    this.#module._rcl_destroy(this.#handle);
    this.#handle = 0;
    this.#pixelPointer = 0;
    this.#pixelLength = 0;
    this.#pixels = new Uint8ClampedArray();
  }

  #createPixelsView(): Uint8ClampedArray {
    return new Uint8ClampedArray(this.#module.HEAPU8.buffer, this.#pixelPointer, this.#pixelLength);
  }

  #refreshPixelsView(): void {
    if (this.#pixels.buffer !== this.#module.HEAPU8.buffer) {
      this.#pixels = this.#createPixelsView();
    }
  }

  #assertNotDisposed(): void {
    if (this.#handle === 0) {
      throw new Error("raylib renderer has been disposed");
    }
  }
}

export async function createRaylibCanvasRenderer(
  width: number,
  height: number,
  options: RaylibCanvasRendererOptions = {}
): Promise<RaylibCanvasRenderer> {
  const module = await loadRaylibCanvasModule(options);
  return new RaylibCanvasRenderer(width, height, module);
}

export async function loadRaylibCanvasModule(
  options: RaylibCanvasModuleLoadOptions = {}
): Promise<RaylibCanvasWasmModule> {
  if (options.module) {
    const provided = await options.module;

    if (isRaylibCanvasWasmModule(provided)) {
      return provided;
    }

    return instantiateRaylibModule(provided, options.moduleUrl);
  }

  return loadDefaultRaylibModule(options.moduleUrl);
}

async function loadDefaultRaylibModule(moduleUrl?: string | URL): Promise<RaylibCanvasWasmModule> {
  const explicitUrl = moduleUrl ? [toUrl(moduleUrl)] : [];
  const candidates = [...explicitUrl, ...defaultRaylibModuleUrls()];
  let lastError: unknown;

  for (const candidate of candidates) {
    try {
      const namespace = (await import(/* @vite-ignore */ candidate.href)) as { default?: unknown };
      const factory = namespace.default;

      if (typeof factory !== "function") {
        throw new Error(`raylib WASM module at ${candidate.href} did not export a factory`);
      }

      return instantiateRaylibModule(factory as RaylibCanvasWasmModuleFactory, candidate);
    } catch (error) {
      lastError = error;
    }
  }

  const error = new Error(
    "Could not load raylib WASM module. Run `npm run build:raylib-wasm` first, or pass `module`/`moduleUrl` to `createRaylibCanvasRenderer()`."
  );
  (error as Error & { cause?: unknown }).cause = lastError;
  throw error;
}

async function instantiateRaylibModule(
  factory: RaylibCanvasWasmModuleFactory,
  moduleUrl?: string | URL
): Promise<RaylibCanvasWasmModule> {
  const resolvedModuleUrl = moduleUrl ? toUrl(moduleUrl) : undefined;
  const wasmBinary = await loadNodeWasmBinary(resolvedModuleUrl);
  const module = await factory({
    ...(wasmBinary ? { wasmBinary } : {}),
    locateFile(path, prefix) {
      if (resolvedModuleUrl && path.endsWith(".wasm")) {
        return new URL(path, resolvedModuleUrl).href;
      }

      return `${prefix}${path}`;
    }
  });

  if (!isRaylibCanvasWasmModule(module)) {
    throw new Error("raylib WASM factory returned an incompatible module");
  }

  return module;
}

async function loadNodeWasmBinary(moduleUrl?: URL): Promise<Uint8Array | undefined> {
  if (!moduleUrl || moduleUrl.protocol !== "file:" || !isNodeLike()) {
    return undefined;
  }

  const wasmUrl = new URL("raylib-canvas.wasm", moduleUrl);
  const nodeFsPromises = "node:fs/promises";
  const { readFile } = (await import(nodeFsPromises)) as {
    readFile(path: URL): Promise<Uint8Array>;
  };

  return new Uint8Array(await readFile(wasmUrl));
}

function defaultRaylibModuleUrls(): URL[] {
  const metaUrl = getImportMetaUrl();
  const urls: URL[] = [];

  if (metaUrl) {
    urls.push(
      new URL("./native/raylib-canvas.js", metaUrl),
      new URL("../native/raylib-canvas.js", metaUrl),
      new URL("../../dist/native/raylib-canvas.js", metaUrl)
    );
  }

  const cwdUrl = getNodeCwdUrl();
  if (cwdUrl) {
    urls.push(new URL("dist/native/raylib-canvas.js", cwdUrl));
  }

  return urls;
}

function getImportMetaUrl(): string | undefined {
  return typeof RAYLIB_CANVAS_IMPORT_META_URL === "string" ? RAYLIB_CANVAS_IMPORT_META_URL : undefined;
}

function toUrl(value: string | URL): URL {
  return value instanceof URL ? value : new URL(value, getImportMetaUrl() ?? getNodeCwdUrl());
}

function getNodeCwdUrl(): URL | undefined {
  const processLike = (globalThis as { process?: { cwd?: () => string } }).process;

  if (typeof processLike?.cwd !== "function") {
    return undefined;
  }

  let path = processLike.cwd().replace(/\\/g, "/");
  if (/^[A-Za-z]:\//.test(path)) {
    path = `/${path}`;
  }
  if (!path.endsWith("/")) {
    path += "/";
  }

  return new URL(`file://${path}`);
}

function isNodeLike(): boolean {
  const processLike = (globalThis as { process?: { versions?: { node?: string } } }).process;
  return typeof processLike?.versions?.node === "string";
}

function isRaylibCanvasWasmModule(value: unknown): value is RaylibCanvasWasmModule {
  const candidate = value as RaylibCanvasWasmModule;
  return (
    typeof candidate === "object" &&
    candidate !== null &&
    candidate.HEAPU8 instanceof Uint8Array &&
    typeof candidate._rcl_init === "function" &&
    typeof candidate._rcl_destroy === "function" &&
    typeof candidate._rcl_fill_rect === "function" &&
    typeof candidate._rcl_clear_rect === "function" &&
    typeof candidate._rcl_pixels_ptr === "function" &&
    typeof candidate._rcl_pixels_len === "function"
  );
}

function assertPositiveInteger(value: number, label: string): void {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${label} must be a positive integer`);
  }
}
