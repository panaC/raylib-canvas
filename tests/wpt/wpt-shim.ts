import {
  Canvas,
  CanvasGradient,
  CanvasImageData,
  CanvasPath2D,
  CanvasPattern,
  RaylibCanvas2DContext,
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

        if (property === Symbol.toStringTag) {
          return "CanvasRenderingContext2D";
        }

        if (property === "toString") {
          return () => "[object CanvasRenderingContext2D]";
        }

        const prototypeValue = getUserPrototypeValue(wrapper, property);
        if (prototypeValue !== undefined) {
          return prototypeValue;
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

function toCanvasImageSource(image: unknown): Canvas {
  if (image instanceof HTMLCanvasElement) {
    return getOrCreateBacking(image).canvas;
  }

  if (image instanceof Canvas) {
    return image;
  }

  throw new TypeError("Unsupported CanvasImageSource for raylib-canvas WPT shim.");
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
