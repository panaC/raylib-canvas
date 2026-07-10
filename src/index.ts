import { PNG } from "pngjs";
import {
  Canvas2DRenderingContext,
  CanvasGradient,
  CanvasImageData,
  CanvasPattern,
  CanvasPath2D,
  CanvasTextMetrics,
  CanvasTransformMatrix,
  type Canvas2DContext
} from "./context";
import { JavascriptCanvas2DContext } from "./renderers/javascript";

export interface CreateCanvasOptions {
  context?: Canvas2DContextFactory;
  pngEncoder?: PngEncoder;
}

export type Canvas2DContextFactory = (canvas: Canvas) => Canvas2DContext;

export interface PngEncoder {
  encode(image: PngImage): Uint8Array;
}

export interface PngImage {
  readonly width: number;
  readonly height: number;
  readonly data: Uint8ClampedArray;
}

export async function createCanvas(
  width: number,
  height: number,
  options: CreateCanvasOptions = {}
): Promise<Canvas> {
  return new Canvas(width, height, options);
}

export class Canvas {
  /**
   * Canvas bitmap width.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-canvas-width-dev
   */
  readonly width: number;

  /**
   * Canvas bitmap height.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-canvas-height-dev
   */
  readonly height: number;

  readonly #createContext: Canvas2DContextFactory;
  readonly #pngEncoder: PngEncoder;
  #context: Canvas2DContext | undefined;

  constructor(width: number, height: number, options: CreateCanvasOptions = {}) {
    assertPositiveInteger(width, "width");
    assertPositiveInteger(height, "height");

    this.width = width;
    this.height = height;
    this.#createContext = options.context ?? ((canvas) => new JavascriptCanvas2DContext(canvas));
    this.#pngEncoder = options.pngEncoder ?? new PngJsEncoder();
  }

  /**
   * Returns the rendering context for the requested context id.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-canvas-getcontext-dev
   */
  getContext(contextId: "2d", options?: unknown): Canvas2DContext;
  getContext(contextId: string, options?: unknown): Canvas2DContext | null;
  getContext(contextId: string, _options: unknown = null): Canvas2DContext | null {
    if (contextId !== "2d") {
      return null;
    }

    if (!this.#context) {
      const context = this.#createContext(this);

      if (context.canvas !== this) {
        throw new Error("2d context factory must return a context bound to this canvas");
      }

      this.#context = context;
    }

    return this.#context;
  }

  /**
   * Encodes the canvas bitmap to a Blob.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-canvas-toblob-dev
   */
  toBlob(callback: (blob: Blob | null) => void, type = "image/png", _quality?: number): void {
    queueMicrotask(() => {
      const encoded = this.#encodeImage(type);
      callback(new Blob([toArrayBuffer(encoded.bytes)], { type: encoded.type }));
    });
  }

  /**
   * Encodes the canvas bitmap to a data URL.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-canvas-todataurl-dev
   */
  toDataURL(type = "image/png", _quality?: number): string {
    const encoded = this.#encodeImage(type);
    return `data:${encoded.type};base64,${bytesToBase64(encoded.bytes)}`;
  }

  #encodeImage(_type: string): { type: "image/png"; bytes: Uint8Array } {
    const context = this.getContext("2d");

    return {
      type: "image/png",
      bytes: this.#pngEncoder.encode({
        width: this.width,
        height: this.height,
        data: context.getPixels()
      })
    };
  }
}

export class PngJsEncoder implements PngEncoder {
  encode(image: PngImage): Uint8Array {
    const png = new PNG({
      width: image.width,
      height: image.height
    });

    png.data.set(image.data);
    return PNG.sync.write(png);
  }
}

export {
  Canvas2DRenderingContext,
  CanvasGradient,
  CanvasImageData,
  CanvasPattern,
  CanvasPath2D,
  CanvasTextMetrics,
  CanvasTransformMatrix,
  JavascriptCanvas2DContext
};
export {
  createRaylibCanvas2DContextFactory,
  loadRaylibCanvasModule,
  RaylibCanvas2DContext
} from "./renderers/raylib";
export type { Canvas2DContext, Rgba } from "./context";
export type {
  RaylibCanvas2DContextOptions,
  RaylibCanvasModuleLoadOptions,
  RaylibCanvasWasmModule,
  RaylibCanvasWasmModuleFactory,
  RaylibCanvasWasmModuleFactoryOptions
} from "./renderers/raylib";

function assertPositiveInteger(value: number, label: string): void {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${label} must be a positive integer`);
  }
}

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  return copy.buffer;
}

function bytesToBase64(bytes: Uint8Array): string {
  const bufferConstructor = (globalThis as { Buffer?: { from(bytes: Uint8Array): { toString(encoding: "base64"): string } } })
    .Buffer;

  if (bufferConstructor) {
    return bufferConstructor.from(bytes).toString("base64");
  }

  let binary = "";
  const chunkSize = 0x8000;

  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }

  return btoa(binary);
}
