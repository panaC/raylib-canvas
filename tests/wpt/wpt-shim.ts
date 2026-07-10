import { Canvas, RaylibCanvasRenderer, type CanvasImageData, type RaylibCanvasWasmModule } from "../../src/index";

type Raylib2DContext = NonNullable<ReturnType<Canvas["getContext"]>>;

interface BackingCanvas {
  readonly width: number;
  readonly height: number;
  readonly canvas: Canvas;
  readonly context: Raylib2DContext;
  readonly renderer?: RaylibCanvasRenderer;
}

const backings = new WeakMap<HTMLCanvasElement, BackingCanvas>();
const wrappers = new WeakMap<HTMLCanvasElement, CanvasRenderingContext2D>();
const rendererBackend = process.env.RAYLIB_CANVAS_RENDERER;

const originalSetAttribute = Element.prototype.setAttribute;
const originalRemoveAttribute = Element.prototype.removeAttribute;

HTMLCanvasElement.prototype.getContext = function patchedGetContext(
  this: HTMLCanvasElement,
  contextId: string,
  _options?: unknown
): RenderingContext | null {
  if (contextId !== "2d") {
    return null;
  }

  return getOrCreateWrapper(this);
} as typeof HTMLCanvasElement.prototype.getContext;

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

function getOrCreateWrapper(domCanvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const existing = wrappers.get(domCanvas);

  if (existing) {
    return existing;
  }

  const wrapper = new Proxy(
    {},
    {
      get(_target, property) {
        if (property === "canvas") {
          return domCanvas;
        }

        if (property === "getImageData") {
          return (...args: unknown[]) => {
            const [sx, sy, sw, sh] = args as [number, number, number, number];
            return toBrowserImageData(getCurrentContext(domCanvas).getImageData(sx, sy, sw, sh));
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
        return typeof value === "function" ? value.bind(context) : value;
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
      }
    }
  ) as CanvasRenderingContext2D;

  wrappers.set(domCanvas, wrapper);
  return wrapper;
}

function getCurrentContext(domCanvas: HTMLCanvasElement): Raylib2DContext {
  return getOrCreateBacking(domCanvas).context;
}

function getOrCreateBacking(domCanvas: HTMLCanvasElement): BackingCanvas {
  const width = readCanvasDimension(domCanvas.width);
  const height = readCanvasDimension(domCanvas.height);
  const existing = backings.get(domCanvas);

  if (existing && existing.width === width && existing.height === height) {
    return existing;
  }

  const renderer = createRenderer(width, height);
  const canvas = new Canvas(width, height, renderer ? { renderer } : {});
  const context = canvas.getContext("2d");
  const backing = { width, height, canvas, context, renderer };
  backings.set(domCanvas, backing);
  return backing;
}

function resetBacking(domCanvas: HTMLCanvasElement): void {
  backings.get(domCanvas)?.renderer?.dispose();
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

function createRenderer(width: number, height: number): RaylibCanvasRenderer | undefined {
  if (rendererBackend !== "raylib") {
    return undefined;
  }

  const module = (globalThis as typeof globalThis & { __raylibCanvasWasmModule?: RaylibCanvasWasmModule })
    .__raylibCanvasWasmModule;

  if (!module) {
    throw new Error("RAYLIB_CANVAS_RENDERER=raylib requires __raylibCanvasWasmModule to be preloaded.");
  }

  return new RaylibCanvasRenderer(width, height, module);
}
