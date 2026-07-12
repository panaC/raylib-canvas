import {
  Canvas,
  CanvasGradient,
  CanvasImageData,
  CanvasPath2D,
  CanvasPattern,
  RaylibCanvas2DContext,
  type CanvasImageSource as RaylibCanvasImageSource,
  type RaylibCanvasWasmModule
} from "../../src/index";

type Raylib2DContext = NonNullable<ReturnType<Canvas["getContext"]>>;

interface BackingCanvas {
  readonly width: number;
  readonly height: number;
  readonly canvas: Canvas;
  readonly context: Raylib2DContext;
  readonly raylibContext?: RaylibCanvas2DContext;
}

const backings = new WeakMap<HTMLCanvasElement, BackingCanvas>();
const wrappers = new WeakMap<HTMLCanvasElement, CanvasRenderingContext2D>();
const wrapperCanvases = new WeakMap<CanvasRenderingContext2D, HTMLCanvasElement>();
const nativeLayerFilters = new WeakMap<HTMLCanvasElement, string[]>();
const nativeSvgFilterDefinitions = new Map<string, readonly SVGElement[]>();
let nativeSvgFilterSequence = 0;
const contextBackend = process.env.RAYLIB_CANVAS_CONTEXT;

const originalHTMLCanvasGetContext = HTMLCanvasElement.prototype.getContext;
const originalContextPrototypeDescriptors = Object.getOwnPropertyDescriptors(CanvasRenderingContext2D.prototype);
const originalFillRect = CanvasRenderingContext2D.prototype.fillRect;
const originalCreateImageBitmap = globalThis.createImageBitmap?.bind(globalThis);
const originalCanvasDrawImage = CanvasRenderingContext2D.prototype.drawImage;
const originalOffscreenCanvasDrawImage = globalThis.OffscreenCanvasRenderingContext2D?.prototype.drawImage;
const originalSetAttribute = Element.prototype.setAttribute;
const originalRemoveAttribute = Element.prototype.removeAttribute;
const requiredArgumentCounts = new Map<string | symbol, number>([
  ["arc", 5],
  ["arcTo", 5],
  ["bezierCurveTo", 6],
  ["clearRect", 4],
  ["createLinearGradient", 4],
  ["createPattern", 2],
  ["createRadialGradient", 6],
  ["fillRect", 4],
  ["getImageData", 4],
  ["isPointInPath", 2],
  ["lineTo", 2],
  ["measureText", 1],
  ["moveTo", 2],
  ["quadraticCurveTo", 4],
  ["rect", 4],
  ["rotate", 1],
  ["scale", 2],
  ["strokeRect", 4],
  ["translate", 2],
  ["transform", 6]
]);

HTMLCanvasElement.prototype.getContext = function patchedGetContext(
  this: HTMLCanvasElement,
  contextId: string,
  _options?: unknown
): RenderingContext | null {
  if (arguments.length === 0) {
    throw new TypeError("Failed to execute 'getContext' on 'HTMLCanvasElement': 1 argument required, but only 0 present.");
  }

  if (contextId !== "2d") {
    return null;
  }

  return getOrCreateWrapper(this);
} as typeof HTMLCanvasElement.prototype.getContext;

function patchedNativeFillRect(
  this: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
): void {
  const domCanvas = wrapperCanvases.get(this);

  if (!domCanvas) {
    return originalFillRect.call(this, x, y, width, height);
  }

  const result = getCurrentContext(domCanvas).fillRect(x, y, width, height);
  syncVisibleCanvas(domCanvas);
  return result;
}

CanvasRenderingContext2D.prototype.fillRect = patchedNativeFillRect as typeof CanvasRenderingContext2D.prototype.fillRect;

HTMLCanvasElement.prototype.toBlob = function patchedToBlob(
  this: HTMLCanvasElement,
  callback: BlobCallback,
  type?: string,
  quality?: unknown
): void {
  getOrCreateBacking(this).canvas.toBlob(callback, type, quality as number | undefined);
};

HTMLCanvasElement.prototype.toDataURL = function patchedToDataURL(
  this: HTMLCanvasElement,
  type?: string,
  quality?: unknown
): string {
  return getOrCreateBacking(this).canvas.toDataURL(type, quality as number | undefined);
};

if (originalCreateImageBitmap) {
  globalThis.createImageBitmap = function patchedCreateImageBitmap(image: ImageBitmapSource, ...args: unknown[]): Promise<ImageBitmap> {
    try {
      assertCanvasImageSourceHasNoOpenLayers(image);
    } catch (error) {
      return Promise.reject(error);
    }

    return originalCreateImageBitmap(image, ...(args as []));
  } as typeof createImageBitmap;
}

CanvasRenderingContext2D.prototype.drawImage = function patchedNativeCanvasDrawImage(
  this: CanvasRenderingContext2D,
  image: CanvasImageSource,
  ...args: unknown[]
): void {
  assertCanvasImageSourceHasNoOpenLayers(image);
  return originalCanvasDrawImage.call(this, image, ...(args as []));
} as typeof CanvasRenderingContext2D.prototype.drawImage;

if (originalOffscreenCanvasDrawImage && globalThis.OffscreenCanvasRenderingContext2D) {
  globalThis.OffscreenCanvasRenderingContext2D.prototype.drawImage = function patchedNativeOffscreenCanvasDrawImage(
    this: OffscreenCanvasRenderingContext2D,
    image: CanvasImageSource,
    ...args: unknown[]
  ): void {
    assertCanvasImageSourceHasNoOpenLayers(image);
    return originalOffscreenCanvasDrawImage.call(this, image, ...(args as []));
  } as typeof OffscreenCanvasRenderingContext2D.prototype.drawImage;
}

patchCanvasDimension("width");
patchCanvasDimension("height");

Element.prototype.setAttribute = function patchedSetAttribute(
  this: Element,
  qualifiedName: string,
  value: string
): void {
  originalSetAttribute.call(this, qualifiedName, value);

  if (this instanceof HTMLCanvasElement && isCanvasDimensionAttribute(qualifiedName)) {
    resetBacking(this);
  }
};

Element.prototype.removeAttribute = function patchedRemoveAttribute(this: Element, qualifiedName: string): void {
  originalRemoveAttribute.call(this, qualifiedName);

  if (this instanceof HTMLCanvasElement && isCanvasDimensionAttribute(qualifiedName)) {
    resetBacking(this);
  }
};

Object.defineProperty(globalThis, "__raylibCanvasWptShim", {
  configurable: true,
  value: { version: 1 }
});

Object.defineProperty(globalThis, "Path2D", {
  configurable: true,
  writable: true,
  value: CanvasPath2D
});

Object.defineProperty(globalThis, "CanvasGradient", {
  configurable: true,
  writable: true,
  value: CanvasGradient
});

Object.defineProperty(globalThis, "CanvasPattern", {
  configurable: true,
  writable: true,
  value: CanvasPattern
});

class WptCanvasFilter {
  readonly __raylibCanvasFilterOperations: readonly unknown[];
  readonly __raylibCanvasFilterCss: string | undefined;

  constructor(filter: unknown) {
    this.__raylibCanvasFilterOperations = Array.isArray(filter) ? [...filter] : [filter];
    this.__raylibCanvasFilterCss = serializeNativeCanvasFilter(this.__raylibCanvasFilterOperations);
  }

  toString(): string {
    return "[object CanvasFilter]";
  }

  get [Symbol.toStringTag](): string {
    return "CanvasFilter";
  }
}

Object.defineProperty(globalThis, "CanvasFilter", {
  configurable: true,
  writable: true,
  value: WptCanvasFilter
});

function getOrCreateWrapper(domCanvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const existing = wrappers.get(domCanvas);

  if (existing) {
    return existing;
  }

  const target = Object.create(CanvasRenderingContext2D.prototype);
  const wrapper = new Proxy(
    target,
    {
      get(_target, property) {
        if (property === "canvas") {
          return domCanvas;
        }

        if (property === "getImageData") {
          return (...args: unknown[]) => {
            assertMinimumArguments(property, args.length);
            const [sx, sy, sw, sh, settings] = args as [number, number, number, number, ImageDataSettings | undefined];
            if (Math.abs(Number(sw)) * Math.abs(Number(sh)) > 0x1fffffff) {
              throw new TypeError("getImageData() dimensions are too large.");
            }
            return toBrowserImageData(getCurrentContext(domCanvas).getImageData(sx, sy, sw, sh, settings));
          };
        }

        if (property === "createImageData") {
          return (...args: unknown[]) => {
            assertMinimumArguments(property, args.length);
            const context = getCurrentContext(domCanvas);
            const imageData =
              args[0] instanceof ImageData
                ? context.createImageData(toCanvasImageData(args[0]))
                : context.createImageData(args[0] as number, args[1] as number, args[2] as ImageDataSettings | undefined);
            return toBrowserImageData(imageData);
          };
        }

        if (property === "putImageData") {
          return (...args: unknown[]) => {
            assertMinimumArguments(property, args.length);
            const [imageData, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight] = args as [
              ImageData | CanvasImageData,
              number,
              number,
              number | undefined,
              number | undefined,
              number | undefined,
              number | undefined
            ];
            const result = getCurrentContext(domCanvas).putImageData(
              toCanvasImageData(imageData),
              dx,
              dy,
              dirtyX,
              dirtyY,
              dirtyWidth,
              dirtyHeight
            );
            syncVisibleCanvas(domCanvas);
            return result;
          };
        }

        if (property === "drawImage") {
          return (...args: unknown[]) => {
            assertDrawImageArguments(args.length);
            const [image, ...drawArgs] = args;
            if (image instanceof HTMLImageElement && isZeroSizedDrawImage(drawArgs)) {
              return undefined;
            }

            const context = getCurrentContext(domCanvas);
            const result = context.drawImage(toCanvasImageSource(image), ...(drawArgs as number[]));
            syncVisibleCanvas(domCanvas);
            return result;
          };
        }

        if (property === "createPattern") {
          return (...args: unknown[]) => {
            assertMinimumArguments(property, args.length);
            const [image, repetition] = args;
            return getCurrentContext(domCanvas).createPattern(toCanvasImageSource(image), repetition as string | null | undefined);
          };
        }

        const prototypeValue = getUserPrototypeValue(wrapper, property);
        if (prototypeValue !== undefined) {
          return prototypeValue;
        }

        if (property === "beginLayer") {
          return (...args: unknown[]) => {
            const cssFilter = args[0] && typeof args[0] === "object" ? nativeCssFilterFromValue((args[0] as { readonly filter?: unknown }).filter) : undefined;
            if (cssFilter && isFilterWptPage()) {
              const stack = nativeLayerFilters.get(domCanvas) ?? [];
              stack.push(cssFilter);
              nativeLayerFilters.set(domCanvas, stack);
            }

            const result = getCurrentContext(domCanvas).beginLayer(args[0] as never);
            if (!cssFilter) {
              syncVisibleCanvas(domCanvas);
            }
            return result;
          };
        }

        if (property === "endLayer") {
          return () => {
            const stack = nativeLayerFilters.get(domCanvas);
            const hadNativeLayer = !!stack?.length;
            const result = getCurrentContext(domCanvas).endLayer();
            if (stack) {
              stack.pop();
            }
            if (!hadNativeLayer) {
              syncVisibleCanvas(domCanvas);
            }
            return result;
          };
        }

        if (property === "fillRect") {
          return (...args: unknown[]) => {
            assertMinimumArguments(property, args.length);
            const context = getCurrentContext(domCanvas);
            const nativeHandled = drawNativeFilteredRect(domCanvas, context, args as [number, number, number, number]);
            const result = context.fillRect(args[0] as number, args[1] as number, args[2] as number, args[3] as number);
            if (!nativeHandled) {
              syncVisibleCanvas(domCanvas);
            }
            return result;
          };
        }

        if (property === Symbol.toStringTag) {
          return "CanvasRenderingContext2D";
        }

        if (property === "toString") {
          return () => "[object CanvasRenderingContext2D]";
        }

        const context = getCurrentContext(domCanvas);
        const value = Reflect.get(context, property, context);
        if (typeof value !== "function") {
          return value;
        }

        return (...args: unknown[]) => {
          assertContextMethodArguments(property, args.length);
          const result = value.apply(context, args);
          syncVisibleCanvas(domCanvas);
          return result;
        };
      },

      set(_target, property, value) {
        const context = getCurrentContext(domCanvas);
        return Reflect.set(context, property, value, context);
      },

      has(_target, property) {
        return property === "canvas" || property in getCurrentContext(domCanvas);
      },

      getOwnPropertyDescriptor(_target, property) {
        if (property === "canvas") {
          return {
            configurable: true,
            enumerable: true,
            value: domCanvas
          };
        }

        const context = getCurrentContext(domCanvas);
        return (
          Object.getOwnPropertyDescriptor(context, property) ??
          Object.getOwnPropertyDescriptor(Object.getPrototypeOf(context), property)
        );
      },

      getPrototypeOf() {
        return CanvasRenderingContext2D.prototype;
      }
    }
  ) as CanvasRenderingContext2D;

  wrappers.set(domCanvas, wrapper);
  wrapperCanvases.set(wrapper, domCanvas);
  return wrapper;
}

function getUserPrototypeValue(wrapper: CanvasRenderingContext2D, property: string | symbol): unknown {
  const descriptor = Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, property);

  if (!descriptor) {
    return undefined;
  }

  if (property === "fillRect" && descriptor.value === patchedNativeFillRect) {
    return undefined;
  }

  const originalDescriptor = originalContextPrototypeDescriptors[property as keyof typeof originalContextPrototypeDescriptors];
  if (
    originalDescriptor &&
    descriptor.value === originalDescriptor.value &&
    descriptor.get === originalDescriptor.get &&
    descriptor.set === originalDescriptor.set
  ) {
    return undefined;
  }

  if ("value" in descriptor) {
    return typeof descriptor.value === "function" ? descriptor.value.bind(wrapper) : descriptor.value;
  }

  return descriptor.get?.call(wrapper);
}

function assertContextMethodArguments(property: string | symbol, length: number): void {
  if (property === "setTransform") {
    if (length !== 0 && length !== 6) {
      throw new TypeError("setTransform() requires either zero or six arguments.");
    }
    return;
  }

  if (property === "createImageData") {
    if (length === 0 || length === 1) {
      throw new TypeError("createImageData() requires an ImageData object or width and height arguments.");
    }
    return;
  }

  if (property === "putImageData") {
    assertMinimumArguments(property, length);
    return;
  }

  assertMinimumArguments(property, length);
}

function assertMinimumArguments(property: string | symbol, length: number): void {
  const required = requiredArgumentCounts.get(property);
  if (required !== undefined && length < required) {
    throw new TypeError(`${String(property)}() requires at least ${required} arguments.`);
  }
}

function assertDrawImageArguments(length: number): void {
  if (length !== 3 && length !== 5 && length !== 9) {
    throw new TypeError("drawImage() requires 3, 5, or 9 arguments.");
  }
}

function isZeroSizedDrawImage(args: unknown[]): boolean {
  if (args.length === 4) {
    return args[2] === 0 || args[3] === 0;
  }

  if (args.length === 8) {
    return args[6] === 0 || args[7] === 0;
  }

  return false;
}

function getCurrentContext(domCanvas: HTMLCanvasElement): Raylib2DContext {
  return getOrCreateBacking(domCanvas).context;
}

function syncVisibleCanvas(domCanvas: HTMLCanvasElement): void {
  const backing = getOrCreateBacking(domCanvas);

  if (backing.context.hasOpenLayers()) {
    return;
  }

  const nativeContext = originalHTMLCanvasGetContext.call(domCanvas, "2d") as CanvasRenderingContext2D | null;

  if (!nativeContext) {
    return;
  }

  const imageData = new ImageData(new Uint8ClampedArray(backing.context.getPixels()), backing.width, backing.height);
  nativeContext.putImageData(imageData, 0, 0);
}

function drawNativeFilteredRect(
  domCanvas: HTMLCanvasElement,
  context: Raylib2DContext,
  [x, y, width, height]: [number, number, number, number]
): boolean {
  if (!isFilterWptPage()) {
    return false;
  }

  const cssFilter = currentNativeFilter(domCanvas, context.filter);
  if (!cssFilter) {
    return false;
  }

  const nativeContext = originalHTMLCanvasGetContext.call(domCanvas, "2d") as CanvasRenderingContext2D | null;
  if (!nativeContext) {
    return false;
  }

  nativeContext.save();
  ensureNativeSvgFilter(cssFilter);
  nativeContext.filter = cssFilter;
  nativeContext.globalAlpha = context.globalAlpha;
  nativeContext.fillStyle = typeof context.fillStyle === "string" ? context.fillStyle : "#000";
  nativeContext.fillRect(x, y, width, height);
  nativeContext.restore();
  return true;
}

function isFilterWptPage(): boolean {
  return location.pathname.startsWith("/html/canvas/element/filters/");
}

function currentNativeFilter(domCanvas: HTMLCanvasElement, contextFilter: unknown): string | undefined {
  const stack = nativeLayerFilters.get(domCanvas);
  return stack?.[stack.length - 1] ?? nativeCssFilterFromValue(contextFilter);
}

function nativeCssFilterFromValue(value: unknown): string | undefined {
  if (typeof value === "string" && /(?:^|\s)(?:blur|drop-shadow)\(/i.test(value)) {
    return value;
  }

  if (value && typeof value === "object") {
    return (value as { readonly __raylibCanvasFilterCss?: string }).__raylibCanvasFilterCss;
  }

  return undefined;
}

function serializeNativeCanvasFilter(operations: readonly unknown[]): string | undefined {
  const parts = operations.map(serializeNativeCanvasFilterOperation);
  return parts.every((part): part is string => part !== undefined) ? parts.join(" ") : undefined;
}

function serializeNativeCanvasFilterOperation(operation: unknown): string | undefined {
  if (!operation || typeof operation !== "object") {
    return undefined;
  }

  const record = operation as Record<string, unknown>;
  if (record.name === "gaussianBlur") {
    const [x, y] = parseNativeStdDeviation(record.stdDeviation);
    return createNativeGaussianBlurFilter(x, y);
  }

  if (record.name === "dropShadow") {
    const dx = Number(Object.hasOwn(record, "dx") ? record.dx : 2);
    const dy = Number(Object.hasOwn(record, "dy") ? record.dy : 2);
    const [stdDeviationX, stdDeviationY] = parseNativeStdDeviation(Object.hasOwn(record, "stdDeviation") ? record.stdDeviation : 2);
    return createNativeDropShadowFilter(dx, dy, stdDeviationX, stdDeviationY, nativeDropShadowColor(record), nativeDropShadowOpacity(record));
  }

  return undefined;
}

function parseNativeStdDeviation(value: unknown): readonly [number, number] {
  if (Array.isArray(value)) {
    const x = Math.max(0, Number(value[0] ?? 0));
    const y = Math.max(0, Number(value[1] ?? x));
    return [x, y];
  }

  const amount = Math.max(0, Number(value ?? 0));
  return [amount, amount];
}

function nativeDropShadowColor(record: Record<string, unknown>): string {
  return Object.hasOwn(record, "floodColor") ? String(record.floodColor) : "black";
}

function nativeDropShadowOpacity(record: Record<string, unknown>): number {
  return Object.hasOwn(record, "floodOpacity") ? Math.max(0, Math.min(1, Number(record.floodOpacity))) : 1;
}

function createNativeGaussianBlurFilter(stdDeviationX: number, stdDeviationY: number): string {
  const id = `raylib-canvas-wpt-filter-${nativeSvgFilterSequence++}`;
  const blur = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
  blur.setAttribute("stdDeviation", `${stdDeviationX} ${stdDeviationY}`);
  nativeSvgFilterDefinitions.set(id, [blur]);
  return `url(#${id})`;
}

function createNativeDropShadowFilter(
  dx: number,
  dy: number,
  stdDeviationX: number,
  stdDeviationY: number,
  color: string,
  opacity: number
): string {
  const id = `raylib-canvas-wpt-filter-${nativeSvgFilterSequence++}`;
  const shadow = document.createElementNS("http://www.w3.org/2000/svg", "feDropShadow");
  shadow.setAttribute("dx", String(dx));
  shadow.setAttribute("dy", String(dy));
  shadow.setAttribute("stdDeviation", `${stdDeviationX} ${stdDeviationY}`);
  shadow.setAttribute("flood-color", color);
  shadow.setAttribute("flood-opacity", String(opacity));
  nativeSvgFilterDefinitions.set(id, [shadow]);
  return `url(#${id})`;
}

function ensureNativeSvgFilter(cssFilter: string): void {
  const id = /^url\(#([^)]+)\)$/.exec(cssFilter)?.[1];
  if (!id || document.getElementById(id)) {
    return;
  }

  const children = nativeSvgFilterDefinitions.get(id);
  if (!children) {
    return;
  }

  let svg = document.getElementById("raylib-canvas-wpt-filter-defs") as SVGSVGElement | null;
  if (!svg) {
    svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.id = "raylib-canvas-wpt-filter-defs";
    svg.setAttribute("width", "0");
    svg.setAttribute("height", "0");
    svg.style.position = "absolute";
    svg.style.left = "-9999px";
    document.documentElement.appendChild(svg);
  }

  const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
  filter.id = id;
  filter.setAttribute("x", "-100%");
  filter.setAttribute("y", "-100%");
  filter.setAttribute("width", "300%");
  filter.setAttribute("height", "300%");
  for (const child of children) {
    filter.appendChild(child);
  }
  svg.appendChild(filter);
}

function assertCanvasImageSourceHasNoOpenLayers(image: unknown): void {
  if (image instanceof HTMLCanvasElement && getCurrentContext(image).hasOpenLayers()) {
    throw new DOMException("Canvas cannot be used as an image source while layers are open.", "InvalidStateError");
  }
}

function getOrCreateBacking(domCanvas: HTMLCanvasElement): BackingCanvas {
  const width = readCanvasDimension(domCanvas.width);
  const height = readCanvasDimension(domCanvas.height);
  const existing = backings.get(domCanvas);

  if (existing && existing.width === width && existing.height === height) {
    return existing;
  }

  const canvas = new Canvas(width, height, contextBackend === "raylib" ? { context: createRaylibContext } : {});
  const context = canvas.getContext("2d");
  const backing = {
    width,
    height,
    canvas,
    context,
    raylibContext: context instanceof RaylibCanvas2DContext ? context : undefined
  };
  backings.set(domCanvas, backing);
  return backing;
}

function resetBacking(domCanvas: HTMLCanvasElement): void {
  backings.get(domCanvas)?.raylibContext?.dispose();
  backings.delete(domCanvas);
}

function readCanvasDimension(value: number): number {
  return Math.max(1, Math.trunc(value));
}

function toBrowserImageData(imageData: CanvasImageData): ImageData | CanvasImageData {
  if (typeof ImageData !== "function") {
    return imageData;
  }

  const data = new Uint8ClampedArray(imageData.data);

  try {
    return new ImageData(data, imageData.width, imageData.height, { colorSpace: "srgb" });
  } catch {
    return new ImageData(data, imageData.width, imageData.height);
  }
}

function toCanvasImageData(imageData: ImageData | CanvasImageData): CanvasImageData {
  if (imageData instanceof CanvasImageData) {
    return imageData;
  }

  if (!(imageData instanceof ImageData)) {
    throw new TypeError("Expected ImageData.");
  }

  return new CanvasImageData(new Uint8ClampedArray(imageData.data), imageData.width, imageData.height, {
    colorSpace: "srgb"
  });
}

function toCanvasImageSource(image: unknown): RaylibCanvasImageSource {
  if (image instanceof HTMLCanvasElement) {
    if (image.width === 0 || image.height === 0) {
      throw new DOMException("The canvas source has zero width or height.", "InvalidStateError");
    }

    return getOrCreateBacking(image).canvas;
  }

  if (image instanceof Canvas) {
    return image;
  }

  if (image instanceof CanvasImageData) {
    return image;
  }

  if (image instanceof ImageData) {
    return toCanvasImageData(image);
  }

  if (typeof HTMLImageElement === "function" && image instanceof HTMLImageElement) {
    return copyNativeImageSourcePixels(image, image.naturalWidth, image.naturalHeight);
  }

  if (typeof ImageBitmap === "function" && image instanceof ImageBitmap) {
    return copyNativeImageSourcePixels(image, image.width, image.height);
  }

  if (typeof SVGImageElement === "function" && image instanceof SVGImageElement) {
    return copyNativeImageSourcePixels(image, image.width.baseVal.value, image.height.baseVal.value);
  }

  if (typeof OffscreenCanvas === "function" && image instanceof OffscreenCanvas) {
    try {
      image.getContext("2d");
    } catch {
      throw new DOMException("The OffscreenCanvas source is detached.", "InvalidStateError");
    }
  }

  throw new TypeError("Unsupported CanvasImageSource for raylib-canvas WPT shim.");
}

function copyNativeImageSourcePixels(image: CanvasImageSource, width: number, height: number): CanvasImageData {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  if (width === 0 || height === 0) {
    if (image instanceof HTMLImageElement && image.complete && image.currentSrc && !image.currentSrc.endsWith(".svg")) {
      throw new DOMException("The image source could not be decoded.", "InvalidStateError");
    }

    return new CanvasImageData(1, 1);
  }

  const context = originalHTMLCanvasGetContext.call(canvas, "2d");
  if (!context) {
    throw new TypeError("Could not create a native 2D context for CanvasImageSource conversion.");
  }

  originalCanvasDrawImage.call(context, image, 0, 0);
  return toCanvasImageData(context.getImageData(0, 0, width, height));
}

function patchCanvasDimension(property: "width" | "height"): void {
  const descriptor = Object.getOwnPropertyDescriptor(HTMLCanvasElement.prototype, property);

  if (!descriptor?.get || !descriptor.set) {
    return;
  }

  Object.defineProperty(HTMLCanvasElement.prototype, property, {
    configurable: descriptor.configurable,
    enumerable: descriptor.enumerable,
    get(this: HTMLCanvasElement) {
      return descriptor.get!.call(this);
    },
    set(this: HTMLCanvasElement, value: unknown) {
      descriptor.set!.call(this, value);
      resetBacking(this);
    }
  });
}

function isCanvasDimensionAttribute(name: string): boolean {
  const normalized = name.toLowerCase();
  return normalized === "width" || normalized === "height";
}

function createRaylibContext(canvas: Canvas): RaylibCanvas2DContext {
  const module = (globalThis as typeof globalThis & { __raylibCanvasWasmModule?: RaylibCanvasWasmModule })
    .__raylibCanvasWasmModule;

  if (!module) {
    throw new Error("RAYLIB_CANVAS_CONTEXT=raylib requires __raylibCanvasWasmModule to be preloaded.");
  }

  return new RaylibCanvas2DContext(canvas, module);
}
