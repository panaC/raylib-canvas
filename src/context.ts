import type { Canvas } from "./index";

export interface Canvas2DContext {
  /**
   * Canvas associated with this rendering context.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-canvas-dev
   */
  readonly canvas: Canvas;

  /**
   * Current fill style for filled shapes.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-fillstyle-dev
   */
  fillStyle: string | CanvasGradient | CanvasPattern;

  /**
   * Current stroke style for stroked shapes.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-strokestyle-dev
   */
  strokeStyle: string | CanvasGradient | CanvasPattern;

  /**
   * Alpha multiplier applied to drawing operations.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-globalalpha-dev
   */
  globalAlpha: number;

  /**
   * Compositing operation applied to drawing operations.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-globalcompositeoperation-dev
   */
  globalCompositeOperation: string;

  /**
   * Width of lines drawn by stroke operations.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-linewidth-dev
   */
  lineWidth: number;

  /**
   * Shape used at the ends of open subpaths when stroked.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-linecap-dev
   */
  lineCap: CanvasLineCap;

  /**
   * Shape used where two line segments meet when stroked.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-linejoin-dev
   */
  lineJoin: CanvasLineJoin;

  /**
   * Miter length limit for stroked joins.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-miterlimit-dev
   */
  miterLimit: number;

  /**
   * Offset into the current line dash pattern.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-linedashoffset-dev
   */
  lineDashOffset: number;

  /**
   * Replaces the current line dash pattern.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-setlinedash-dev
   */
  setLineDash(segments: readonly number[]): void;

  /**
   * Returns a copy of the current line dash pattern.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-getlinedash-dev
   */
  getLineDash(): number[];

  /**
   * CSS font shorthand used for text drawing.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-font-dev
   */
  font: string;

  /**
   * Horizontal alignment for text drawing.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-textalign-dev
   */
  textAlign: CanvasTextAlign;

  /**
   * Baseline alignment for text drawing.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-textbaseline-dev
   */
  textBaseline: CanvasTextBaseline;

  /**
   * Text direction used by text drawing.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-direction-dev
   */
  direction: CanvasDirection;

  /**
   * Extra spacing between text grapheme clusters.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-letterspacing-dev
   */
  letterSpacing: string;

  /**
   * Extra spacing between words.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-wordspacing-dev
   */
  wordSpacing: string;

  /**
   * Font kerning mode used by text drawing.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-fontkerning-dev
   */
  fontKerning: CanvasFontKerning;

  /**
   * Font stretch mode used by text drawing.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-fontstretch-dev
   */
  fontStretch: CanvasFontStretch;

  /**
   * Font variant caps mode used by text drawing.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-fontvariantcaps-dev
   */
  fontVariantCaps: CanvasFontVariantCaps;

  /**
   * Text rendering hint used by text drawing.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-textrendering-dev
   */
  textRendering: CanvasTextRendering;

  /**
   * Whether scaled images are smoothed.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-imagesmoothingenabled-dev
   */
  imageSmoothingEnabled: boolean;

  /**
   * Quality hint used when smoothing scaled images.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-imagesmoothingquality-dev
   */
  imageSmoothingQuality: CanvasImageSmoothingQuality;

  /**
   * Horizontal distance a shadow is offset from shapes.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-shadowoffsetx-dev
   */
  shadowOffsetX: number;

  /**
   * Vertical distance a shadow is offset from shapes.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-shadowoffsety-dev
   */
  shadowOffsetY: number;

  /**
   * Blur radius applied to shadows.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-shadowblur-dev
   */
  shadowBlur: number;

  /**
   * CSS color used for shadows.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-shadowcolor-dev
   */
  shadowColor: string;

  /**
   * Filter applied to drawing operations.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-filter-dev
   */
  filter: string | object;

  /**
   * Returns the live RGBA backing pixels for encoding and diagnostics.
   * This is a deliberate package extension, not part of the web Canvas API.
   */
  getPixels(): Uint8ClampedArray;

  /**
   * Returns whether this context currently has open canvas layers.
   * This is a deliberate package extension for host integration checks.
   */
  hasOpenLayers(): boolean;

  /**
   * Creates a linear gradient style.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-createlineargradient-dev
   */
  createLinearGradient(x0: number, y0: number, x1: number, y1: number): CanvasGradient;

  /**
   * Creates a radial gradient style.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-createradialgradient-dev
   */
  createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): CanvasGradient;

  /**
   * Creates a conic gradient style.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-createconicgradient-dev
   */
  createConicGradient(startAngle: number, x: number, y: number): CanvasGradient;

  /**
   * Creates a pattern style from another canvas.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-createpattern-dev
   */
  createPattern(image: Canvas, repetition?: string | null): CanvasPattern | null;

  /**
   * Resets the rendering context state and clears the canvas bitmap.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-reset-dev
   */
  reset(): void;

  /**
   * Starts rendering into a new transparent canvas layer.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-beginlayer-dev
   */
  beginLayer(options?: CanvasLayerOptions | null): void;

  /**
   * Composites the current canvas layer back into its parent.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-endlayer-dev
   */
  endLayer(): void;

  /**
   * Saves the current drawing state.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-save-dev
   */
  save(): void;

  /**
   * Restores the most recently saved drawing state.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-restore-dev
   */
  restore(): void;

  /**
   * Clears pixels in the given rectangle to transparent black.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-clearrect-dev
   */
  clearRect(x: number, y: number, width: number, height: number): void;

  /**
   * Paints a rectangle using the current fill style.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-fillrect-dev
   */
  fillRect(x: number, y: number, width: number, height: number): void;

  /**
   * Strokes a rectangle using the current stroke style.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-strokerect-dev
   */
  strokeRect(x: number, y: number, width: number, height: number): void;

  /**
   * Fills the current path or the supplied path.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-fill-dev
   */
  fill(fillRule?: CanvasFillRule): void;
  fill(path?: CanvasPath2D, fillRule?: CanvasFillRule): void;

  /**
   * Strokes the current path or the supplied path.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-stroke-dev
   */
  stroke(path?: CanvasPath2D): void;

  /**
   * Intersects the current clipping region with the current path or supplied path.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-clip-dev
   */
  clip(fillRule?: CanvasFillRule): void;
  clip(path?: CanvasPath2D, fillRule?: CanvasFillRule): void;

  /**
   * Returns whether a point is inside the current path or supplied path.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-ispointinpath-dev
   */
  isPointInPath(x: number, y: number, fillRule?: CanvasFillRule): boolean;
  isPointInPath(path: CanvasPath2D, x: number, y: number, fillRule?: CanvasFillRule): boolean;

  /**
   * Returns whether a point is inside the stroke outline of the current path or supplied path.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-ispointinstroke-dev
   */
  isPointInStroke(x: number, y: number): boolean;
  isPointInStroke(path: CanvasPath2D, x: number, y: number): boolean;

  /**
   * Strokes text using the current stroke style.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-stroketext-dev
   */
  strokeText(text: unknown, x: number, y: number, maxWidth?: number): void;

  /**
   * Returns metrics for text using the current text styles.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-measuretext-dev
   */
  measureText(text: unknown): CanvasTextMetrics;

  /**
   * Draws another canvas into this canvas.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-drawimage-dev
   */
  drawImage(image: Canvas, dx: number, dy: number): void;
  drawImage(image: Canvas, dx: number, dy: number, dWidth: number, dHeight: number): void;
  drawImage(
    image: Canvas,
    sx: number,
    sy: number,
    sWidth: number,
    sHeight: number,
    dx: number,
    dy: number,
    dWidth: number,
    dHeight: number
  ): void;

  /**
   * Starts a new path.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-beginpath-dev
   */
  beginPath(): void;

  /**
   * Moves the current path point.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-moveto-dev
   */
  moveTo(x: number, y: number): void;

  /**
   * Adds a line segment to the current path.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-lineto-dev
   */
  lineTo(x: number, y: number): void;

  /**
   * Adds a rectangle to the current path.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-rect-dev
   */
  rect(x: number, y: number, width: number, height: number): void;

  /**
   * Adds a quadratic Bezier curve to the current path.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-quadraticcurveto-dev
   */
  quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;

  /**
   * Adds a cubic Bezier curve to the current path.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-beziercurveto-dev
   */
  bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;

  /**
   * Adds an arc connected by tangents to the current path.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-arcto-dev
   */
  arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;

  /**
   * Adds a rounded rectangle to the current path.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-roundrect-dev
   */
  roundRect(x: number, y: number, width: number, height: number, radii?: number | DOMPointInit | Array<number | DOMPointInit>): void;

  /**
   * Adds a circular arc to the current path.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-arc-dev
   */
  arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean): void;

  /**
   * Adds an elliptical arc to the current path.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-ellipse-dev
   */
  ellipse(
    x: number,
    y: number,
    radiusX: number,
    radiusY: number,
    rotation: number,
    startAngle: number,
    endAngle: number,
    counterclockwise?: boolean
  ): void;

  /**
   * Closes the current subpath.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-closepath-dev
   */
  closePath(): void;

  /**
   * Creates a transparent ImageData object.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-createimagedata-dev
   */
  createImageData(width: number, height: number, settings?: ImageDataSettings): CanvasImageData;
  createImageData(imageData: CanvasImageData): CanvasImageData;

  /**
   * Returns a copy of pixels from the requested rectangle.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-getimagedata-dev
   */
  getImageData(sx: number, sy: number, sw: number, sh: number, settings?: ImageDataSettings): CanvasImageData;

  /**
   * Writes ImageData pixels to the backing store.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-putimagedata-dev
   */
  putImageData(imageData: CanvasImageData, dx: number, dy: number): void;
  putImageData(
    imageData: CanvasImageData,
    dx: number,
    dy: number,
    dirtyX: number,
    dirtyY: number,
    dirtyWidth: number,
    dirtyHeight: number
  ): void;

  /**
   * Adds a transform to the current transform matrix.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-transform-dev
   */
  transform(a: number, b: number, c: number, d: number, e: number, f: number): void;

  /**
   * Replaces the current transform matrix.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-settransform-dev
   */
  setTransform(): void;
  setTransform(a: number, b: number, c: number, d: number, e: number, f: number): void;

  /**
   * Resets the current transform matrix to identity.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-resettransform-dev
   */
  resetTransform(): void;

  /**
   * Returns a copy of the current transform matrix.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-gettransform-dev
   */
  getTransform(): CanvasTransformMatrix;

  /**
   * Adds a rotation to the current transform matrix.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-rotate-dev
   */
  rotate(angle: number): void;

  /**
   * Adds a scale to the current transform matrix.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-scale-dev
   */
  scale(x: number, y: number): void;

  /**
   * Adds a translation to the current transform matrix.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-translate-dev
   */
  translate(x: number, y: number): void;
}

export type Rgba = readonly [number, number, number, number];

type GlobalCompositeOperation =
  | "clear"
  | "copy"
  | "source-over"
  | "source-in"
  | "source-out"
  | "source-atop"
  | "destination-over"
  | "destination-in"
  | "destination-out"
  | "destination-atop"
  | "lighter"
  | "xor"
  | "multiply"
  | "screen"
  | "overlay"
  | "darken"
  | "lighten"
  | "color-dodge"
  | "color-burn"
  | "hard-light"
  | "soft-light"
  | "difference"
  | "exclusion"
  | "hue"
  | "saturation"
  | "color"
  | "luminosity";

type CanvasFontKerning = "auto" | "normal" | "none";
type CanvasFontStretch =
  | "ultra-condensed"
  | "extra-condensed"
  | "condensed"
  | "semi-condensed"
  | "normal"
  | "semi-expanded"
  | "expanded"
  | "extra-expanded"
  | "ultra-expanded";
type CanvasFontVariantCaps =
  | "normal"
  | "small-caps"
  | "all-small-caps"
  | "petite-caps"
  | "all-petite-caps"
  | "unicase"
  | "titling-caps";
type CanvasTextRendering = "auto" | "optimizeSpeed" | "optimizeLegibility" | "geometricPrecision";
type CanvasImageSmoothingQuality = "low" | "medium" | "high";
type CanvasImageDataColorSpace = "srgb";

type CanvasLayerOptions = {
  readonly filter?: unknown;
};

type ParsedCanvasFilter = {
  readonly serialized: string | object;
  readonly opacity: number;
  readonly operations: readonly CanvasFilterOperation[];
};

type CanvasFilterOperation =
  | { readonly type: "opacity"; readonly amount: number }
  | { readonly type: "blur"; readonly stdDeviationX: number; readonly stdDeviationY: number }
  | { readonly type: "dropShadow"; readonly dx: number; readonly dy: number; readonly stdDeviationX: number; readonly stdDeviationY: number; readonly color: Rgba }
  | { readonly type: "colorMatrix"; readonly values: readonly number[] }
  | { readonly type: "componentTransfer"; readonly funcs: readonly ComponentTransferFunc[] };

type ComponentTransferFunc = {
  readonly type: "identity" | "linear" | "gamma" | "table" | "discrete";
  readonly slope?: number;
  readonly intercept?: number;
  readonly amplitude?: number;
  readonly exponent?: number;
  readonly offset?: number;
  readonly tableValues?: readonly number[];
};

type Matrix2D = readonly [number, number, number, number, number, number];

type PathCommand =
  | { readonly type: "moveTo"; readonly x: number; readonly y: number }
  | { readonly type: "lineTo"; readonly x: number; readonly y: number }
  | {
      readonly type: "bezierCurveTo";
      readonly cp1x: number;
      readonly cp1y: number;
      readonly cp2x: number;
      readonly cp2y: number;
      readonly x: number;
      readonly y: number;
    }
  | {
      readonly type: "quadraticCurveTo";
      readonly cpx: number;
      readonly cpy: number;
      readonly x: number;
      readonly y: number;
    }
  | { readonly type: "rect"; readonly x: number; readonly y: number; readonly width: number; readonly height: number }
  | {
      readonly type: "ellipse";
      readonly x: number;
      readonly y: number;
      readonly radiusX: number;
      readonly radiusY: number;
      readonly rotation: number;
      readonly startAngle: number;
      readonly endAngle: number;
      readonly counterclockwise: boolean;
    }
  | { readonly type: "closePath" };

type CanvasState = {
  readonly fillStyle: string | CanvasGradient | CanvasPattern;
  readonly fillPaint: CanvasPaintStyle;
  readonly transform: Matrix2D;
  readonly strokeStyle: string | CanvasGradient | CanvasPattern;
  readonly strokePaint: CanvasPaintStyle;
  readonly fillRule: CanvasFillRule;
  readonly globalAlpha: number;
  readonly lineWidth: number;
  readonly lineCap: CanvasLineCap;
  readonly lineJoin: CanvasLineJoin;
  readonly miterLimit: number;
  readonly globalCompositeOperation: string;
  readonly font: string;
  readonly textAlign: CanvasTextAlign;
  readonly textBaseline: CanvasTextBaseline;
  readonly direction: CanvasDirection;
  readonly letterSpacing: string;
  readonly wordSpacing: string;
  readonly fontKerning: CanvasFontKerning;
  readonly fontStretch: CanvasFontStretch;
  readonly fontVariantCaps: CanvasFontVariantCaps;
  readonly textRendering: CanvasTextRendering;
  readonly imageSmoothingEnabled: boolean;
  readonly imageSmoothingQuality: CanvasImageSmoothingQuality;
  readonly filter: string | object;
  readonly filterOpacity: number;
  readonly filterOperations: readonly CanvasFilterOperation[];
  readonly shadowOffsetX: number;
  readonly shadowOffsetY: number;
  readonly shadowBlur: number;
  readonly shadowColor: string;
  readonly shadowRgba: Rgba;
  readonly lineDash: readonly number[];
  readonly lineDashOffset: number;
  readonly clipMask?: Uint8Array;
};

type CanvasLayer = {
  readonly pixels: Uint8ClampedArray;
  readonly alpha: number;
  readonly operation: GlobalCompositeOperation;
  readonly filterOpacity: number;
  readonly filterOperations: readonly CanvasFilterOperation[];
  readonly filterTransform: Matrix2D;
  readonly savedStateDepth: number;
  readonly outerState: CanvasState;
};

type CanvasGradientDefinition =
  | { readonly type: "linear"; readonly x0: number; readonly y0: number; readonly x1: number; readonly y1: number }
  | {
      readonly type: "radial";
      readonly x0: number;
      readonly y0: number;
      readonly r0: number;
      readonly x1: number;
      readonly y1: number;
      readonly r1: number;
    }
  | { readonly type: "conic"; readonly startAngle: number; readonly x: number; readonly y: number };

type CanvasGradientStop = {
  readonly offset: number;
  readonly rgba: Rgba;
  readonly order: number;
};

type CanvasPatternRepetition = "repeat" | "repeat-x" | "repeat-y" | "no-repeat";

type CanvasPaintStyle =
  | { readonly type: "color"; readonly rgba: Rgba }
  | { readonly type: "gradient"; readonly gradient: CanvasGradient }
  | { readonly type: "pattern"; readonly pattern: CanvasPattern };

type Paint = {
  readonly sample: (x: number, y: number) => Rgba;
};

type DrawImageGeometry = {
  readonly sourceCanvas: Canvas;
  readonly sourceX: number;
  readonly sourceY: number;
  readonly sourceWidth: number;
  readonly sourceHeight: number;
  readonly destX: number;
  readonly destY: number;
  readonly destWidth: number;
  readonly destHeight: number;
};

type NormalizedRect = {
  readonly left: number;
  readonly top: number;
  readonly width: number;
  readonly height: number;
};

const NAMED_COLORS: Record<string, Rgba> = {
  black: [0, 0, 0, 255],
  blue: [0, 0, 255, 255],
  gray: [128, 128, 128, 255],
  green: [0, 128, 0, 255],
  grey: [128, 128, 128, 255],
  lime: [0, 255, 0, 255],
  maroon: [128, 0, 0, 255],
  navy: [0, 0, 128, 255],
  orange: [255, 165, 0, 255],
  pink: [255, 192, 203, 255],
  purple: [128, 0, 128, 255],
  red: [255, 0, 0, 255],
  skyblue: [135, 206, 235, 255],
  teal: [0, 128, 128, 255],
  transparent: [0, 0, 0, 0],
  white: [255, 255, 255, 255]
};
const TRANSPARENT_BLACK: Rgba = [0, 0, 0, 0];
const IDENTITY_MATRIX: Matrix2D = [1, 0, 0, 1, 0, 0];
const SVG_GAUSSIAN_BLUR_SIGMA_SCALE = 0.988;
const GLOBAL_COMPOSITE_OPERATIONS = new Set<string>([
  "clear",
  "copy",
  "source-over",
  "source-in",
  "source-out",
  "source-atop",
  "destination-over",
  "destination-in",
  "destination-out",
  "destination-atop",
  "lighter",
  "xor",
  "multiply",
  "screen",
  "overlay",
  "darken",
  "lighten",
  "color-dodge",
  "color-burn",
  "hard-light",
  "soft-light",
  "difference",
  "exclusion",
  "hue",
  "saturation",
  "color",
  "luminosity"
]);
const CANVAS_LINE_CAPS = new Set<string>(["butt", "round", "square"]);
const CANVAS_LINE_JOINS = new Set<string>(["round", "bevel", "miter"]);
const CANVAS_TEXT_ALIGNS = new Set<string>(["start", "end", "left", "right", "center"]);
const CANVAS_TEXT_BASELINES = new Set<string>(["top", "hanging", "middle", "alphabetic", "ideographic", "bottom"]);
const CANVAS_DIRECTIONS = new Set<string>(["ltr", "rtl", "inherit"]);
const CANVAS_FONT_KERNINGS = new Set<string>(["auto", "normal", "none"]);
const CANVAS_FONT_STRETCHES = new Set<string>([
  "ultra-condensed",
  "extra-condensed",
  "condensed",
  "semi-condensed",
  "normal",
  "semi-expanded",
  "expanded",
  "extra-expanded",
  "ultra-expanded"
]);
const CANVAS_FONT_VARIANT_CAPS = new Set<string>([
  "normal",
  "small-caps",
  "all-small-caps",
  "petite-caps",
  "all-petite-caps",
  "unicase",
  "titling-caps"
]);
const CANVAS_TEXT_RENDERINGS = new Set<string>([
  "auto",
  "optimizeSpeed",
  "optimizeLegibility",
  "geometricPrecision"
]);
const CANVAS_IMAGE_SMOOTHING_QUALITIES = new Set<string>(["low", "medium", "high"]);
const CSS_LENGTH_UNITS = new Set<string>([
  "cap",
  "ch",
  "cm",
  "dvb",
  "dvh",
  "dvi",
  "dvmax",
  "dvmin",
  "dvw",
  "em",
  "ex",
  "ic",
  "in",
  "lh",
  "lvb",
  "lvh",
  "lvi",
  "lvmax",
  "lvmin",
  "lvw",
  "mm",
  "pc",
  "pt",
  "px",
  "q",
  "rcap",
  "rch",
  "rem",
  "rex",
  "ric",
  "rlh",
  "svb",
  "svh",
  "svi",
  "svmax",
  "svmin",
  "svw",
  "vb",
  "vh",
  "vi",
  "vmax",
  "vmin",
  "vw"
]);
const FONT_STYLE_KEYWORDS = new Set<string>(["normal", "italic", "oblique"]);
const FONT_VARIANT_KEYWORDS = new Set<string>([
  "normal",
  "small-caps",
  "all-small-caps",
  "petite-caps",
  "all-petite-caps",
  "unicase",
  "titling-caps"
]);
const FONT_WEIGHT_KEYWORDS = new Set<string>(["normal", "bold", "bolder", "lighter"]);
const FONT_STRETCH_KEYWORDS = CANVAS_FONT_STRETCHES;
const FONT_SIZE_KEYWORDS = new Set<string>([
  "xx-small",
  "x-small",
  "small",
  "medium",
  "large",
  "x-large",
  "xx-large",
  "xxx-large",
  "larger",
  "smaller"
]);
const GENERIC_FONT_FAMILIES = new Set<string>([
  "serif",
  "sans-serif",
  "monospace",
  "cursive",
  "fantasy",
  "system-ui",
  "ui-serif",
  "ui-sans-serif",
  "ui-monospace",
  "ui-rounded",
  "math",
  "emoji",
  "fangsong"
]);
const PROPERTY_WIDE_KEYWORDS = new Set<string>(["inherit", "initial", "revert", "revert-layer", "unset", "default"]);

export class CanvasPath2D {
  readonly #commands: PathCommand[] = [];

  constructor(path?: CanvasPath2D) {
    if (path) {
      this.#commands.push(...path.getCommands());
    }
  }

  moveTo(x: number, y: number): void {
    x = Number(x);
    y = Number(y);

    if (![x, y].every(Number.isFinite)) {
      return;
    }

    this.#commands.push({ type: "moveTo", x, y });
  }

  lineTo(x: number, y: number): void {
    x = Number(x);
    y = Number(y);

    if (![x, y].every(Number.isFinite)) {
      return;
    }

    this.#commands.push({ type: "lineTo", x, y });
  }

  bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void {
    cp1x = Number(cp1x);
    cp1y = Number(cp1y);
    cp2x = Number(cp2x);
    cp2y = Number(cp2y);
    x = Number(x);
    y = Number(y);

    if (![cp1x, cp1y, cp2x, cp2y, x, y].every(Number.isFinite)) {
      return;
    }

    this.#commands.push({ type: "bezierCurveTo", cp1x, cp1y, cp2x, cp2y, x, y });
  }

  quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void {
    cpx = Number(cpx);
    cpy = Number(cpy);
    x = Number(x);
    y = Number(y);

    if (![cpx, cpy, x, y].every(Number.isFinite)) {
      return;
    }

    this.#commands.push({ type: "quadraticCurveTo", cpx, cpy, x, y });
  }

  rect(x: number, y: number, width: number, height: number): void {
    x = Number(x);
    y = Number(y);
    width = Number(width);
    height = Number(height);

    if (![x, y, width, height].every(Number.isFinite)) {
      return;
    }

    this.#commands.push({ type: "rect", x, y, width, height });
  }

  arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise = false): void {
    this.ellipse(x, y, radius, radius, 0, startAngle, endAngle, counterclockwise);
  }

  ellipse(
    x: number,
    y: number,
    radiusX: number,
    radiusY: number,
    rotation: number,
    startAngle: number,
    endAngle: number,
    counterclockwise = false
  ): void {
    x = Number(x);
    y = Number(y);
    radiusX = Number(radiusX);
    radiusY = Number(radiusY);
    rotation = Number(rotation);
    startAngle = Number(startAngle);
    endAngle = Number(endAngle);

    if (![x, y, radiusX, radiusY, rotation, startAngle, endAngle].every(Number.isFinite)) {
      return;
    }

    if (radiusX < 0 || radiusY < 0) {
      throw createIndexSizeError("The radius provided is negative.");
    }

    this.#commands.push({
      type: "ellipse",
      x,
      y,
      radiusX,
      radiusY,
      rotation,
      startAngle,
      endAngle,
      counterclockwise: Boolean(counterclockwise)
    });
  }

  arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void {
    x1 = Number(x1);
    y1 = Number(y1);
    x2 = Number(x2);
    y2 = Number(y2);
    radius = Number(radius);

    if (![x1, y1, x2, y2, radius].every(Number.isFinite)) {
      return;
    }

    if (radius < 0) {
      throw createIndexSizeError("The radius provided is negative.");
    }

    const current = currentPathPoint(this.#commands);

    if (!current) {
      this.moveTo(x1, y1);
      return;
    }

    const tangent = arcToSegments(current, { x: x1, y: y1 }, { x: x2, y: y2 }, radius);

    if (!tangent) {
      this.lineTo(x1, y1);
      return;
    }

    this.lineTo(tangent.start.x, tangent.start.y);
    this.#commands.push({
      type: "ellipse",
      x: tangent.center.x,
      y: tangent.center.y,
      radiusX: radius,
      radiusY: radius,
      rotation: 0,
      startAngle: tangent.startAngle,
      endAngle: tangent.endAngle,
      counterclockwise: tangent.counterclockwise
    });
  }

  roundRect(x: number, y: number, width: number, height: number, radii: number | DOMPointInit | Array<number | DOMPointInit> = 0): void {
    x = Number(x);
    y = Number(y);
    width = Number(width);
    height = Number(height);

    if (![x, y, width, height].every(Number.isFinite)) {
      return;
    }

    const corners = normalizeRoundRectRadii(radii);
    if (!corners) {
      return;
    }

    const scale = Math.min(
      1,
      Math.abs(width) / Math.max(corners[0].x + corners[1].x, corners[3].x + corners[2].x, 1),
      Math.abs(height) / Math.max(corners[0].y + corners[3].y, corners[1].y + corners[2].y, 1)
    );
    const [topLeft, topRight, bottomRight, bottomLeft] = corners.map((corner) => ({
      x: corner.x * scale,
      y: corner.y * scale
    }));
    const left = width < 0 ? x + width : x;
    const right = width < 0 ? x : x + width;
    const top = height < 0 ? y + height : y;
    const bottom = height < 0 ? y : y + height;

    this.moveTo(left + topLeft.x, top);
    this.lineTo(right - topRight.x, top);
    appendRoundRectCorner(this, right - topRight.x, top + topRight.y, topRight, -Math.PI / 2, 0);
    this.lineTo(right, bottom - bottomRight.y);
    appendRoundRectCorner(this, right - bottomRight.x, bottom - bottomRight.y, bottomRight, 0, Math.PI / 2);
    this.lineTo(left + bottomLeft.x, bottom);
    appendRoundRectCorner(this, left + bottomLeft.x, bottom - bottomLeft.y, bottomLeft, Math.PI / 2, Math.PI);
    this.lineTo(left, top + topLeft.y);
    appendRoundRectCorner(this, left + topLeft.x, top + topLeft.y, topLeft, Math.PI, (Math.PI * 3) / 2);
    this.closePath();
  }

  closePath(): void {
    this.#commands.push({ type: "closePath" });
  }

  addPath(path: CanvasPath2D, transform?: CanvasTransformMatrix): void {
    const matrix = transform ? matrixFromObject(transform) : IDENTITY_MATRIX;

    for (const command of path.getCommands()) {
      if (command.type === "closePath") {
        this.closePath();
        continue;
      }

      if (command.type === "rect") {
        const topLeft = transformPoint(matrix, command.x, command.y);
        const bottomRight = transformPoint(matrix, command.x + command.width, command.y + command.height);
        this.rect(topLeft.x, topLeft.y, bottomRight.x - topLeft.x, bottomRight.y - topLeft.y);
        continue;
      }

      if (command.type === "ellipse") {
        const center = transformPoint(matrix, command.x, command.y);
        this.ellipse(
          center.x,
          center.y,
          command.radiusX,
          command.radiusY,
          command.rotation,
          command.startAngle,
          command.endAngle,
          command.counterclockwise
        );
        continue;
      }

      if (command.type === "bezierCurveTo") {
        const cp1 = transformPoint(matrix, command.cp1x, command.cp1y);
        const cp2 = transformPoint(matrix, command.cp2x, command.cp2y);
        const point = transformPoint(matrix, command.x, command.y);
        this.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, point.x, point.y);
        continue;
      }

      if (command.type === "quadraticCurveTo") {
        const cp = transformPoint(matrix, command.cpx, command.cpy);
        const point = transformPoint(matrix, command.x, command.y);
        this.quadraticCurveTo(cp.x, cp.y, point.x, point.y);
        continue;
      }

      const point = transformPoint(matrix, command.x, command.y);
      if (command.type === "moveTo") {
        this.moveTo(point.x, point.y);
      } else {
        this.lineTo(point.x, point.y);
      }
    }
  }

  getCommands(): readonly PathCommand[] {
    return this.#commands;
  }
}

export class CanvasTransformMatrix {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;

  constructor(matrix: Matrix2D = IDENTITY_MATRIX) {
    [this.a, this.b, this.c, this.d, this.e, this.f] = matrix;
  }

  get is2D(): boolean {
    return true;
  }

  get isIdentity(): boolean {
    return isIdentityMatrix(matrixFromObject(this));
  }

  get m11(): number {
    return this.a;
  }

  set m11(value: number) {
    this.a = value;
  }

  get m12(): number {
    return this.b;
  }

  set m12(value: number) {
    this.b = value;
  }

  get m21(): number {
    return this.c;
  }

  set m21(value: number) {
    this.c = value;
  }

  get m22(): number {
    return this.d;
  }

  set m22(value: number) {
    this.d = value;
  }

  get m41(): number {
    return this.e;
  }

  set m41(value: number) {
    this.e = value;
  }

  get m42(): number {
    return this.f;
  }

  set m42(value: number) {
    this.f = value;
  }

  invertSelf(): this {
    const determinant = this.a * this.d - this.b * this.c;

    if (determinant === 0) {
      this.a = this.b = this.c = this.d = this.e = this.f = Number.NaN;
      return this;
    }

    const [a, b, c, d, e, f] = [this.a, this.b, this.c, this.d, this.e, this.f];
    this.a = d / determinant;
    this.b = -b / determinant;
    this.c = -c / determinant;
    this.d = a / determinant;
    this.e = (c * f - d * e) / determinant;
    this.f = (b * e - a * f) / determinant;
    return this;
  }

  multiplySelf(other: CanvasTransformMatrix | Matrix2D): this {
    const multiplied = multiplyMatrices(matrixFromObject(this), matrixFromObject(other));
    [this.a, this.b, this.c, this.d, this.e, this.f] = multiplied;
    return this;
  }

  toFloat32Array(): Float32Array {
    return new Float32Array(this.#toMatrix4());
  }

  toFloat64Array(): Float64Array {
    return new Float64Array(this.#toMatrix4());
  }

  #toMatrix4(): number[] {
    return [this.a, this.b, 0, 0, this.c, this.d, 0, 0, 0, 0, 1, 0, this.e, this.f, 0, 1];
  }
}

export class CanvasImageData {
  readonly data: Uint8ClampedArray;
  readonly width: number;
  readonly height: number;
  readonly colorSpace: CanvasImageDataColorSpace;

  constructor(width: number, height: number, settings?: ImageDataSettings);
  constructor(data: Uint8ClampedArray, width: number, height?: number, settings?: ImageDataSettings);
  constructor(
    dataOrWidth: Uint8ClampedArray | number,
    widthOrHeight: number,
    heightOrSettings?: number | ImageDataSettings,
    settings?: ImageDataSettings
  ) {
    const colorSpace = normalizeImageDataColorSpace(
      typeof heightOrSettings === "object" ? heightOrSettings : settings
    );
    const data =
      dataOrWidth instanceof Uint8ClampedArray
        ? dataOrWidth
        : new Uint8ClampedArray(toImageDataDimension(dataOrWidth, "width") * toImageDataDimension(widthOrHeight, "height") * 4);
    const width = dataOrWidth instanceof Uint8ClampedArray ? toImageDataDimension(widthOrHeight, "width") : toImageDataDimension(dataOrWidth, "width");
    const height =
      dataOrWidth instanceof Uint8ClampedArray
        ? heightOrSettings === undefined || typeof heightOrSettings === "object"
          ? data.length / 4 / width
          : toImageDataDimension(heightOrSettings, "height")
        : toImageDataDimension(widthOrHeight, "height");

    assertPositiveInteger(width, "width");
    assertPositiveInteger(height, "height");

    if (data.length !== width * height * 4) {
      throw new Error("ImageData data length must match width * height * 4");
    }

    this.data = data;
    this.width = width;
    this.height = height;
    this.colorSpace = colorSpace;
  }
}

export class CanvasTextMetrics {
  readonly width: number;
  readonly actualBoundingBoxLeft: number;
  readonly actualBoundingBoxRight: number;
  readonly fontBoundingBoxAscent: number;
  readonly fontBoundingBoxDescent: number;
  readonly actualBoundingBoxAscent: number;
  readonly actualBoundingBoxDescent: number;
  readonly emHeightAscent: number;
  readonly emHeightDescent: number;
  readonly hangingBaseline: number;
  readonly alphabeticBaseline = 0;
  readonly ideographicBaseline: number;

  constructor(width: number, fontSize: number) {
    this.width = width;
    this.actualBoundingBoxLeft = 0;
    this.actualBoundingBoxRight = width;
    this.fontBoundingBoxAscent = fontSize * 0.8;
    this.fontBoundingBoxDescent = fontSize * 0.2;
    this.actualBoundingBoxAscent = fontSize * 0.8;
    this.actualBoundingBoxDescent = fontSize * 0.2;
    this.emHeightAscent = fontSize * 0.8;
    this.emHeightDescent = fontSize * 0.2;
    this.hangingBaseline = fontSize * 0.6;
    this.ideographicBaseline = -fontSize * 0.2;
  }
}

export class CanvasGradient {
  readonly #definition: CanvasGradientDefinition;
  readonly #stops: CanvasGradientStop[] = [];
  #nextStopOrder = 0;

  constructor(definition: CanvasGradientDefinition) {
    this.#definition = definition;
  }

  addColorStop(offset: number, color: string): void {
    if (arguments.length < 2) {
      throw new TypeError("addColorStop() requires an offset and color.");
    }

    const stopOffset = Number(offset);

    if (!Number.isFinite(stopOffset)) {
      throw new TypeError("The color stop offset must be finite.");
    }

    if (stopOffset < 0 || stopOffset > 1) {
      throw createIndexSizeError("The color stop offset must be finite and between 0 and 1.");
    }

    const parsedColor = parseColor(String(color));
    if (!parsedColor) {
      throw createSyntaxError("The color stop color is not a supported CSS color.");
    }

    this.#stops.push({
      offset: stopOffset,
      rgba: parsedColor.rgba,
      order: this.#nextStopOrder
    });
    this.#nextStopOrder += 1;
    this.#stops.sort((left, right) => left.offset - right.offset || left.order - right.order);
  }

  sample(x: number, y: number): Rgba {
    const stops = this.#stops;
    if (stops.length === 0) {
      return TRANSPARENT_BLACK;
    }

    if (this.#definition.type === "linear") {
      const { x0, y0, x1, y1 } = this.#definition;
      const dx = x1 - x0;
      const dy = y1 - y0;
      const lengthSquared = dx * dx + dy * dy;
      return sampleGradientStops(stops, lengthSquared === 0 ? 0 : ((x - x0) * dx + (y - y0) * dy) / lengthSquared);
    }

    if (this.#definition.type === "conic") {
      const angle = positiveModulo(Math.atan2(y - this.#definition.y, x - this.#definition.x) - this.#definition.startAngle, Math.PI * 2);
      return sampleGradientStops(stops, angle / (Math.PI * 2));
    }

    const { x0, y0, r0, x1, y1, r1 } = this.#definition;
    const centerDistance = Math.hypot(x1 - x0, y1 - y0);
    const radiusDistance = r1 - r0;

    if (centerDistance === 0 && radiusDistance === 0) {
      return sampleGradientStops(stops, 0);
    }

    if (centerDistance === 0) {
      return sampleGradientStops(stops, (Math.hypot(x - x0, y - y0) - r0) / radiusDistance);
    }

    return sampleGradientStops(stops, Math.hypot(x - x0, y - y0) / Math.max(centerDistance + r1 - r0, 1e-9));
  }
}

export class CanvasPattern {
  readonly image: Canvas;
  readonly repetition: CanvasPatternRepetition;

  constructor(image: Canvas, repetition: CanvasPatternRepetition) {
    this.image = image;
    this.repetition = repetition;
  }

  sample(x: number, y: number): Rgba {
    const sourceX = patternCoordinate(Math.floor(x), this.image.width, this.repetition === "repeat" || this.repetition === "repeat-x");
    const sourceY = patternCoordinate(Math.floor(y), this.image.height, this.repetition === "repeat" || this.repetition === "repeat-y");

    if (sourceX === undefined || sourceY === undefined) {
      return TRANSPARENT_BLACK;
    }

    const source = this.image.getContext("2d").getPixels();
    const offset = (sourceY * this.image.width + sourceX) * 4;
    return [source[offset], source[offset + 1], source[offset + 2], source[offset + 3]];
  }
}

export abstract class Canvas2DRenderingContext implements Canvas2DContext {
  #fillStyle: string | CanvasGradient | CanvasPattern = "#000000";
  #fillPaint: CanvasPaintStyle = { type: "color", rgba: [0, 0, 0, 255] };
  #strokeStyle: string | CanvasGradient | CanvasPattern = "#000000";
  #strokePaint: CanvasPaintStyle = { type: "color", rgba: [0, 0, 0, 255] };
  #transform: Matrix2D = IDENTITY_MATRIX;
  #currentPath = new CanvasPath2D();
  #stateStack: CanvasState[] = [];
  #lineDash: number[] = [];
  #globalAlpha = 1;
  #globalCompositeOperation: GlobalCompositeOperation = "source-over";
  #lineWidth = 1;
  #lineCap: CanvasLineCap = "butt";
  #lineJoin: CanvasLineJoin = "miter";
  #miterLimit = 10;
  #lineDashOffset = 0;
  #font = "10px sans-serif";
  #textAlign: CanvasTextAlign = "start";
  #textBaseline: CanvasTextBaseline = "alphabetic";
  #direction: CanvasDirection = "inherit";
  #letterSpacing = "0px";
  #wordSpacing = "0px";
  #fontKerning: CanvasFontKerning = "auto";
  #fontStretch: CanvasFontStretch = "normal";
  #fontVariantCaps: CanvasFontVariantCaps = "normal";
  #textRendering: CanvasTextRendering = "auto";
  #filter: string | object = "none";
  #filterOpacity = 1;
  #filterOperations: readonly CanvasFilterOperation[] = [];
  #shadowOffsetX = 0;
  #shadowOffsetY = 0;
  #shadowBlur = 0;
  #shadowColor = "rgba(0, 0, 0, 0)";
  #shadowRgba: Rgba = [0, 0, 0, 0];
  #imageSmoothingEnabled = true;
  #imageSmoothingQuality: CanvasImageSmoothingQuality = "low";
  #clipMask: Uint8Array | undefined;
  #layerStack: CanvasLayer[] = [];
  fillRule: CanvasFillRule = "nonzero";

  constructor(readonly canvas: Canvas) {}

  getPixels(): Uint8ClampedArray {
    return this.#layerStack.at(-1)?.pixels ?? this.getBasePixels();
  }

  hasOpenLayers(): boolean {
    return this.#layerStack.length > 0;
  }

  protected abstract getBasePixels(): Uint8ClampedArray;

  protected abstract fillRectPixels(x: number, y: number, width: number, height: number, color: Rgba): void;

  get fillStyle(): string | CanvasGradient | CanvasPattern {
    return this.#fillStyle;
  }

  set fillStyle(value: string | CanvasGradient | CanvasPattern) {
    const paint = parseCanvasPaintStyle(value);

    if (!paint) {
      return;
    }

    this.#fillStyle = paint.style;
    this.#fillPaint = paint.paint;
  }

  get strokeStyle(): string | CanvasGradient | CanvasPattern {
    return this.#strokeStyle;
  }

  set strokeStyle(value: string | CanvasGradient | CanvasPattern) {
    const paint = parseCanvasPaintStyle(value);

    if (!paint) {
      return;
    }

    this.#strokeStyle = paint.style;
    this.#strokePaint = paint.paint;
  }

  get globalAlpha(): number {
    return this.#globalAlpha;
  }

  set globalAlpha(value: number) {
    const alpha = Number(value);

    if (!Number.isFinite(alpha) || alpha < 0 || alpha > 1) {
      return;
    }

    this.#globalAlpha = alpha;
  }

  get globalCompositeOperation(): string {
    return this.#globalCompositeOperation;
  }

  set globalCompositeOperation(value: string) {
    const operation = String(value);

    if (!GLOBAL_COMPOSITE_OPERATIONS.has(operation)) {
      return;
    }

    this.#globalCompositeOperation = operation as GlobalCompositeOperation;
  }

  get lineWidth(): number {
    return this.#lineWidth;
  }

  set lineWidth(value: number) {
    const width = Number(value);

    if (!Number.isFinite(width) || width <= 0) {
      return;
    }

    this.#lineWidth = width;
  }

  get lineCap(): CanvasLineCap {
    return this.#lineCap;
  }

  set lineCap(value: CanvasLineCap) {
    if (!isCanvasLineCap(value)) {
      return;
    }

    this.#lineCap = value;
  }

  get lineJoin(): CanvasLineJoin {
    return this.#lineJoin;
  }

  set lineJoin(value: CanvasLineJoin) {
    if (!isCanvasLineJoin(value)) {
      return;
    }

    this.#lineJoin = value;
  }

  get miterLimit(): number {
    return this.#miterLimit;
  }

  set miterLimit(value: number) {
    const limit = Number(value);

    if (!Number.isFinite(limit) || limit <= 0) {
      return;
    }

    this.#miterLimit = limit;
  }

  get lineDashOffset(): number {
    return this.#lineDashOffset;
  }

  set lineDashOffset(value: number) {
    const offset = Number(value);

    if (!Number.isFinite(offset)) {
      return;
    }

    this.#lineDashOffset = offset;
  }

  get font(): string {
    return this.#font;
  }

  set font(value: string) {
    const font = parseCanvasFont(String(value));

    if (!font) {
      return;
    }

    this.#font = font;
  }

  get textAlign(): CanvasTextAlign {
    return this.#textAlign;
  }

  set textAlign(value: CanvasTextAlign) {
    if (!isCanvasTextAlign(value)) {
      return;
    }

    this.#textAlign = value;
  }

  get textBaseline(): CanvasTextBaseline {
    return this.#textBaseline;
  }

  set textBaseline(value: CanvasTextBaseline) {
    if (!isCanvasTextBaseline(value)) {
      return;
    }

    this.#textBaseline = value;
  }

  get direction(): CanvasDirection {
    return this.#direction;
  }

  set direction(value: CanvasDirection) {
    if (!isCanvasDirection(value)) {
      return;
    }

    this.#direction = value;
  }

  get letterSpacing(): string {
    return this.#letterSpacing;
  }

  set letterSpacing(value: string) {
    const length = parseCssLength(String(value));

    if (!length) {
      return;
    }

    this.#letterSpacing = length;
  }

  get wordSpacing(): string {
    return this.#wordSpacing;
  }

  set wordSpacing(value: string) {
    const length = parseCssLength(String(value));

    if (!length) {
      return;
    }

    this.#wordSpacing = length;
  }

  get fontKerning(): CanvasFontKerning {
    return this.#fontKerning;
  }

  set fontKerning(value: CanvasFontKerning) {
    if (!isCanvasFontKerning(value)) {
      return;
    }

    this.#fontKerning = value;
  }

  get fontStretch(): CanvasFontStretch {
    return this.#fontStretch;
  }

  set fontStretch(value: CanvasFontStretch) {
    if (!isCanvasFontStretch(value)) {
      return;
    }

    this.#fontStretch = value;
  }

  get fontVariantCaps(): CanvasFontVariantCaps {
    return this.#fontVariantCaps;
  }

  set fontVariantCaps(value: CanvasFontVariantCaps) {
    if (!isCanvasFontVariantCaps(value)) {
      return;
    }

    this.#fontVariantCaps = value;
  }

  get textRendering(): CanvasTextRendering {
    return this.#textRendering;
  }

  set textRendering(value: CanvasTextRendering) {
    if (!isCanvasTextRendering(value)) {
      return;
    }

    this.#textRendering = value;
  }

  get imageSmoothingEnabled(): boolean {
    return this.#imageSmoothingEnabled;
  }

  set imageSmoothingEnabled(value: boolean) {
    this.#imageSmoothingEnabled = Boolean(value);
  }

  get imageSmoothingQuality(): CanvasImageSmoothingQuality {
    return this.#imageSmoothingQuality;
  }

  set imageSmoothingQuality(value: CanvasImageSmoothingQuality) {
    if (!isCanvasImageSmoothingQuality(value)) {
      return;
    }

    this.#imageSmoothingQuality = value;
  }

  get shadowOffsetX(): number {
    return this.#shadowOffsetX;
  }

  set shadowOffsetX(value: number) {
    const offset = Number(value);

    if (!Number.isFinite(offset)) {
      return;
    }

    this.#shadowOffsetX = offset;
  }

  get shadowOffsetY(): number {
    return this.#shadowOffsetY;
  }

  set shadowOffsetY(value: number) {
    const offset = Number(value);

    if (!Number.isFinite(offset)) {
      return;
    }

    this.#shadowOffsetY = offset;
  }

  get shadowBlur(): number {
    return this.#shadowBlur;
  }

  set shadowBlur(value: number) {
    const blur = Number(value);

    if (!Number.isFinite(blur) || blur < 0) {
      return;
    }

    this.#shadowBlur = blur;
  }

  get shadowColor(): string {
    return this.#shadowColor;
  }

  set shadowColor(value: string) {
    const color = parseColor(String(value));

    if (!color) {
      return;
    }

    this.#shadowColor = color.serialized;
    this.#shadowRgba = color.rgba;
  }

  get filter(): string | object {
    return this.#filter;
  }

  set filter(value: string | object) {
    const filter = typeof value === "object" && value !== null ? parseCanvasFilterObject(value) : parseCanvasFilter(String(value));

    if (!filter) {
      return;
    }

    this.#filter = filter.serialized;
    this.#filterOpacity = filter.opacity;
    this.#filterOperations = filter.operations;
  }

  createLinearGradient(x0: number, y0: number, x1: number, y1: number): CanvasGradient {
    assertFiniteNumbers([x0, y0, x1, y1], "createLinearGradient");
    return new CanvasGradient({ type: "linear", x0, y0, x1, y1 });
  }

  createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): CanvasGradient {
    assertFiniteNumbers([x0, y0, r0, x1, y1, r1], "createRadialGradient");

    if (r0 < 0 || r1 < 0) {
      throw createIndexSizeError("The radius provided is negative.");
    }

    return new CanvasGradient({ type: "radial", x0, y0, r0, x1, y1, r1 });
  }

  createConicGradient(startAngle: number, x: number, y: number): CanvasGradient {
    assertFiniteNumbers([startAngle, x, y], "createConicGradient");
    return new CanvasGradient({ type: "conic", startAngle, x, y });
  }

  createPattern(image: Canvas, repetition: string | null = "repeat"): CanvasPattern | null {
    const normalized = normalizePatternRepetition(repetition);

    if (!normalized) {
      throw createSyntaxError("The repetition value is not supported.");
    }

    if (!isCanvasImageSource(image)) {
      return null;
    }

    assertCanvasSourceUsable(image);

    return new CanvasPattern(image, normalized);
  }

  beginLayer(options: CanvasLayerOptions | null = null): void {
    if (options !== null && options !== undefined && typeof options !== "object") {
      throw new TypeError("beginLayer() options must be an object.");
    }

    let filterOpacity = this.#filterOpacity;
    let filterOperations = this.#filterOperations;
    if (options && "filter" in options) {
      const filter = parseCanvasLayerFilter(options.filter);
      filterOpacity = filter?.opacity ?? 1;
      filterOperations = filter?.operations ?? [];
    }

    this.#layerStack.push({
      pixels: new Uint8ClampedArray(this.canvas.width * this.canvas.height * 4),
      alpha: this.#globalAlpha,
      operation: this.#globalCompositeOperation,
      filterOpacity,
      filterOperations,
      filterTransform: this.#transform,
      savedStateDepth: this.#stateStack.length,
      outerState: this.#captureState()
    });
    this.#resetLayerRenderingState();
  }

  endLayer(): void {
    const layer = this.#layerStack.pop();

    if (!layer) {
      throw createInvalidStateError("There is no canvas layer to end.");
    }

    if (this.#stateStack.length !== layer.savedStateDepth) {
      this.#layerStack.push(layer);
      throw createInvalidStateError("Canvas layer cannot end across saved drawing state.");
    }

    const target = this.getPixels();
    const filteredPixels = applyCanvasFilterOperations(
      layer.pixels,
      this.canvas.width,
      this.canvas.height,
      layer.filterOperations,
      layer.filterTransform
    );
    const alpha = layer.alpha * layer.filterOpacity;

    for (let offset = 0; offset < filteredPixels.length; offset += 4) {
      const source = applyAlpha(
        [filteredPixels[offset], filteredPixels[offset + 1], filteredPixels[offset + 2], filteredPixels[offset + 3]],
        alpha
      );

      if (source[3] !== 0 || layer.operation === "clear" || layer.operation === "copy") {
        compositePixel(target, offset, source, layer.operation);
      }
    }

    this.#applyState(layer.outerState);
  }

  reset(): void {
    this.#clearAllPixels();
    this.#resetDrawingState();
    this.#currentPath = new CanvasPath2D();
    this.#stateStack = [];
    this.#clipMask = undefined;
    this.#layerStack = [];
  }

  save(): void {
    this.#stateStack.push(this.#captureState());
  }

  restore(): void {
    const layer = this.#layerStack.at(-1);

    if (layer && this.#stateStack.length <= layer.savedStateDepth) {
      throw createInvalidStateError("Canvas layer cannot restore across its layer boundary.");
    }

    const state = this.#stateStack.pop();

    if (!state) {
      return;
    }

    this.#applyState(state);
  }

  #captureState(): CanvasState {
    return {
      fillStyle: this.#fillStyle,
      fillPaint: this.#fillPaint,
      transform: this.#transform,
      strokeStyle: this.#strokeStyle,
      strokePaint: this.#strokePaint,
      fillRule: this.fillRule,
      globalAlpha: this.globalAlpha,
      lineWidth: this.lineWidth,
      lineCap: this.lineCap,
      lineJoin: this.lineJoin,
      miterLimit: this.miterLimit,
      globalCompositeOperation: this.globalCompositeOperation,
      font: this.font,
      textAlign: this.textAlign,
      textBaseline: this.textBaseline,
      direction: this.direction,
      letterSpacing: this.letterSpacing,
      wordSpacing: this.wordSpacing,
      fontKerning: this.fontKerning,
      fontStretch: this.fontStretch,
      fontVariantCaps: this.fontVariantCaps,
      textRendering: this.textRendering,
      imageSmoothingEnabled: this.imageSmoothingEnabled,
      imageSmoothingQuality: this.imageSmoothingQuality,
      filter: this.filter,
      filterOpacity: this.#filterOpacity,
      filterOperations: this.#filterOperations,
      shadowOffsetX: this.shadowOffsetX,
      shadowOffsetY: this.shadowOffsetY,
      shadowBlur: this.shadowBlur,
      shadowColor: this.shadowColor,
      shadowRgba: this.#shadowRgba,
      lineDash: [...this.#lineDash],
      lineDashOffset: this.lineDashOffset,
      clipMask: this.#clipMask ? new Uint8Array(this.#clipMask) : undefined
    };
  }

  #applyState(state: CanvasState): void {
    this.#fillStyle = state.fillStyle;
    this.#fillPaint = state.fillPaint;
    this.#transform = state.transform;
    this.#strokeStyle = state.strokeStyle;
    this.#strokePaint = state.strokePaint;
    this.fillRule = state.fillRule;
    this.globalAlpha = state.globalAlpha;
    this.lineWidth = state.lineWidth;
    this.lineCap = state.lineCap;
    this.lineJoin = state.lineJoin;
    this.miterLimit = state.miterLimit;
    this.globalCompositeOperation = state.globalCompositeOperation;
    this.font = state.font;
    this.textAlign = state.textAlign;
    this.textBaseline = state.textBaseline;
    this.direction = state.direction;
    this.letterSpacing = state.letterSpacing;
    this.wordSpacing = state.wordSpacing;
    this.fontKerning = state.fontKerning;
    this.fontStretch = state.fontStretch;
    this.fontVariantCaps = state.fontVariantCaps;
    this.textRendering = state.textRendering;
    this.#imageSmoothingEnabled = state.imageSmoothingEnabled;
    this.#imageSmoothingQuality = state.imageSmoothingQuality;
    this.#filter = state.filter;
    this.#filterOpacity = state.filterOpacity;
    this.#filterOperations = state.filterOperations;
    this.#shadowOffsetX = state.shadowOffsetX;
    this.#shadowOffsetY = state.shadowOffsetY;
    this.#shadowBlur = state.shadowBlur;
    this.#shadowColor = state.shadowColor;
    this.#shadowRgba = state.shadowRgba;
    this.#lineDash = [...state.lineDash];
    this.lineDashOffset = state.lineDashOffset;
    this.#clipMask = state.clipMask ? new Uint8Array(state.clipMask) : undefined;
  }

  #resetLayerRenderingState(): void {
    this.#globalAlpha = 1;
    this.#globalCompositeOperation = "source-over";
    this.#filter = "none";
    this.#filterOpacity = 1;
    this.#filterOperations = [];
    this.#shadowOffsetX = 0;
    this.#shadowOffsetY = 0;
    this.#shadowBlur = 0;
    this.#shadowColor = "rgba(0, 0, 0, 0)";
    this.#shadowRgba = [0, 0, 0, 0];
  }

  #resetDrawingState(): void {
    this.#fillStyle = "#000000";
    this.#fillPaint = { type: "color", rgba: [0, 0, 0, 255] };
    this.#strokeStyle = "#000000";
    this.#strokePaint = { type: "color", rgba: [0, 0, 0, 255] };
    this.#transform = IDENTITY_MATRIX;
    this.fillRule = "nonzero";
    this.#globalAlpha = 1;
    this.#globalCompositeOperation = "source-over";
    this.#lineWidth = 1;
    this.#lineCap = "butt";
    this.#lineJoin = "miter";
    this.#miterLimit = 10;
    this.#lineDash = [];
    this.#lineDashOffset = 0;
    this.#font = "10px sans-serif";
    this.#textAlign = "start";
    this.#textBaseline = "alphabetic";
    this.#direction = "inherit";
    this.#letterSpacing = "0px";
    this.#wordSpacing = "0px";
    this.#fontKerning = "auto";
    this.#fontStretch = "normal";
    this.#fontVariantCaps = "normal";
    this.#textRendering = "auto";
    this.#filter = "none";
    this.#filterOpacity = 1;
    this.#filterOperations = [];
    this.#shadowOffsetX = 0;
    this.#shadowOffsetY = 0;
    this.#shadowBlur = 0;
    this.#shadowColor = "rgba(0, 0, 0, 0)";
    this.#shadowRgba = [0, 0, 0, 0];
    this.#imageSmoothingEnabled = true;
    this.#imageSmoothingQuality = "low";
  }

  #clearAllPixels(): void {
    this.getBasePixels().fill(0);
    for (const layer of this.#layerStack) {
      layer.pixels.fill(0);
    }
  }

  #assertNoOpenLayersForPixelReadback(): void {
    if (this.hasOpenLayers()) {
      throw createInvalidStateError("Canvas pixel data cannot be accessed while layers are open.");
    }
  }

  clearRect(x: number, y: number, width: number, height: number): void {
    this.#clearTransformedRect(x, y, width, height);
  }

  fillRect(x: number, y: number, width: number, height: number): void {
    if (this.#filterOperations.length > 0 && !isOnlyOpacityFilter(this.#filterOperations) && this.#fillFilteredRect(x, y, width, height)) {
      return;
    }

    this.#drawShadowRect(x, y, width, height);
    this.#fillTransformedRect(x, y, width, height, this.#paintFor(this.#fillPaint));
  }

  strokeRect(x: number, y: number, width: number, height: number): void {
    if (![x, y, width, height].every(Number.isFinite) || (width === 0 && height === 0)) {
      return;
    }

    const path = new CanvasPath2D();
    if (width === 0 || height === 0) {
      path.moveTo(x, y);
      path.lineTo(x + width, y + height);
      path.lineTo(x, y);
      path.closePath();
    } else {
      path.rect(x, y, width, height);
    }
    this.#drawShadowStroke(path);
    this.#strokePath(path);
  }

  fill(fillRule?: CanvasFillRule): void;
  fill(path?: CanvasPath2D, fillRule?: CanvasFillRule): void;
  fill(pathOrRule: CanvasPath2D | CanvasFillRule = this.#currentPath, fillRule: CanvasFillRule = this.fillRule): void {
    const path = typeof pathOrRule === "string" ? this.#currentPath : pathOrRule;
    const rule = normalizeCanvasFillRule(typeof pathOrRule === "string" ? pathOrRule : fillRule);

    this.#drawShadowFill(path, rule);
    fillPolygons(
      this.getPixels(),
      this.canvas.width,
      this.canvas.height,
      pathToPolygons(path, this.#transform),
      this.#paintFor(this.#fillPaint),
      this.#globalCompositeOperation,
      rule
    );
  }

  stroke(path: CanvasPath2D = this.#currentPath): void {
    this.#drawShadowStroke(path);
    this.#strokePath(path);
  }

  clip(fillRule?: CanvasFillRule): void;
  clip(path?: CanvasPath2D, fillRule?: CanvasFillRule): void;
  clip(pathOrRule: CanvasPath2D | CanvasFillRule = this.#currentPath, fillRule: CanvasFillRule = this.fillRule): void {
    const path = typeof pathOrRule === "string" ? this.#currentPath : pathOrRule;
    const rule = normalizeCanvasFillRule(typeof pathOrRule === "string" ? pathOrRule : fillRule);
    const nextMask = rasterizeClipMask(
      this.canvas.width,
      this.canvas.height,
      pathToPolygons(path, this.#transform),
      rule,
      this.#clipMask
    );

    this.#clipMask = nextMask;
  }

  isPointInPath(x: number, y: number, fillRule?: CanvasFillRule): boolean;
  isPointInPath(path: CanvasPath2D, x: number, y: number, fillRule?: CanvasFillRule): boolean;
  isPointInPath(pathOrX: CanvasPath2D | number, xOrY: number, yOrFillRule?: number | CanvasFillRule, maybeFillRule?: CanvasFillRule): boolean {
    const hasPath = pathOrX instanceof CanvasPath2D;

    if (!hasPath && (pathOrX === undefined || pathOrX === null || typeof pathOrX === "object")) {
      throw new TypeError("isPointInPath() requires a Path2D object or point coordinates.");
    }

    const path = hasPath ? pathOrX : this.#currentPath;
    const x = Number(hasPath ? xOrY : pathOrX);
    const y = Number(hasPath ? yOrFillRule : xOrY);
    const fillRule = (hasPath ? maybeFillRule : yOrFillRule) as CanvasFillRule | undefined;

    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      return false;
    }

    const point = inverseTransformPoint(this.#transform, x, y);
    return point
      ? isPointInPolygons(
          point.x,
          point.y,
          pathToPolygons(path, IDENTITY_MATRIX),
          normalizeCanvasFillRule(fillRule === undefined ? this.fillRule : fillRule)
        )
      : false;
  }

  isPointInStroke(x: number, y: number): boolean;
  isPointInStroke(path: CanvasPath2D, x: number, y: number): boolean;
  isPointInStroke(pathOrX: CanvasPath2D | number, xOrY: number, maybeY?: number): boolean {
    const hasPath = pathOrX instanceof CanvasPath2D;

    if (!hasPath && (pathOrX === undefined || pathOrX === null || typeof pathOrX === "object")) {
      throw new TypeError("isPointInStroke() requires a Path2D object or point coordinates.");
    }

    const path = hasPath ? pathOrX : this.#currentPath;
    const x = Number(hasPath ? xOrY : pathOrX);
    const y = Number(hasPath ? maybeY : xOrY);

    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      return false;
    }

    const point = inverseTransformPoint(this.#transform, x, y);
    if (!point) {
      return false;
    }

    return isPointInStrokePath(point, path, IDENTITY_MATRIX, {
      lineWidth: this.#lineWidth,
      lineCap: this.#lineCap,
      lineJoin: this.#lineJoin,
      lineDash: this.#lineDash,
      lineDashOffset: this.#lineDashOffset
    });
  }

  strokeText(text: unknown, x: number, y: number, maxWidth?: number): void {
    const textString = String(text);

    if (
      textString.length === 0 ||
      !Number.isFinite(x) ||
      !Number.isFinite(y) ||
      (maxWidth !== undefined && !Number.isFinite(maxWidth))
    ) {
      return;
    }

    const metrics = parseFontMetrics(this.#font);
    const glyphWidth = metrics.size * 0.6;
    const glyphHeight = metrics.size;
    const naturalWidth = textString.length * glyphWidth;

    if (naturalWidth <= 0 || maxWidth === 0) {
      return;
    }

    const widthScale = maxWidth !== undefined && maxWidth > 0 && naturalWidth > maxWidth ? maxWidth / naturalWidth : 1;
    const originX = resolveTextX(x, naturalWidth * widthScale, this.#textAlign);
    const originY = resolveTextY(y, glyphHeight, this.#textBaseline);
    const path = new CanvasPath2D();

    for (let index = 0; index < textString.length; index += 1) {
      if (textString[index] === " ") {
        continue;
      }

      const left = originX + index * glyphWidth * widthScale + metrics.size * 0.1 * widthScale;
      const top = originY + metrics.size * 0.1;
      path.rect(left, top, glyphWidth * 0.8 * widthScale, glyphHeight * 0.8);
    }

    this.#drawShadowStroke(path);
    this.#strokePath(path);
  }

  measureText(text: unknown): CanvasTextMetrics {
    const textString = String(text);
    const metrics = parseFontMetrics(this.#font);
    return new CanvasTextMetrics(measureFallbackTextWidth(textString, metrics.size, this.#letterSpacing, this.#wordSpacing), metrics.size);
  }

  drawImage(image: Canvas, dx: number, dy: number): void;
  drawImage(image: Canvas, dx: number, dy: number, dWidth: number, dHeight: number): void;
  drawImage(
    image: Canvas,
    sx: number,
    sy: number,
    sWidth: number,
    sHeight: number,
    dx: number,
    dy: number,
    dWidth: number,
    dHeight: number
  ): void;
  drawImage(image: Canvas, ...args: number[]): void {
    if (!isCanvasImageSource(image)) {
      throw createTypeMismatchError("The image argument is not a supported CanvasImageSource.");
    }

    assertCanvasSourceUsable(image);

    const geometry = normalizeDrawImageArguments(image, args);

    if (!geometry) {
      throw new TypeError("drawImage() requires 3, 5, or 9 arguments.");
    }

    if (geometry.sourceWidth === 0 || geometry.sourceHeight === 0) {
      throw createIndexSizeError("The source width or height is 0.");
    }

    if (geometry.destWidth === 0 || geometry.destHeight === 0 || geometry.sourceCanvas.width === 0 || geometry.sourceCanvas.height === 0) {
      return;
    }

    if (
      ![
        geometry.sourceX,
        geometry.sourceY,
        geometry.sourceWidth,
        geometry.sourceHeight,
        geometry.destX,
        geometry.destY,
        geometry.destWidth,
        geometry.destHeight
      ].every(Number.isFinite)
    ) {
      return;
    }

    this.#drawCanvasImage(geometry);
  }

  beginPath(): void {
    this.#currentPath = new CanvasPath2D();
  }

  moveTo(x: number, y: number): void {
    this.#currentPath.moveTo(x, y);
  }

  lineTo(x: number, y: number): void {
    this.#currentPath.lineTo(x, y);
  }

  rect(x: number, y: number, width: number, height: number): void {
    this.#currentPath.rect(x, y, width, height);
  }

  quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void {
    this.#currentPath.quadraticCurveTo(cpx, cpy, x, y);
  }

  bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void {
    this.#currentPath.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
  }

  arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void {
    this.#currentPath.arcTo(x1, y1, x2, y2, radius);
  }

  roundRect(x: number, y: number, width: number, height: number, radii?: number | DOMPointInit | Array<number | DOMPointInit>): void {
    this.#currentPath.roundRect(x, y, width, height, radii);
  }

  arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise = false): void {
    this.#currentPath.arc(x, y, radius, startAngle, endAngle, counterclockwise);
  }

  ellipse(
    x: number,
    y: number,
    radiusX: number,
    radiusY: number,
    rotation: number,
    startAngle: number,
    endAngle: number,
    counterclockwise = false
  ): void {
    this.#currentPath.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise);
  }

  closePath(): void {
    this.#currentPath.closePath();
  }

  createImageData(width: number, height: number, settings?: ImageDataSettings): CanvasImageData;
  createImageData(imageData: CanvasImageData): CanvasImageData;
  createImageData(widthOrImageData: number | CanvasImageData, height?: number, settings?: ImageDataSettings): CanvasImageData {
    if (widthOrImageData instanceof CanvasImageData) {
      return new CanvasImageData(widthOrImageData.width, widthOrImageData.height, { colorSpace: widthOrImageData.colorSpace });
    }

    if (height === undefined) {
      throw new TypeError("createImageData() requires width and height.");
    }

    const width = toWebIDLLong(widthOrImageData, "width");
    const imageHeight = toWebIDLLong(height, "height");

    if (width === 0 || imageHeight === 0) {
      throw createIndexSizeError("The source width or height is 0.");
    }

    return new CanvasImageData(Math.abs(width), Math.abs(imageHeight), settings);
  }

  getImageData(sx: number, sy: number, sw: number, sh: number, settings?: ImageDataSettings): CanvasImageData {
    this.#assertNoOpenLayersForPixelReadback();

    const sourceX = toWebIDLLong(sx, "sx");
    const sourceY = toWebIDLLong(sy, "sy");
    const sourceWidth = toWebIDLLong(sw, "sw");
    const sourceHeight = toWebIDLLong(sh, "sh");
    const colorSpace = normalizeImageDataColorSpace(settings);

    if (sourceWidth === 0 || sourceHeight === 0) {
      throw createIndexSizeError("The source width or height is 0.");
    }

    const sourceLeft = sourceWidth < 0 ? sourceX + sourceWidth : sourceX;
    const sourceTop = sourceHeight < 0 ? sourceY + sourceHeight : sourceY;
    const width = Math.abs(sourceWidth);
    const height = Math.abs(sourceHeight);
    const source = this.getPixels();
    const data = new Uint8ClampedArray(width * height * 4);

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const sourceX = sourceLeft + x;
        const sourceY = sourceTop + y;
        const targetOffset = (y * width + x) * 4;

        if (sourceX < 0 || sourceX >= this.canvas.width || sourceY < 0 || sourceY >= this.canvas.height) {
          continue;
        }

        const sourceOffset = (sourceY * this.canvas.width + sourceX) * 4;
        data[targetOffset] = source[sourceOffset];
        data[targetOffset + 1] = source[sourceOffset + 1];
        data[targetOffset + 2] = source[sourceOffset + 2];
        data[targetOffset + 3] = source[sourceOffset + 3];
      }
    }

    return new CanvasImageData(data, width, height, { colorSpace });
  }

  putImageData(imageData: CanvasImageData, dx: number, dy: number): void;
  putImageData(
    imageData: CanvasImageData,
    dx: number,
    dy: number,
    dirtyX: number,
    dirtyY: number,
    dirtyWidth: number,
    dirtyHeight: number
  ): void;
  putImageData(
    imageData: CanvasImageData,
    dx: number,
    dy: number,
    dirtyX?: number,
    dirtyY?: number,
    dirtyWidth?: number,
    dirtyHeight?: number
  ): void {
    this.#assertNoOpenLayersForPixelReadback();

    if (!(imageData instanceof CanvasImageData)) {
      throw new TypeError("putImageData() requires a CanvasImageData object.");
    }

    const destX = toWebIDLLong(dx, "dx");
    const destY = toWebIDLLong(dy, "dy");
    const dirtyLeftValue = toWebIDLLong(dirtyX ?? 0, "dirtyX");
    const dirtyTopValue = toWebIDLLong(dirtyY ?? 0, "dirtyY");
    const dirtyWidthValue = toWebIDLLong(dirtyWidth ?? imageData.width, "dirtyWidth");
    const dirtyHeightValue = toWebIDLLong(dirtyHeight ?? imageData.height, "dirtyHeight");

    if (dirtyWidthValue === 0 || dirtyHeightValue === 0) {
      return;
    }

    const dirtyLeft = clamp(dirtyWidthValue < 0 ? dirtyLeftValue + dirtyWidthValue : dirtyLeftValue, 0, imageData.width);
    const dirtyTop = clamp(dirtyHeightValue < 0 ? dirtyTopValue + dirtyHeightValue : dirtyTopValue, 0, imageData.height);
    const dirtyRight = clamp(dirtyWidthValue < 0 ? dirtyLeftValue : dirtyLeftValue + dirtyWidthValue, 0, imageData.width);
    const dirtyBottom = clamp(dirtyHeightValue < 0 ? dirtyTopValue : dirtyTopValue + dirtyHeightValue, 0, imageData.height);
    const pixels = this.getPixels();

    for (let sourceY = dirtyTop; sourceY < dirtyBottom; sourceY += 1) {
      const targetY = destY + sourceY;
      if (targetY < 0 || targetY >= this.canvas.height) {
        continue;
      }

      for (let sourceX = dirtyLeft; sourceX < dirtyRight; sourceX += 1) {
        const targetX = destX + sourceX;
        if (targetX < 0 || targetX >= this.canvas.width) {
          continue;
        }

        const sourceOffset = (sourceY * imageData.width + sourceX) * 4;
        const targetOffset = (targetY * this.canvas.width + targetX) * 4;
        pixels[targetOffset] = imageData.data[sourceOffset];
        pixels[targetOffset + 1] = imageData.data[sourceOffset + 1];
        pixels[targetOffset + 2] = imageData.data[sourceOffset + 2];
        pixels[targetOffset + 3] = imageData.data[sourceOffset + 3];
      }
    }
  }

  transform(a: number, b: number, c: number, d: number, e: number, f: number): void {
    if (![a, b, c, d, e, f].every(Number.isFinite)) {
      return;
    }

    this.#transform = multiplyMatrices(this.#transform, [a, b, c, d, e, f]);
  }

  setTransform(): void;
  setTransform(a: number, b: number, c: number, d: number, e: number, f: number): void;
  setTransform(a?: number, b?: number, c?: number, d?: number, e?: number, f?: number): void {
    if (arguments.length === 0) {
      this.resetTransform();
      return;
    }

    if (arguments.length !== 6) {
      throw new TypeError("setTransform() requires either zero or six arguments");
    }

    if (![a, b, c, d, e, f].every(Number.isFinite)) {
      return;
    }

    this.#transform = [a, b, c, d, e, f] as Matrix2D;
  }

  resetTransform(): void {
    this.#transform = IDENTITY_MATRIX;
  }

  getTransform(): CanvasTransformMatrix {
    return new CanvasTransformMatrix(this.#transform);
  }

  rotate(angle: number): void {
    if (!Number.isFinite(angle)) {
      return;
    }

    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    this.transform(cos, sin, -sin, cos, 0, 0);
  }

  scale(x: number, y: number): void {
    this.transform(x, 0, 0, y, 0, 0);
  }

  translate(x: number, y: number): void {
    this.transform(1, 0, 0, 1, x, y);
  }

  setLineDash(segments: readonly number[]): void {
    const dash = Array.from(segments, Number);

    if (dash.some((segment) => !Number.isFinite(segment) || segment < 0)) {
      return;
    }

    this.#lineDash = dash.length % 2 === 1 ? [...dash, ...dash] : dash;
  }

  getLineDash(): number[] {
    return [...this.#lineDash];
  }

  #drawCanvasImage(geometry: DrawImageGeometry): void {
    const sourceRect = normalizeRect(geometry.sourceX, geometry.sourceY, geometry.sourceWidth, geometry.sourceHeight);
    const destRect = normalizeRect(geometry.destX, geometry.destY, geometry.destWidth, geometry.destHeight);
    const clippedSource = clipSourceRect(sourceRect, geometry.sourceCanvas.width, geometry.sourceCanvas.height);

    if (!clippedSource || destRect.width === 0 || destRect.height === 0) {
      return;
    }

    const sourceScaleX = clippedSource.width / sourceRect.width;
    const sourceScaleY = clippedSource.height / sourceRect.height;
    const clippedDest: NormalizedRect = {
      left: destRect.left + ((clippedSource.left - sourceRect.left) / sourceRect.width) * destRect.width,
      top: destRect.top + ((clippedSource.top - sourceRect.top) / sourceRect.height) * destRect.height,
      width: destRect.width * sourceScaleX,
      height: destRect.height * sourceScaleY
    };
    const inverseTransform = new CanvasTransformMatrix(this.#transform).invertSelf();

    if (
      ![
        inverseTransform.a,
        inverseTransform.b,
        inverseTransform.c,
        inverseTransform.d,
        inverseTransform.e,
        inverseTransform.f
      ].every(Number.isFinite)
    ) {
      return;
    }

    const bounds = transformedRectBounds(clippedDest, this.#transform, this.canvas.width, this.canvas.height);
    const sourcePixels = geometry.sourceCanvas.getContext("2d").getPixels();
    const targetPixels = this.getPixels();
    const alpha = this.#globalAlpha * this.#filterOpacity;

    for (let y = bounds.top; y < bounds.bottom; y += 1) {
      for (let x = bounds.left; x < bounds.right; x += 1) {
        if (!this.#isPixelInClip(x, y)) {
          continue;
        }

        const userPoint = transformPoint(matrixFromObject(inverseTransform), x + 0.5, y + 0.5);

        if (
          userPoint.x < clippedDest.left ||
          userPoint.x >= clippedDest.left + clippedDest.width ||
          userPoint.y < clippedDest.top ||
          userPoint.y >= clippedDest.top + clippedDest.height
        ) {
          continue;
        }

        const u = (userPoint.x - clippedDest.left) / clippedDest.width;
        const v = (userPoint.y - clippedDest.top) / clippedDest.height;
        const sourceX = clippedSource.left + u * clippedSource.width;
        const sourceY = clippedSource.top + v * clippedSource.height;
        const color = applyAlpha(
          this.#imageSmoothingEnabled
            ? sampleBilinear(sourcePixels, geometry.sourceCanvas.width, geometry.sourceCanvas.height, sourceX, sourceY)
            : sampleNearest(sourcePixels, geometry.sourceCanvas.width, geometry.sourceCanvas.height, sourceX, sourceY),
          alpha
        );
        compositePixel(targetPixels, (y * this.canvas.width + x) * 4, color, this.#globalCompositeOperation);
      }
    }
  }

  #clearTransformedRect(x: number, y: number, width: number, height: number): void {
    if (![x, y, width, height].every(Number.isFinite)) {
      return;
    }

    if (isIdentityMatrix(this.#transform) && !this.#clipMask && this.#layerStack.length === 0) {
      this.fillRectPixels(x, y, width, height, TRANSPARENT_BLACK);
      return;
    }

    if (isIdentityMatrix(this.#transform)) {
      this.#clearRectPixels(x, y, width, height);
      return;
    }

    const path = new CanvasPath2D();
    path.rect(x, y, width, height);
    fillPolygons(
      this.getPixels(),
      this.canvas.width,
      this.canvas.height,
      pathToPolygons(path, this.#transform),
      this.#clearPaint(),
      "clear",
      this.fillRule
    );
  }

  #fillTransformedRect(x: number, y: number, width: number, height: number, paint: Paint): void {
    if (![x, y, width, height].every(Number.isFinite)) {
      return;
    }

    if (isIdentityMatrix(this.#transform)) {
      this.#fillRectPixels(x, y, width, height, paint);
      return;
    }

    const path = new CanvasPath2D();
    path.rect(x, y, width, height);
    fillPolygons(
      this.getPixels(),
      this.canvas.width,
      this.canvas.height,
      pathToPolygons(path, this.#transform),
      paint,
      this.#globalCompositeOperation,
      this.fillRule
    );
  }

  #fillFilteredRect(x: number, y: number, width: number, height: number): boolean {
    if (![x, y, width, height].every(Number.isFinite) || !isIdentityMatrix(this.#transform) || this.#clipMask) {
      return false;
    }

    const temp = new Uint8ClampedArray(this.canvas.width * this.canvas.height * 4);
    const x2 = x + width;
    const y2 = y + height;
    const left = clamp(Math.trunc(Math.min(x, x2)), 0, this.canvas.width);
    const top = clamp(Math.trunc(Math.min(y, y2)), 0, this.canvas.height);
    const right = clamp(Math.trunc(Math.max(x, x2)), 0, this.canvas.width);
    const bottom = clamp(Math.trunc(Math.max(y, y2)), 0, this.canvas.height);

    for (let py = top; py < bottom; py += 1) {
      for (let px = left; px < right; px += 1) {
        const color = applyAlpha(sampleCanvasPaintStyle(this.#fillPaint, px + 0.5, py + 0.5), this.#globalAlpha);
        if (color[3] !== 0) {
          compositePixel(temp, (py * this.canvas.width + px) * 4, color, "source-over");
        }
      }
    }

    const filtered = applyCanvasFilterOperations(temp, this.canvas.width, this.canvas.height, this.#filterOperations, this.#transform);
    const pixels = this.getPixels();

    for (let offset = 0; offset < filtered.length; offset += 4) {
      if (filtered[offset + 3] !== 0) {
        compositePixel(pixels, offset, [filtered[offset], filtered[offset + 1], filtered[offset + 2], filtered[offset + 3]], this.#globalCompositeOperation);
      }
    }

    return true;
  }

  #fillRectPixels(x: number, y: number, width: number, height: number, paint: Paint): void {
    const x2 = x + width;
    const y2 = y + height;
    const left = clamp(Math.trunc(Math.min(x, x2)), 0, this.canvas.width);
    const top = clamp(Math.trunc(Math.min(y, y2)), 0, this.canvas.height);
    const right = clamp(Math.trunc(Math.max(x, x2)), 0, this.canvas.width);
    const bottom = clamp(Math.trunc(Math.max(y, y2)), 0, this.canvas.height);
    const pixels = this.getPixels();

    for (let py = top; py < bottom; py += 1) {
      for (let px = left; px < right; px += 1) {
        const color = paint.sample(px + 0.5, py + 0.5);
        if (color[3] !== 0) {
          compositePixel(pixels, (py * this.canvas.width + px) * 4, color, this.#globalCompositeOperation);
        }
      }
    }
  }

  #clearRectPixels(x: number, y: number, width: number, height: number): void {
    const x2 = x + width;
    const y2 = y + height;
    const left = clamp(Math.trunc(Math.min(x, x2)), 0, this.canvas.width);
    const top = clamp(Math.trunc(Math.min(y, y2)), 0, this.canvas.height);
    const right = clamp(Math.trunc(Math.max(x, x2)), 0, this.canvas.width);
    const bottom = clamp(Math.trunc(Math.max(y, y2)), 0, this.canvas.height);
    const pixels = this.getPixels();

    for (let py = top; py < bottom; py += 1) {
      for (let px = left; px < right; px += 1) {
        if (!this.#isPixelInClip(px, py)) {
          continue;
        }

        const offset = (py * this.canvas.width + px) * 4;
        pixels[offset] = 0;
        pixels[offset + 1] = 0;
        pixels[offset + 2] = 0;
        pixels[offset + 3] = 0;
      }
    }
  }

  #strokePath(path: CanvasPath2D): void {
    strokePath(
      this.getPixels(),
      this.canvas.width,
      this.canvas.height,
      path,
      this.#transform,
      {
        paint: this.#paintFor(this.#strokePaint),
        operation: this.#globalCompositeOperation,
        lineWidth: this.#lineWidth,
        lineCap: this.#lineCap,
        lineJoin: this.#lineJoin,
        miterLimit: this.#miterLimit,
        lineDash: this.#lineDash,
        lineDashOffset: this.#lineDashOffset
      }
    );
  }

  #paintFor(style: CanvasPaintStyle): Paint {
    const inverseTransform = new CanvasTransformMatrix(this.#transform).invertSelf();
    const alpha = this.#globalAlpha * this.#filterOpacity;
    return {
      sample: (x, y) => {
        if (!this.#isPixelInClip(Math.floor(x), Math.floor(y))) {
          return TRANSPARENT_BLACK;
        }

        const userPoint =
          Number.isFinite(inverseTransform.a) && Number.isFinite(inverseTransform.d)
            ? transformPoint(matrixFromObject(inverseTransform), x, y)
            : { x, y };
        return applyAlpha(sampleCanvasPaintStyle(style, userPoint.x, userPoint.y), alpha);
      }
    };
  }

  #shadowPaint(): Paint {
    const color = applyAlpha(this.#shadowRgba, this.#globalAlpha);
    return {
      sample: (x, y) => (this.#isPixelInClip(Math.floor(x), Math.floor(y)) ? color : TRANSPARENT_BLACK)
    };
  }

  #clearPaint(): Paint {
    return {
      sample: (x, y) => (this.#isPixelInClip(Math.floor(x), Math.floor(y)) ? [0, 0, 0, 255] : TRANSPARENT_BLACK)
    };
  }

  #isPixelInClip(x: number, y: number): boolean {
    return !this.#clipMask || this.#clipMask[y * this.canvas.width + x] === 1;
  }

  #hasVisibleShadow(): boolean {
    return this.#shadowRgba[3] !== 0 && (this.#shadowOffsetX !== 0 || this.#shadowOffsetY !== 0 || this.#shadowBlur !== 0);
  }

  #drawShadowRect(x: number, y: number, width: number, height: number): void {
    if (!this.#hasVisibleShadow()) {
      return;
    }

    const path = new CanvasPath2D();
    path.rect(x, y, width, height);
    this.#drawShadowFill(path, this.fillRule);
  }

  #drawShadowFill(path: CanvasPath2D, fillRule: CanvasFillRule): void {
    if (!this.#hasVisibleShadow()) {
      return;
    }

    fillPolygons(
      this.getPixels(),
      this.canvas.width,
      this.canvas.height,
      offsetPolygons(pathToPolygons(path, this.#transform), this.#shadowOffsetX, this.#shadowOffsetY),
      this.#shadowPaint(),
      this.#globalCompositeOperation,
      fillRule
    );
  }

  #drawShadowStroke(path: CanvasPath2D): void {
    if (!this.#hasVisibleShadow()) {
      return;
    }

    strokePath(
      this.getPixels(),
      this.canvas.width,
      this.canvas.height,
      path,
      multiplyMatrices(this.#transform, [1, 0, 0, 1, this.#shadowOffsetX, this.#shadowOffsetY]),
      {
        paint: this.#shadowPaint(),
        operation: this.#globalCompositeOperation,
        lineWidth: this.#lineWidth,
        lineCap: this.#lineCap,
        lineJoin: this.#lineJoin,
        miterLimit: this.#miterLimit,
        lineDash: this.#lineDash,
        lineDashOffset: this.#lineDashOffset
      }
    );
  }
}

type Point = { readonly x: number; readonly y: number };

type StrokeOptions = {
  readonly paint: Paint;
  readonly operation: GlobalCompositeOperation;
  readonly lineWidth: number;
  readonly lineCap: CanvasLineCap;
  readonly lineJoin: CanvasLineJoin;
  readonly miterLimit: number;
  readonly lineDash: readonly number[];
  readonly lineDashOffset: number;
};

type StrokeSubpath = {
  readonly points: readonly Point[];
  readonly closed: boolean;
};

function pathToPolygons(path: CanvasPath2D, transform: Matrix2D): Point[][] {
  const polygons: Point[][] = [];
  let current: Point[] = [];
  let start: Point | undefined;
  let lastPoint: Point | undefined;

  const closeCurrent = () => {
    if (current.length >= 3) {
      polygons.push(current);
    }
    current = [];
    start = undefined;
    lastPoint = undefined;
  };

  for (const command of path.getCommands()) {
    if (command.type === "moveTo") {
      closeCurrent();
      const point = transformPoint(transform, command.x, command.y);
      current = [point];
      start = point;
      lastPoint = point;
      continue;
    }

    if (command.type === "lineTo") {
      const point = transformPoint(transform, command.x, command.y);
      if (!start) {
        start = point;
      }
      current.push(point);
      lastPoint = point;
      continue;
    }

    if (command.type === "bezierCurveTo") {
      const cp1 = transformPoint(transform, command.cp1x, command.cp1y);
      const cp2 = transformPoint(transform, command.cp2x, command.cp2y);
      const to = transformPoint(transform, command.x, command.y);
      const from = lastPoint ?? cp1;
      if (!start) {
        current = [from];
      }
      appendCubicBezier(current, from, cp1, cp2, to);
      start ??= from;
      lastPoint = to;
      continue;
    }

    if (command.type === "quadraticCurveTo") {
      const cp = transformPoint(transform, command.cpx, command.cpy);
      const to = transformPoint(transform, command.x, command.y);
      const from = lastPoint ?? cp;
      if (!start) {
        current = [from];
      }
      appendQuadraticBezier(current, from, cp, to);
      start ??= from;
      lastPoint = to;
      continue;
    }

    if (command.type === "ellipse") {
      const from = lastPoint ?? transformPoint(transform, 0, 0);
      const points = ellipsePoints(command).map((point) => transformPoint(transform, point.x, point.y));
      if (points.length === 0) {
        continue;
      }
      if (!start) {
        current = [points[0]];
        start = points[0];
      } else if (!samePoint(from, points[0])) {
        current.push(points[0]);
      }
      current.push(...points.slice(1));
      lastPoint = points[points.length - 1];
      continue;
    }

    if (command.type === "rect") {
      closeCurrent();
      const leftTop = transformPoint(transform, command.x, command.y);
      const rightTop = transformPoint(transform, command.x + command.width, command.y);
      const rightBottom = transformPoint(transform, command.x + command.width, command.y + command.height);
      const leftBottom = transformPoint(transform, command.x, command.y + command.height);
      polygons.push([leftTop, rightTop, rightBottom, leftBottom]);
      current = [leftTop];
      start = leftTop;
      lastPoint = leftTop;
      continue;
    }

    if (start) {
      if (current.length > 0 && !samePoint(current[current.length - 1], start)) {
        current.push(start);
      }
      lastPoint = start;
    }
  }

  closeCurrent();
  return polygons;
}

function pathToStrokeSubpaths(path: CanvasPath2D, transform: Matrix2D): StrokeSubpath[] {
  const subpaths: StrokeSubpath[] = [];
  let current: Point[] = [];
  let start: Point | undefined;
  let lastPoint: Point | undefined;

  const finishOpen = () => {
    if (current.length >= 2) {
      subpaths.push({ points: current, closed: false });
    }
    current = [];
    start = undefined;
    lastPoint = undefined;
  };

  const finishClosed = () => {
    if (current.length >= 2) {
      subpaths.push({ points: current, closed: true });
    }
    current = [];
    start = undefined;
    lastPoint = undefined;
  };

  for (const command of path.getCommands()) {
    if (command.type === "moveTo") {
      finishOpen();
      const point = transformPoint(transform, command.x, command.y);
      current = [point];
      start = point;
      lastPoint = point;
      continue;
    }

    if (command.type === "lineTo") {
      const point = transformPoint(transform, command.x, command.y);
      if (!start) {
        start = point;
        current = [point];
      } else {
        current.push(point);
      }
      lastPoint = point;
      continue;
    }

    if (command.type === "bezierCurveTo") {
      const cp1 = transformPoint(transform, command.cp1x, command.cp1y);
      const from = lastPoint ?? cp1;
      if (!start) {
        start = from;
        current = [from];
      }
      const cp2 = transformPoint(transform, command.cp2x, command.cp2y);
      const to = transformPoint(transform, command.x, command.y);
      appendCubicBezier(current, from, cp1, cp2, to);
      lastPoint = to;
      continue;
    }

    if (command.type === "quadraticCurveTo") {
      const cp = transformPoint(transform, command.cpx, command.cpy);
      const from = lastPoint ?? cp;
      if (!start) {
        start = from;
        current = [from];
      }
      const to = transformPoint(transform, command.x, command.y);
      appendQuadraticBezier(current, from, cp, to);
      lastPoint = to;
      continue;
    }

    if (command.type === "ellipse") {
      const from = lastPoint ?? transformPoint(transform, 0, 0);
      const points = ellipsePoints(command).map((point) => transformPoint(transform, point.x, point.y));
      if (points.length === 0) {
        continue;
      }
      if (!start) {
        start = points[0];
        current = [points[0]];
      } else if (!samePoint(from, points[0])) {
        current.push(points[0]);
      }
      current.push(...points.slice(1));
      lastPoint = points[points.length - 1];
      continue;
    }

    if (command.type === "rect") {
      finishOpen();
      const leftTop = transformPoint(transform, command.x, command.y);
      const rightTop = transformPoint(transform, command.x + command.width, command.y);
      const rightBottom = transformPoint(transform, command.x + command.width, command.y + command.height);
      const leftBottom = transformPoint(transform, command.x, command.y + command.height);
      subpaths.push({ points: [leftTop, rightTop, rightBottom, leftBottom], closed: true });
      current = [leftTop];
      start = leftTop;
      lastPoint = leftTop;
      continue;
    }

    if (start) {
      const closedStart = start;
      finishClosed();
      current = [closedStart];
      start = closedStart;
      lastPoint = closedStart;
    } else {
      finishOpen();
    }
  }

  finishOpen();
  return subpaths;
}

function strokePath(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  path: CanvasPath2D,
  transform: Matrix2D,
  options: StrokeOptions
): void {
  if (options.lineWidth <= 0) {
    return;
  }

  const radius = options.lineWidth / 2;

  for (const subpath of pathToStrokeSubpaths(path, transform)) {
    strokeSubpath(pixels, width, height, subpath, options, radius);
  }
}

function isPointInStrokePath(
  point: Point,
  path: CanvasPath2D,
  transform: Matrix2D,
  options: {
    readonly lineWidth: number;
    readonly lineCap: CanvasLineCap;
    readonly lineJoin: CanvasLineJoin;
    readonly lineDash: readonly number[];
    readonly lineDashOffset: number;
  }
): boolean {
  if (options.lineWidth <= 0) {
    return false;
  }

  const radius = options.lineWidth / 2;

  for (const subpath of pathToStrokeSubpaths(path, transform)) {
    const segments = strokeSegments(subpath);
    const dash = normalizedDash(options.lineDash);
    const dashTotal = dash.reduce((total, segment) => total + segment, 0);
    const cumulativeLengths: number[] = [];
    let pathLength = 0;

    for (const segment of segments) {
      cumulativeLengths.push(pathLength);
      pathLength += segment.length;
    }

    for (let index = 0; index < segments.length; index += 1) {
      const segment = segments[index];
      if (segment.length === 0) {
        continue;
      }

      const distance = distanceToStrokedSegment(
        point,
        segment,
        radius,
        subpath.closed,
        index === 0,
        index === segments.length - 1,
        options.lineCap
      );

      if (distance > radius) {
        continue;
      }

      const t = segmentProjection(point, segment);
      const clampedT = clamp(t, 0, 1);
      const distanceAlongPath = cumulativeLengths[index] + clampedT * segment.length;

      if (dashTotal === 0 || isDashVisible(distanceAlongPath, dash, dashTotal, options.lineDashOffset)) {
        return true;
      }
    }

    if (
      options.lineJoin === "round" &&
      hitsRoundJoin(point, subpath, radius, dash, dashTotal, options.lineDashOffset, pathLength)
    ) {
      return true;
    }
  }

  return false;
}

function strokeSubpath(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  subpath: StrokeSubpath,
  options: StrokeOptions,
  radius: number
): void {
  const segments = strokeSegments(subpath);
  if (segments.length === 0) {
    return;
  }

  const xs = subpath.points.map((point) => point.x);
  const ys = subpath.points.map((point) => point.y);
  const capExtension = subpath.closed || options.lineCap === "butt" ? 0 : radius;
  const left = clamp(Math.floor(Math.min(...xs) - radius - capExtension), 0, width);
  const right = clamp(Math.ceil(Math.max(...xs) + radius + capExtension), 0, width);
  const top = clamp(Math.floor(Math.min(...ys) - radius - capExtension), 0, height);
  const bottom = clamp(Math.ceil(Math.max(...ys) + radius + capExtension), 0, height);
  const dash = normalizedDash(options.lineDash);
  const dashTotal = dash.reduce((total, segment) => total + segment, 0);
  const cumulativeLengths: number[] = [];
  let pathLength = 0;

  for (const segment of segments) {
    cumulativeLengths.push(pathLength);
    pathLength += segment.length;
  }

  for (let y = top; y < bottom; y += 1) {
    for (let x = left; x < right; x += 1) {
      const point = { x: x + 0.5, y: y + 0.5 };
      let hit = false;

      for (let index = 0; index < segments.length; index += 1) {
        const segment = segments[index];
        if (segment.length === 0) {
          continue;
        }

        const distance = distanceToStrokedSegment(
          point,
          segment,
          radius,
          subpath.closed,
          index === 0,
          index === segments.length - 1,
          options.lineCap
        );

        if (distance > radius) {
          continue;
        }

        const t = segmentProjection(point, segment);
        const clampedT = clamp(t, 0, 1);
        const distanceAlongPath = cumulativeLengths[index] + clampedT * segment.length;

        if (dashTotal > 0 && !isDashVisible(distanceAlongPath, dash, dashTotal, options.lineDashOffset)) {
          continue;
        }

        hit = true;
        break;
      }

      if (!hit && options.lineJoin === "round") {
        hit = hitsRoundJoin(point, subpath, radius, dash, dashTotal, options.lineDashOffset, pathLength);
      }

      if (hit) {
        const color = options.paint.sample(x + 0.5, y + 0.5);
        if (color[3] !== 0) {
          compositePixel(pixels, (y * width + x) * 4, color, options.operation);
        }
      }
    }
  }
}

function strokeSegments(subpath: StrokeSubpath): Array<{ readonly start: Point; readonly end: Point; readonly length: number }> {
  const segments: Array<{ readonly start: Point; readonly end: Point; readonly length: number }> = [];

  for (let index = 1; index < subpath.points.length; index += 1) {
    const start = subpath.points[index - 1];
    const end = subpath.points[index];
    segments.push({ start, end, length: pointDistance(start, end) });
  }

  if (subpath.closed) {
    const start = subpath.points[subpath.points.length - 1];
    const end = subpath.points[0];
    segments.push({ start, end, length: pointDistance(start, end) });
  }

  return segments;
}

function distanceToStrokedSegment(
  point: Point,
  segment: { readonly start: Point; readonly end: Point; readonly length: number },
  radius: number,
  closed: boolean,
  first: boolean,
  last: boolean,
  lineCap: CanvasLineCap
): number {
  const rawT = segmentProjection(point, segment);
  const firstExtension = !closed && first ? capExtension(lineCap, radius, segment.length) : 0;
  const lastExtension = !closed && last ? capExtension(lineCap, radius, segment.length) : 0;
  const start = -firstExtension;
  const end = 1 + lastExtension;

  if ((closed || lineCap !== "round") && (rawT < start || rawT > end)) {
    return Number.POSITIVE_INFINITY;
  }

  const t = clamp(rawT, start, end);

  const closest = {
    x: segment.start.x + (segment.end.x - segment.start.x) * t,
    y: segment.start.y + (segment.end.y - segment.start.y) * t
  };
  return pointDistance(point, closest);
}

function capExtension(lineCap: CanvasLineCap, radius: number, length: number): number {
  return lineCap === "square" ? radius / length : 0;
}

function segmentProjection(
  point: Point,
  segment: { readonly start: Point; readonly end: Point; readonly length: number }
): number {
  const dx = segment.end.x - segment.start.x;
  const dy = segment.end.y - segment.start.y;
  return ((point.x - segment.start.x) * dx + (point.y - segment.start.y) * dy) / (segment.length * segment.length);
}

function hitsRoundJoin(
  point: Point,
  subpath: StrokeSubpath,
  radius: number,
  dash: readonly number[],
  dashTotal: number,
  lineDashOffset: number,
  pathLength: number
): boolean {
  for (let index = 0; index < subpath.points.length; index += 1) {
    const isEndpoint = !subpath.closed && (index === 0 || index === subpath.points.length - 1);
    if (isEndpoint) {
      continue;
    }

    if (pointDistance(point, subpath.points[index]) > radius) {
      continue;
    }

    if (dashTotal === 0 || isDashVisible((pathLength * index) / subpath.points.length, dash, dashTotal, lineDashOffset)) {
      return true;
    }
  }

  return false;
}

function normalizedDash(dash: readonly number[]): readonly number[] {
  return dash.length > 0 && dash.some((segment) => segment > 0) ? dash : [];
}

function isDashVisible(distance: number, dash: readonly number[], dashTotal: number, lineDashOffset: number): boolean {
  let position = positiveModulo(distance + lineDashOffset, dashTotal);

  for (let index = 0; index < dash.length; index += 1) {
    if (position < dash[index]) {
      return index % 2 === 0;
    }
    position -= dash[index];
  }

  return true;
}

function pointDistance(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function positiveModulo(value: number, divisor: number): number {
  return ((value % divisor) + divisor) % divisor;
}

function measureFallbackTextWidth(text: string, fontSize: number, letterSpacing: string, wordSpacing: string): number {
  const clusters = Array.from(text);
  const baseWidth = clusters.length * fontSize * 0.6;
  const letterSpacingPixels = cssLengthToPixels(letterSpacing, fontSize);
  const wordSpacingPixels = cssLengthToPixels(wordSpacing, fontSize);
  const letterSpacingWidth = Math.max(0, clusters.length - 1) * letterSpacingPixels;
  const wordSpacingWidth = clusters.filter((cluster) => /\s/.test(cluster)).length * wordSpacingPixels;
  return baseWidth + letterSpacingWidth + wordSpacingWidth;
}

function parseFontMetrics(font: string): { readonly size: number } {
  const match = /(?:^|\s)(\d*\.?\d+)(px|pt|em|rem|%)\b/.exec(font);

  if (!match) {
    return { size: 10 };
  }

  const value = Number(match[1]);
  const unit = match[2];

  if (!Number.isFinite(value) || value <= 0) {
    return { size: 10 };
  }

  if (unit === "pt") {
    return { size: (value * 4) / 3 };
  }

  if (unit === "em" || unit === "rem") {
    return { size: value * 16 };
  }

  if (unit === "%") {
    return { size: (value / 100) * 16 };
  }

  return { size: value };
}

function resolveTextX(x: number, width: number, align: CanvasTextAlign): number {
  if (align === "center") {
    return x - width / 2;
  }

  if (align === "right" || align === "end") {
    return x - width;
  }

  return x;
}

function resolveTextY(y: number, height: number, baseline: CanvasTextBaseline): number {
  if (baseline === "top" || baseline === "hanging") {
    return y;
  }

  if (baseline === "middle") {
    return y - height / 2;
  }

  if (baseline === "bottom" || baseline === "ideographic") {
    return y - height;
  }

  return y - height * 0.8;
}

function appendCubicBezier(target: Point[], from: Point, cp1: Point, cp2: Point, to: Point): void {
  for (let step = 1; step <= 12; step += 1) {
    const t = step / 12;
    const inverse = 1 - t;
    target.push({
      x:
        inverse * inverse * inverse * from.x +
        3 * inverse * inverse * t * cp1.x +
        3 * inverse * t * t * cp2.x +
        t * t * t * to.x,
      y:
        inverse * inverse * inverse * from.y +
        3 * inverse * inverse * t * cp1.y +
        3 * inverse * t * t * cp2.y +
        t * t * t * to.y
    });
  }
}

function appendQuadraticBezier(target: Point[], from: Point, cp: Point, to: Point): void {
  for (let step = 1; step <= 12; step += 1) {
    const t = step / 12;
    const inverse = 1 - t;
    target.push({
      x: inverse * inverse * from.x + 2 * inverse * t * cp.x + t * t * to.x,
      y: inverse * inverse * from.y + 2 * inverse * t * cp.y + t * t * to.y
    });
  }
}

function fillPolygons(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  polygons: readonly Point[][],
  paint: Paint,
  operation: GlobalCompositeOperation,
  fillRule: CanvasFillRule
): void {
  if (polygons.length === 0) {
    return;
  }

  const xs = polygons.flatMap((polygon) => polygon.map((point) => point.x));
  const ys = polygons.flatMap((polygon) => polygon.map((point) => point.y));
  const left = clamp(Math.floor(Math.min(...xs)), 0, width);
  const right = clamp(Math.ceil(Math.max(...xs)), 0, width);
  const top = clamp(Math.floor(Math.min(...ys)), 0, height);
  const bottom = clamp(Math.ceil(Math.max(...ys)), 0, height);

  for (let y = top; y < bottom; y += 1) {
    for (let x = left; x < right; x += 1) {
      const pointX = x + 0.5;
      const pointY = y + 0.5;
      const hit = isPointInPolygons(pointX, pointY, polygons, fillRule);

      if (hit) {
        const color = paint.sample(x + 0.5, y + 0.5);
        if (color[3] !== 0) {
          compositePixel(pixels, (y * width + x) * 4, color, operation);
        }
      }
    }
  }
}

function rasterizeClipMask(
  width: number,
  height: number,
  polygons: readonly Point[][],
  fillRule: CanvasFillRule,
  previousMask?: Uint8Array
): Uint8Array {
  const mask = new Uint8Array(width * height);

  if (polygons.length === 0) {
    return mask;
  }

  const xs = polygons.flatMap((polygon) => polygon.map((point) => point.x));
  const ys = polygons.flatMap((polygon) => polygon.map((point) => point.y));
  const left = clamp(Math.floor(Math.min(...xs)), 0, width);
  const right = clamp(Math.ceil(Math.max(...xs)), 0, width);
  const top = clamp(Math.floor(Math.min(...ys)), 0, height);
  const bottom = clamp(Math.ceil(Math.max(...ys)), 0, height);

  for (let y = top; y < bottom; y += 1) {
    for (let x = left; x < right; x += 1) {
      const offset = y * width + x;

      if (previousMask && previousMask[offset] !== 1) {
        continue;
      }

      if (isPointInPolygons(x + 0.5, y + 0.5, polygons, fillRule)) {
        mask[offset] = 1;
      }
    }
  }

  return mask;
}

function isPointInPolygons(x: number, y: number, polygons: readonly Point[][], fillRule: CanvasFillRule): boolean {
  if (polygons.length === 0) {
    return false;
  }

  if (polygons.some((polygon) => isPointOnPolygonEdge(x, y, polygon))) {
    return true;
  }

  const winding = polygons.reduce((total, polygon) => total + windingNumber(x, y, polygon), 0);
  return fillRule === "evenodd" ? Math.abs(winding) % 2 === 1 : winding !== 0;
}

function fillPolygon(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  polygon: readonly Point[],
  color: Rgba,
  operation: GlobalCompositeOperation
): void {
  const xs = polygon.map((point) => point.x);
  const ys = polygon.map((point) => point.y);
  const left = clamp(Math.floor(Math.min(...xs)), 0, width);
  const right = clamp(Math.ceil(Math.max(...xs)), 0, width);
  const top = clamp(Math.floor(Math.min(...ys)), 0, height);
  const bottom = clamp(Math.ceil(Math.max(...ys)), 0, height);

  for (let y = top; y < bottom; y += 1) {
    for (let x = left; x < right; x += 1) {
      if (!isPointInPolygon(x + 0.5, y + 0.5, polygon)) {
        continue;
      }

      const offset = (y * width + x) * 4;
      compositePixel(pixels, offset, color, operation);
    }
  }
}

function clearPolygon(pixels: Uint8ClampedArray, width: number, height: number, polygon: readonly Point[]): void {
  const xs = polygon.map((point) => point.x);
  const ys = polygon.map((point) => point.y);
  const left = clamp(Math.floor(Math.min(...xs)), 0, width);
  const right = clamp(Math.ceil(Math.max(...xs)), 0, width);
  const top = clamp(Math.floor(Math.min(...ys)), 0, height);
  const bottom = clamp(Math.ceil(Math.max(...ys)), 0, height);

  for (let y = top; y < bottom; y += 1) {
    for (let x = left; x < right; x += 1) {
      if (!isPointInPolygon(x + 0.5, y + 0.5, polygon)) {
        continue;
      }

      const offset = (y * width + x) * 4;
      pixels[offset] = 0;
      pixels[offset + 1] = 0;
      pixels[offset + 2] = 0;
      pixels[offset + 3] = 0;
    }
  }
}

function compositePixel(
  pixels: Uint8ClampedArray,
  offset: number,
  source: Rgba,
  operation: GlobalCompositeOperation
): void {
  const sourceAlpha = source[3] / 255;
  const destinationAlpha = pixels[offset + 3] / 255;
  const sourceRed = (source[0] / 255) * sourceAlpha;
  const sourceGreen = (source[1] / 255) * sourceAlpha;
  const sourceBlue = (source[2] / 255) * sourceAlpha;
  const destinationRed = (pixels[offset] / 255) * destinationAlpha;
  const destinationGreen = (pixels[offset + 1] / 255) * destinationAlpha;
  const destinationBlue = (pixels[offset + 2] / 255) * destinationAlpha;
  let sourceFactor = 1;
  let destinationFactor = 1 - sourceAlpha;

  switch (operation) {
    case "clear":
      writePremultipliedPixel(pixels, offset, 0, 0, 0, 0);
      return;
    case "copy":
      destinationFactor = 0;
      break;
    case "source-in":
      sourceFactor = destinationAlpha;
      destinationFactor = 0;
      break;
    case "source-out":
      sourceFactor = 1 - destinationAlpha;
      destinationFactor = 0;
      break;
    case "source-atop":
      sourceFactor = destinationAlpha;
      destinationFactor = 1 - sourceAlpha;
      break;
    case "destination-over":
      sourceFactor = 1 - destinationAlpha;
      destinationFactor = 1;
      break;
    case "destination-in":
      sourceFactor = 0;
      destinationFactor = sourceAlpha;
      break;
    case "destination-out":
      sourceFactor = 0;
      destinationFactor = 1 - sourceAlpha;
      break;
    case "destination-atop":
      sourceFactor = 1 - destinationAlpha;
      destinationFactor = sourceAlpha;
      break;
    case "lighter":
      writePremultipliedPixel(
        pixels,
        offset,
        clamp(sourceRed + destinationRed, 0, 1),
        clamp(sourceGreen + destinationGreen, 0, 1),
        clamp(sourceBlue + destinationBlue, 0, 1),
        clamp(sourceAlpha + destinationAlpha, 0, 1)
      );
      return;
    case "xor":
      sourceFactor = 1 - destinationAlpha;
      destinationFactor = 1 - sourceAlpha;
      break;
    case "multiply":
    case "screen":
    case "overlay":
    case "darken":
    case "lighten":
    case "color-dodge":
    case "color-burn":
    case "hard-light":
    case "soft-light":
    case "difference":
    case "exclusion":
    case "hue":
    case "saturation":
    case "color":
    case "luminosity":
      // Advanced blend modes are accepted by the API; rendering currently falls back to source-over.
      break;
  }

  writePremultipliedPixel(
    pixels,
    offset,
    sourceRed * sourceFactor + destinationRed * destinationFactor,
    sourceGreen * sourceFactor + destinationGreen * destinationFactor,
    sourceBlue * sourceFactor + destinationBlue * destinationFactor,
    sourceAlpha * sourceFactor + destinationAlpha * destinationFactor
  );
}

function writePremultipliedPixel(
  pixels: Uint8ClampedArray,
  offset: number,
  premultipliedRed: number,
  premultipliedGreen: number,
  premultipliedBlue: number,
  alpha: number
): void {
  const clampedAlpha = clamp(alpha, 0, 1);

  if (clampedAlpha === 0) {
    pixels[offset] = 0;
    pixels[offset + 1] = 0;
    pixels[offset + 2] = 0;
    pixels[offset + 3] = 0;
    return;
  }

  pixels[offset] = Math.round((clamp(premultipliedRed, 0, clampedAlpha) / clampedAlpha) * 255);
  pixels[offset + 1] = Math.round((clamp(premultipliedGreen, 0, clampedAlpha) / clampedAlpha) * 255);
  pixels[offset + 2] = Math.round((clamp(premultipliedBlue, 0, clampedAlpha) / clampedAlpha) * 255);
  pixels[offset + 3] = Math.round(clampedAlpha * 255);
}

function isPointInPolygon(x: number, y: number, polygon: readonly Point[]): boolean {
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i, i += 1) {
    const current = polygon[i];
    const previous = polygon[j];
    const intersects =
      current.y > y !== previous.y > y &&
      x < ((previous.x - current.x) * (y - current.y)) / (previous.y - current.y) + current.x;

    if (intersects) {
      inside = !inside;
    }
  }

  return inside;
}

function isPointOnPolygonEdge(x: number, y: number, polygon: readonly Point[]): boolean {
  const epsilon = 1e-9;

  for (let index = 0, previousIndex = polygon.length - 1; index < polygon.length; previousIndex = index, index += 1) {
    const start = polygon[previousIndex];
    const end = polygon[index];
    const segmentLength = pointDistance(start, end);

    if (segmentLength === 0) {
      continue;
    }

    const projection =
      ((x - start.x) * (end.x - start.x) + (y - start.y) * (end.y - start.y)) /
      (segmentLength * segmentLength);

    if (projection < -epsilon || projection > 1 + epsilon) {
      continue;
    }

    const closest = {
      x: start.x + (end.x - start.x) * clamp(projection, 0, 1),
      y: start.y + (end.y - start.y) * clamp(projection, 0, 1)
    };

    if (pointDistance({ x, y }, closest) <= epsilon) {
      return true;
    }
  }

  return false;
}

function windingNumber(x: number, y: number, polygon: readonly Point[]): number {
  let winding = 0;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i, i += 1) {
    const current = polygon[i];
    const previous = polygon[j];

    if (previous.y <= y) {
      if (current.y > y && crossProduct(previous, current, { x, y }) > 0) {
        winding += 1;
      }
    } else if (current.y <= y && crossProduct(previous, current, { x, y }) < 0) {
      winding -= 1;
    }
  }

  return winding;
}

function ellipsePoints(command: Extract<PathCommand, { readonly type: "ellipse" }>): Point[] {
  if (command.radiusX === 0 || command.radiusY === 0) {
    return [ellipsePoint(command, command.startAngle)];
  }

  const sweep = normalizeArcSweep(command.startAngle, command.endAngle, command.counterclockwise);
  if (sweep === 0) {
    return [];
  }

  const steps = Math.max(6, Math.ceil((Math.abs(sweep) / (Math.PI * 2)) * 48));
  const points: Point[] = [];

  for (let step = 0; step <= steps; step += 1) {
    points.push(ellipsePoint(command, command.startAngle + (sweep * step) / steps));
  }

  return points;
}

function ellipsePoint(command: Extract<PathCommand, { readonly type: "ellipse" }>, angle: number): Point {
  const cosRotation = Math.cos(command.rotation);
  const sinRotation = Math.sin(command.rotation);
  const x = command.radiusX * Math.cos(angle);
  const y = command.radiusY * Math.sin(angle);

  return {
    x: command.x + x * cosRotation - y * sinRotation,
    y: command.y + x * sinRotation + y * cosRotation
  };
}

function normalizeArcSweep(startAngle: number, endAngle: number, counterclockwise: boolean): number {
  const fullCircle = Math.PI * 2;
  let sweep = endAngle - startAngle;

  if (!counterclockwise) {
    if (Math.abs(sweep) >= fullCircle) {
      return fullCircle;
    }

    return positiveModulo(sweep, fullCircle);
  }

  if (Math.abs(sweep) >= fullCircle) {
    return -fullCircle;
  }

  sweep = positiveModulo(sweep, fullCircle);
  if (sweep !== 0) {
    sweep -= fullCircle;
  }

  return sweep;
}

function currentPathPoint(commands: readonly PathCommand[]): Point | undefined {
  let start: Point | undefined;
  let current: Point | undefined;

  for (const command of commands) {
    if (command.type === "moveTo") {
      current = { x: command.x, y: command.y };
      start = current;
      continue;
    }

    if (command.type === "lineTo") {
      current = { x: command.x, y: command.y };
      start ??= current;
      continue;
    }

    if (command.type === "quadraticCurveTo") {
      current = { x: command.x, y: command.y };
      start ??= { x: command.cpx, y: command.cpy };
      continue;
    }

    if (command.type === "bezierCurveTo") {
      current = { x: command.x, y: command.y };
      start ??= { x: command.cp1x, y: command.cp1y };
      continue;
    }

    if (command.type === "ellipse") {
      const points = ellipsePoints(command);
      if (points.length > 0) {
        current = points[points.length - 1];
        start ??= points[0];
      }
      continue;
    }

    if (command.type === "rect") {
      current = { x: command.x, y: command.y };
      start = current;
      continue;
    }

    if (start) {
      current = start;
    }
  }

  return current;
}

function arcToSegments(
  p0: Point,
  p1: Point,
  p2: Point,
  radius: number
):
  | {
      readonly start: Point;
      readonly center: Point;
      readonly startAngle: number;
      readonly endAngle: number;
      readonly counterclockwise: boolean;
    }
  | undefined {
  const v0 = normalizeVector({ x: p0.x - p1.x, y: p0.y - p1.y });
  const v1 = normalizeVector({ x: p2.x - p1.x, y: p2.y - p1.y });

  if (!v0 || !v1 || radius === 0 || Math.abs(cross(v0, v1)) < 1e-12) {
    return undefined;
  }

  const angle = Math.acos(clamp(dot(v0, v1), -1, 1));
  const tangentLength = radius / Math.tan(angle / 2);
  const start = { x: p1.x + v0.x * tangentLength, y: p1.y + v0.y * tangentLength };
  const end = { x: p1.x + v1.x * tangentLength, y: p1.y + v1.y * tangentLength };
  const bisector = normalizeVector({ x: v0.x + v1.x, y: v0.y + v1.y });

  if (!bisector) {
    return undefined;
  }

  const centerDistance = radius / Math.sin(angle / 2);
  const center = { x: p1.x + bisector.x * centerDistance, y: p1.y + bisector.y * centerDistance };

  return {
    start,
    center,
    startAngle: Math.atan2(start.y - center.y, start.x - center.x),
    endAngle: Math.atan2(end.y - center.y, end.x - center.x),
    counterclockwise: cross(v0, v1) < 0
  };
}

function normalizeRoundRectRadii(radii: number | DOMPointInit | Array<number | DOMPointInit>): [Point, Point, Point, Point] | undefined {
  const values = Array.isArray(radii) ? radii : [radii];

  if (values.length < 1 || values.length > 4) {
    throw createRangeError("The radii list must contain one, two, three, or four radii.");
  }

  const points = values.map(roundRectRadiusPoint);
  if (points.some((point) => point === undefined)) {
    return undefined;
  }

  const [topLeft, topRight = topLeft, bottomRight = topLeft, bottomLeft = topRight] =
    points.length === 3 ? [points[0], points[1], points[2], points[1]] : points;

  return [topLeft, topRight, bottomRight, bottomLeft] as [Point, Point, Point, Point];
}

function roundRectRadiusPoint(value: number | DOMPointInit | undefined): Point | undefined {
  if (typeof value === "bigint") {
    throw new TypeError("The radius value cannot be a BigInt.");
  }

  if (value !== undefined && value !== null && typeof value !== "number") {
    const point = value as DOMPointInit & { readonly x?: unknown; readonly y?: unknown };
    if (typeof point.x === "bigint" || typeof point.y === "bigint") {
      throw new TypeError("The radius value cannot be a BigInt.");
    }
  }

  const point =
    typeof value === "number"
      ? { x: value, y: value }
      : value === undefined || value === null
        ? { x: 0, y: 0 }
        : { x: Number(value.x ?? 0), y: Number(value.y ?? 0) };

  if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) {
    return undefined;
  }

  if (point.x < 0 || point.y < 0) {
    throw createRangeError("The radius provided is negative.");
  }

  return point;
}

function appendRoundRectCorner(
  path: CanvasPath2D,
  x: number,
  y: number,
  radius: Point,
  startAngle: number,
  endAngle: number
): void {
  if (radius.x === 0 || radius.y === 0) {
    path.lineTo(ellipsePoint({ type: "ellipse", x, y, radiusX: radius.x, radiusY: radius.y, rotation: 0, startAngle, endAngle, counterclockwise: false }, endAngle).x, ellipsePoint({ type: "ellipse", x, y, radiusX: radius.x, radiusY: radius.y, rotation: 0, startAngle, endAngle, counterclockwise: false }, endAngle).y);
    return;
  }

  path.ellipse(x, y, radius.x, radius.y, 0, startAngle, endAngle, false);
}

function normalizeVector(vector: Point): Point | undefined {
  const length = Math.hypot(vector.x, vector.y);
  return length === 0 ? undefined : { x: vector.x / length, y: vector.y / length };
}

function cross(a: Point, b: Point): number {
  return a.x * b.y - a.y * b.x;
}

function crossProduct(a: Point, b: Point, c: Point): number {
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

function dot(a: Point, b: Point): number {
  return a.x * b.x + a.y * b.y;
}

function samePoint(a: Point, b: Point): boolean {
  return Math.abs(a.x - b.x) < 1e-9 && Math.abs(a.y - b.y) < 1e-9;
}

function assertNonNegativeInteger(value: number, label: string): void {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error(`${label} must be a non-negative integer`);
  }
}

function assertPositiveInteger(value: number, label: string): void {
  if (!Number.isInteger(value) || value <= 0) {
    throw createIndexSizeError(`${label} must be a positive integer`);
  }
}

function toImageDataDimension(value: unknown, label: string): number {
  const number = Number(value);

  if (!Number.isFinite(number) || !Number.isInteger(number) || number <= 0) {
    throw createIndexSizeError(`${label} must be a positive integer`);
  }

  return number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function isIdentityMatrix(matrix: Matrix2D): boolean {
  return matrix.every((value, index) => value === IDENTITY_MATRIX[index]);
}

function multiplyMatrices(left: Matrix2D, right: Matrix2D): Matrix2D {
  return [
    left[0] * right[0] + left[2] * right[1],
    left[1] * right[0] + left[3] * right[1],
    left[0] * right[2] + left[2] * right[3],
    left[1] * right[2] + left[3] * right[3],
    left[0] * right[4] + left[2] * right[5] + left[4],
    left[1] * right[4] + left[3] * right[5] + left[5]
  ];
}

function transformPoint(matrix: Matrix2D, x: number, y: number): Point {
  return {
    x: matrix[0] * x + matrix[2] * y + matrix[4],
    y: matrix[1] * x + matrix[3] * y + matrix[5]
  };
}

function transformVector(matrix: Matrix2D, x: number, y: number): Point {
  return {
    x: matrix[0] * x + matrix[2] * y,
    y: matrix[1] * x + matrix[3] * y
  };
}

function inverseTransformPoint(matrix: Matrix2D, x: number, y: number): Point | undefined {
  const inverse = new CanvasTransformMatrix(matrix).invertSelf();

  if (![inverse.a, inverse.b, inverse.c, inverse.d, inverse.e, inverse.f].every(Number.isFinite)) {
    return undefined;
  }

  return transformPoint(matrixFromObject(inverse), x, y);
}

function matrixFromObject(matrix: CanvasTransformMatrix | Matrix2D): Matrix2D {
  if (matrix instanceof CanvasTransformMatrix) {
    return [matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f];
  }

  return matrix;
}

function isCanvasLineCap(value: unknown): value is CanvasLineCap {
  return typeof value === "string" && CANVAS_LINE_CAPS.has(value);
}

function isCanvasLineJoin(value: unknown): value is CanvasLineJoin {
  return typeof value === "string" && CANVAS_LINE_JOINS.has(value);
}

function isCanvasTextAlign(value: unknown): value is CanvasTextAlign {
  return typeof value === "string" && CANVAS_TEXT_ALIGNS.has(value);
}

function isCanvasTextBaseline(value: unknown): value is CanvasTextBaseline {
  return typeof value === "string" && CANVAS_TEXT_BASELINES.has(value);
}

function isCanvasDirection(value: unknown): value is CanvasDirection {
  return typeof value === "string" && CANVAS_DIRECTIONS.has(value);
}

function isCanvasFontKerning(value: unknown): value is CanvasFontKerning {
  return typeof value === "string" && CANVAS_FONT_KERNINGS.has(value);
}

function isCanvasFontStretch(value: unknown): value is CanvasFontStretch {
  return typeof value === "string" && CANVAS_FONT_STRETCHES.has(value);
}

function isCanvasFontVariantCaps(value: unknown): value is CanvasFontVariantCaps {
  return typeof value === "string" && CANVAS_FONT_VARIANT_CAPS.has(value);
}

function isCanvasTextRendering(value: unknown): value is CanvasTextRendering {
  return typeof value === "string" && CANVAS_TEXT_RENDERINGS.has(value);
}

function isCanvasImageSmoothingQuality(value: unknown): value is CanvasImageSmoothingQuality {
  return typeof value === "string" && CANVAS_IMAGE_SMOOTHING_QUALITIES.has(value);
}

function normalizeCanvasFillRule(value: unknown): CanvasFillRule {
  if (value === undefined || value === "nonzero") {
    return "nonzero";
  }

  if (value === "evenodd") {
    return "evenodd";
  }

  throw new TypeError("The fill rule must be either \"nonzero\" or \"evenodd\".");
}

function parseCanvasPaintStyle(
  value: string | CanvasGradient | CanvasPattern
): { readonly style: string | CanvasGradient | CanvasPattern; readonly paint: CanvasPaintStyle } | undefined {
  if (value instanceof CanvasGradient) {
    return { style: value, paint: { type: "gradient", gradient: value } };
  }

  if (value instanceof CanvasPattern) {
    return { style: value, paint: { type: "pattern", pattern: value } };
  }

  const color = parseCssColorObject(value) ?? parseColor(String(value));
  if (!color) {
    return undefined;
  }

  return { style: color.serialized, paint: { type: "color", rgba: color.rgba } };
}

function sampleCanvasPaintStyle(style: CanvasPaintStyle, x: number, y: number): Rgba {
  if (style.type === "gradient") {
    return style.gradient.sample(x, y);
  }

  if (style.type === "pattern") {
    return style.pattern.sample(x, y);
  }

  return style.rgba;
}

function sampleGradientStops(stops: readonly CanvasGradientStop[], offset: number): Rgba {
  if (offset <= stops[0].offset) {
    return stops[0].rgba;
  }

  const last = stops[stops.length - 1];
  if (offset >= last.offset) {
    return last.rgba;
  }

  for (let index = 1; index < stops.length; index += 1) {
    const left = stops[index - 1];
    const right = stops[index];

    if (offset > right.offset) {
      continue;
    }

    if (left.offset === right.offset) {
      return right.rgba;
    }

    const ratio = (offset - left.offset) / (right.offset - left.offset);
    return [
      Math.round(left.rgba[0] + (right.rgba[0] - left.rgba[0]) * ratio),
      Math.round(left.rgba[1] + (right.rgba[1] - left.rgba[1]) * ratio),
      Math.round(left.rgba[2] + (right.rgba[2] - left.rgba[2]) * ratio),
      Math.round(left.rgba[3] + (right.rgba[3] - left.rgba[3]) * ratio)
    ];
  }

  return last.rgba;
}

function patternCoordinate(value: number, size: number, repeats: boolean): number | undefined {
  if (size <= 0) {
    return undefined;
  }

  if (repeats) {
    return positiveModulo(value, size);
  }

  return value >= 0 && value < size ? value : undefined;
}

function normalizePatternRepetition(repetition: string | null): CanvasPatternRepetition | undefined {
  const normalized = repetition === null || repetition === "" ? "repeat" : String(repetition);

  if (normalized === "repeat" || normalized === "repeat-x" || normalized === "repeat-y" || normalized === "no-repeat") {
    return normalized;
  }

  return undefined;
}

function normalizeDrawImageArguments(sourceCanvas: Canvas, args: readonly number[]): DrawImageGeometry | undefined {
  const numbers = Array.from(args, Number);

  if (numbers.length === 2) {
    const [dx, dy] = numbers;
    return {
      sourceCanvas,
      sourceX: 0,
      sourceY: 0,
      sourceWidth: sourceCanvas.width,
      sourceHeight: sourceCanvas.height,
      destX: dx,
      destY: dy,
      destWidth: sourceCanvas.width,
      destHeight: sourceCanvas.height
    };
  }

  if (numbers.length === 4) {
    const [dx, dy, destWidth, destHeight] = numbers;
    return {
      sourceCanvas,
      sourceX: 0,
      sourceY: 0,
      sourceWidth: sourceCanvas.width,
      sourceHeight: sourceCanvas.height,
      destX: dx,
      destY: dy,
      destWidth,
      destHeight
    };
  }

  if (numbers.length === 8) {
    const [sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight] = numbers;
    return {
      sourceCanvas,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      destX,
      destY,
      destWidth,
      destHeight
    };
  }

  return undefined;
}

function normalizeRect(x: number, y: number, width: number, height: number): NormalizedRect {
  return {
    left: width < 0 ? x + width : x,
    top: height < 0 ? y + height : y,
    width: Math.abs(width),
    height: Math.abs(height)
  };
}

function clipSourceRect(rect: NormalizedRect, sourceWidth: number, sourceHeight: number): NormalizedRect | undefined {
  const left = clamp(rect.left, 0, sourceWidth);
  const top = clamp(rect.top, 0, sourceHeight);
  const right = clamp(rect.left + rect.width, 0, sourceWidth);
  const bottom = clamp(rect.top + rect.height, 0, sourceHeight);

  if (right <= left || bottom <= top) {
    return undefined;
  }

  return {
    left,
    top,
    width: right - left,
    height: bottom - top
  };
}

function transformedRectBounds(
  rect: NormalizedRect,
  transform: Matrix2D,
  canvasWidth: number,
  canvasHeight: number
): { readonly left: number; readonly top: number; readonly right: number; readonly bottom: number } {
  const points = [
    transformPoint(transform, rect.left, rect.top),
    transformPoint(transform, rect.left + rect.width, rect.top),
    transformPoint(transform, rect.left + rect.width, rect.top + rect.height),
    transformPoint(transform, rect.left, rect.top + rect.height)
  ];
  return {
    left: clamp(Math.floor(Math.min(...points.map((point) => point.x))), 0, canvasWidth),
    top: clamp(Math.floor(Math.min(...points.map((point) => point.y))), 0, canvasHeight),
    right: clamp(Math.ceil(Math.max(...points.map((point) => point.x))), 0, canvasWidth),
    bottom: clamp(Math.ceil(Math.max(...points.map((point) => point.y))), 0, canvasHeight)
  };
}

function sampleNearest(pixels: Uint8ClampedArray, width: number, height: number, x: number, y: number): Rgba {
  const sourceX = clamp(Math.floor(x), 0, width - 1);
  const sourceY = clamp(Math.floor(y), 0, height - 1);
  return pixelAtOffset(pixels, (sourceY * width + sourceX) * 4);
}

function sampleBilinear(pixels: Uint8ClampedArray, width: number, height: number, x: number, y: number): Rgba {
  const sourceX = clamp(x - 0.5, 0, width - 1);
  const sourceY = clamp(y - 0.5, 0, height - 1);
  const left = Math.floor(sourceX);
  const top = Math.floor(sourceY);
  const right = clamp(left + 1, 0, width - 1);
  const bottom = clamp(top + 1, 0, height - 1);
  const tx = sourceX - left;
  const ty = sourceY - top;
  const topLeft = pixelAtOffset(pixels, (top * width + left) * 4);
  const topRight = pixelAtOffset(pixels, (top * width + right) * 4);
  const bottomLeft = pixelAtOffset(pixels, (bottom * width + left) * 4);
  const bottomRight = pixelAtOffset(pixels, (bottom * width + right) * 4);

  return [
    Math.round(lerp(lerp(topLeft[0], topRight[0], tx), lerp(bottomLeft[0], bottomRight[0], tx), ty)),
    Math.round(lerp(lerp(topLeft[1], topRight[1], tx), lerp(bottomLeft[1], bottomRight[1], tx), ty)),
    Math.round(lerp(lerp(topLeft[2], topRight[2], tx), lerp(bottomLeft[2], bottomRight[2], tx), ty)),
    Math.round(lerp(lerp(topLeft[3], topRight[3], tx), lerp(bottomLeft[3], bottomRight[3], tx), ty))
  ];
}

function pixelAtOffset(pixels: Uint8ClampedArray, offset: number): Rgba {
  return [pixels[offset], pixels[offset + 1], pixels[offset + 2], pixels[offset + 3]];
}

function lerp(left: number, right: number, ratio: number): number {
  return left + (right - left) * ratio;
}

function isCanvasImageSource(value: unknown): value is Canvas {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as Canvas).width === "number" &&
    typeof (value as Canvas).height === "number" &&
    typeof (value as Canvas).getContext === "function"
  );
}

function assertCanvasSourceUsable(canvas: Canvas): void {
  if (canvas.getContext("2d").hasOpenLayers()) {
    throw createInvalidStateError("Canvas cannot be used as an image source while layers are open.");
  }
}

function parseCanvasFilter(value: string): ParsedCanvasFilter | undefined {
  const normalized = value.trim().toLowerCase();

  if (normalized === "none") {
    return { serialized: "none", opacity: 1, operations: [] };
  }

  const operations = parseCssFilterOperations(value);
  if (!operations) {
    return undefined;
  }

  return {
    serialized: operations.serialized,
    opacity: operations.opacity,
    operations: operations.operations
  };
}

function parseCanvasLayerFilter(value: unknown): ParsedCanvasFilter | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }

  if (Array.isArray(value)) {
    return combineParsedFilters(value.map(parseCanvasFilterObject).filter((filter): filter is ParsedCanvasFilter => filter !== undefined));
  }

  if (typeof value === "object") {
    return parseCanvasFilterObject(value);
  }

  return parseCanvasFilter(String(value));
}

function parseCanvasFilterObject(value: unknown): ParsedCanvasFilter | undefined {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return undefined;
  }

  const filterOperations = (value as { readonly __raylibCanvasFilterOperations?: unknown }).__raylibCanvasFilterOperations;
  if (Array.isArray(filterOperations)) {
    return combineParsedFilters(filterOperations.map(parseCanvasFilterObject).filter((filter): filter is ParsedCanvasFilter => filter !== undefined), value);
  }

  const record = value as Record<string, unknown>;
  const name = String(record.name ?? "");

  if (name === "gaussianBlur") {
    if (!isValidStdDeviation(record.stdDeviation, true)) {
      throw new TypeError("CanvasFilter gaussianBlur stdDeviation is required.");
    }
    const [stdDeviationX, stdDeviationY] = parseFilterStdDeviation(record.stdDeviation);
    return {
      serialized: value,
      opacity: 1,
      operations: [{ type: "blur", stdDeviationX, stdDeviationY }]
    };
  }

  if (name === "dropShadow") {
    if (!isOptionalFiniteNumberField(record, "dx") || !isOptionalFiniteNumberField(record, "dy") || !isOptionalFiniteNumberField(record, "floodOpacity")) {
      throw new TypeError("CanvasFilter dropShadow numeric values must be finite.");
    }
    if (!isValidStdDeviation(record.stdDeviation, Object.hasOwn(record, "stdDeviation"))) {
      throw new TypeError("CanvasFilter dropShadow stdDeviation must be finite.");
    }
    if (!isValidDropShadowColor(record, "floodColor")) {
      throw new TypeError("CanvasFilter dropShadow floodColor must be a valid CSS color.");
    }
    const [stdDeviationX, stdDeviationY] = parseFilterStdDeviation(Object.hasOwn(record, "stdDeviation") ? record.stdDeviation : 2);
    const floodOpacity = clamp(Number(record.floodOpacity ?? 1), 0, 1);
    const color: Rgba = applyAlpha(record.floodColor === undefined ? [0, 0, 0, 255] : parseFilterColor(String(record.floodColor)) ?? [0, 0, 0, 255], floodOpacity);
    return {
      serialized: value,
      opacity: 1,
      operations: [
        {
          type: "dropShadow",
          dx: Number(Object.hasOwn(record, "dx") ? record.dx : 2),
          dy: Number(Object.hasOwn(record, "dy") ? record.dy : 2),
          stdDeviationX,
          stdDeviationY,
          color
        }
      ]
    };
  }

  if (name === "colorMatrix") {
    const matrix = parseColorMatrixFilter(record);
    return {
      serialized: value,
      opacity: 1,
      operations: [{ type: "colorMatrix", values: matrix }]
    };
  }

  if (name === "componentTransfer") {
    return {
      serialized: value,
      opacity: 1,
      operations: [{ type: "componentTransfer", funcs: parseComponentTransferFilter(record) }]
    };
  }

  if (name === "convolveMatrix" || name === "turbulence") {
    if (name === "convolveMatrix" && !isValidConvolveMatrix(record.kernelMatrix)) {
      throw new TypeError("CanvasFilter convolveMatrix kernelMatrix must be rectangular and finite.");
    }
    if (name === "turbulence" && !isValidTurbulenceFilter(record)) {
      throw new TypeError("CanvasFilter turbulence options are invalid.");
    }
    return {
      serialized: value,
      opacity: 1,
      operations: []
    };
  }

  return undefined;
}

function combineParsedFilters(filters: readonly ParsedCanvasFilter[], serialized?: object): ParsedCanvasFilter | undefined {
  if (filters.length === 0) {
    return undefined;
  }

  return {
    serialized: serialized ?? filters.map((filter) => filter.serialized).join(" "),
    opacity: filters.reduce((opacity, filter) => opacity * filter.opacity, 1),
    operations: filters.flatMap((filter) => filter.operations)
  };
}

function parseCssFilterOperations(value: string): ParsedCanvasFilter | undefined {
  const operations: CanvasFilterOperation[] = [];
  const serializedParts: string[] = [];
  let opacityAmount = 1;
  const parts = value.match(/[a-z-]+\([^)]*\)/gi);

  if (!parts || parts.join(" ").trim().length !== value.trim().length) {
    return undefined;
  }

  for (const part of parts) {
    const opacity = /^opacity\(\s*(\d*\.?\d+%?)\s*\)$/i.exec(part);
    if (opacity) {
      const amount = opacity[1].endsWith("%") ? Number(opacity[1].slice(0, -1)) / 100 : Number(opacity[1]);
      if (!Number.isFinite(amount)) {
        return undefined;
      }
      const clamped = clamp(amount, 0, 1);
      opacityAmount *= clamped;
      operations.push({ type: "opacity", amount: clamped });
      serializedParts.push(`opacity(${serializeCssNumber(clamped)})`);
      continue;
    }

    const blur = /^blur\(\s*([^)]+)\s*\)$/i.exec(part);
    if (blur) {
      const radius = parseFilterLength(blur[1]);
      if (radius === undefined) {
        return undefined;
      }
      operations.push({ type: "blur", stdDeviationX: radius, stdDeviationY: radius });
      serializedParts.push(part);
      continue;
    }

    const dropShadow = /^drop-shadow\(\s*([^)]+)\s*\)$/i.exec(part);
    if (dropShadow) {
      const parsed = parseDropShadowFilter(dropShadow[1]);
      if (!parsed) {
        return undefined;
      }
      operations.push(parsed);
      serializedParts.push(part);
      continue;
    }

    return undefined;
  }

  return { serialized: serializedParts.join(" "), opacity: opacityAmount, operations };
}

function parseDropShadowFilter(value: string): CanvasFilterOperation | undefined {
  const parts = value.trim().split(/\s+/);
  if (parts.length < 2) {
    return undefined;
  }

  const dx = parseFilterOffset(parts[0]);
  const dy = parseFilterOffset(parts[1]);
  let stdDeviation = 0;
  let colorStart = 2;

  if (parts[2] !== undefined && parseFilterLength(parts[2]) !== undefined) {
    stdDeviation = parseFilterLength(parts[2])!;
    colorStart = 3;
  }

  if (dx === undefined || dy === undefined) {
    return undefined;
  }

  const colorText = parts.slice(colorStart).join(" ");
  const color: Rgba = colorText.length > 0 ? parseColor(colorText)?.rgba ?? [0, 0, 0, 255] : [0, 0, 0, 255];
  return { type: "dropShadow", dx, dy, stdDeviationX: stdDeviation, stdDeviationY: stdDeviation, color };
}

function parseFilterLength(value: string): number | undefined {
  const length = parseCssLength(value);
  if (!length?.endsWith("px")) {
    return undefined;
  }

  const number = Number(length.slice(0, -2));
  return Number.isFinite(number) ? Math.max(0, number) : undefined;
}

function parseFilterOffset(value: string): number | undefined {
  const length = parseCssLength(value);
  if (!length?.endsWith("px")) {
    return undefined;
  }

  const number = Number(length.slice(0, -2));
  return Number.isFinite(number) ? number : undefined;
}

function parseFilterStdDeviation(value: unknown): [number, number] {
  if (Array.isArray(value)) {
    const x = Number(value[0] ?? 0);
    const y = Number(value[1] ?? x);
    return [Number.isFinite(x) ? Math.max(0, x) : 0, Number.isFinite(y) ? Math.max(0, y) : 0];
  }

  const amount = Number(value ?? 0);
  const normalized = Number.isFinite(amount) ? Math.max(0, amount) : 0;
  return [normalized, normalized];
}

function isValidColorMatrixValues(value: unknown): boolean {
  return Array.isArray(value) && value.length === 20 && value.every((entry) => Number.isFinite(Number(entry)));
}

function parseColorMatrixFilter(record: Record<string, unknown>): readonly number[] {
  const type = record.type === undefined ? "matrix" : String(record.type);

  if (type === "matrix") {
    if (!isValidColorMatrixValues(record.values)) {
      throw new TypeError("CanvasFilter colorMatrix values must be numeric.");
    }
    return (record.values as readonly unknown[]).map(Number);
  }

  if (type === "hueRotate") {
    const angle = Number(record.values ?? 0);
    if (!Number.isFinite(angle)) {
      throw new TypeError("CanvasFilter hueRotate value must be finite.");
    }
    return hueRotateMatrix(angle);
  }

  if (type === "saturate") {
    const amount = Number(record.values ?? 1);
    if (!Number.isFinite(amount)) {
      throw new TypeError("CanvasFilter saturate value must be finite.");
    }
    return saturateMatrix(amount);
  }

  if (type === "luminanceToAlpha") {
    return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2125, 0.7154, 0.0721, 0, 0];
  }

  throw new TypeError("Unsupported CanvasFilter colorMatrix type.");
}

function parseComponentTransferFilter(record: Record<string, unknown>): readonly ComponentTransferFunc[] {
  return ["funcR", "funcG", "funcB", "funcA"].map((key) => parseComponentTransferFunc(record[key]));
}

function parseComponentTransferFunc(value: unknown): ComponentTransferFunc {
  if (value === undefined) {
    return { type: "identity" };
  }

  if (value === null || typeof value !== "object") {
    throw new TypeError("CanvasFilter componentTransfer functions must be objects.");
  }

  const record = value as Record<string, unknown>;
  const type = String(record.type ?? "identity") as ComponentTransferFunc["type"];

  if (type === "identity") {
    return { type };
  }

  if (type === "linear") {
    return { type, slope: finiteOrDefault(record.slope, 1), intercept: finiteOrDefault(record.intercept, 0) };
  }

  if (type === "gamma") {
    return {
      type,
      amplitude: finiteOrDefault(record.amplitude, 1),
      exponent: finiteOrDefault(record.exponent, 1),
      offset: finiteOrDefault(record.offset, 0)
    };
  }

  if (type === "table" || type === "discrete") {
    return { type, tableValues: parseNumberList(record.tableValues) };
  }

  throw new TypeError("Unsupported CanvasFilter componentTransfer type.");
}

function parseNumberList(value: unknown): readonly number[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new TypeError("CanvasFilter tableValues must be a non-empty numeric array.");
  }

  const numbers = value.map(Number);
  if (numbers.some((number) => !Number.isFinite(number))) {
    throw new TypeError("CanvasFilter tableValues must be finite.");
  }

  return numbers;
}

function finiteOrDefault(value: unknown, fallback: number): number {
  const number = Number(value ?? fallback);
  if (!Number.isFinite(number)) {
    throw new TypeError("CanvasFilter numeric values must be finite.");
  }
  return number;
}

function isOptionalFiniteNumberField(record: Record<string, unknown>, key: string): boolean {
  if (!Object.hasOwn(record, key)) {
    return true;
  }

  return Number.isFinite(Number(record[key]));
}

function isValidStdDeviation(value: unknown, required: boolean): boolean {
  if (value === undefined) {
    return !required;
  }

  if (Array.isArray(value)) {
    return value.length <= 2 && value.every((entry) => Number.isFinite(Number(entry)));
  }

  return Number.isFinite(Number(value));
}

function isValidDropShadowColor(record: Record<string, unknown>, key: string): boolean {
  if (!Object.hasOwn(record, key)) {
    return true;
  }

  const value = record[key];
  return typeof value === "string" && parseFilterColor(value) !== undefined;
}

function isValidConvolveMatrix(value: unknown): boolean {
  if (!Array.isArray(value) || value.length === 0 || !value.every(Array.isArray)) {
    return false;
  }

  const width = value[0].length;
  if (width === 0) {
    return value.length === 1;
  }
  return value.every((row) => row.length === width && row.every((entry: unknown) => Number.isFinite(Number(entry))));
}

function parseFilterColor(value: string): Rgba | undefined {
  const color = parseColor(value)?.rgba;
  if (color) {
    return color;
  }

  const normalized = value.trim().toLowerCase();
  if (normalized === "canvas") {
    return [255, 255, 255, 255];
  }
  if (normalized === "linktext") {
    return [0, 0, 238, 255];
  }

  return undefined;
}

function isValidTurbulenceFilter(record: Record<string, unknown>): boolean {
  return (
    isOptionalNonNegativeNumberField(record, "baseFrequency", true) &&
    isOptionalNonNegativeNumberField(record, "numOctaves", false) &&
    isOptionalFiniteNumberField(record, "seed") &&
    isOptionalEnumField(record, "stitchTiles", ["stitch", "noStitch"]) &&
    isOptionalEnumField(record, "type", ["fractalNoise", "turbulence"])
  );
}

function isOptionalNonNegativeNumberField(record: Record<string, unknown>, key: string, allowPair: boolean): boolean {
  if (!Object.hasOwn(record, key)) {
    return true;
  }

  const value = record[key];
  if (allowPair && Array.isArray(value) && value.length <= 2) {
    return value.every((entry) => Number.isFinite(Number(entry)) && Number(entry) >= 0);
  }

  if (Array.isArray(value) && value.length !== 0) {
    return value.length === 1 && Number.isFinite(Number(value[0])) && Number(value[0]) >= 0;
  }

  const number = Number(value);
  return Number.isFinite(number) && number >= 0;
}

function isOptionalEnumField(record: Record<string, unknown>, key: string, options: readonly string[]): boolean {
  if (!Object.hasOwn(record, key)) {
    return true;
  }

  const value = record[key];
  return typeof value === "string" && options.includes(value);
}

function hueRotateMatrix(angleDegrees: number): readonly number[] {
  const angle = (angleDegrees * Math.PI) / 180;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [
    0.213 + cos * 0.787 - sin * 0.213,
    0.715 - cos * 0.715 - sin * 0.715,
    0.072 - cos * 0.072 + sin * 0.928,
    0,
    0,
    0.213 - cos * 0.213 + sin * 0.143,
    0.715 + cos * 0.285 + sin * 0.14,
    0.072 - cos * 0.072 - sin * 0.283,
    0,
    0,
    0.213 - cos * 0.213 - sin * 0.787,
    0.715 - cos * 0.715 + sin * 0.715,
    0.072 + cos * 0.928 + sin * 0.072,
    0,
    0,
    0,
    0,
    0,
    1,
    0
  ];
}

function saturateMatrix(amount: number): readonly number[] {
  return [
    0.213 + 0.787 * amount,
    0.715 - 0.715 * amount,
    0.072 - 0.072 * amount,
    0,
    0,
    0.213 - 0.213 * amount,
    0.715 + 0.285 * amount,
    0.072 - 0.072 * amount,
    0,
    0,
    0.213 - 0.213 * amount,
    0.715 - 0.715 * amount,
    0.072 + 0.928 * amount,
    0,
    0,
    0,
    0,
    0,
    1,
    0
  ];
}

function applyAlpha(color: Rgba, alpha: number): Rgba {
  if (alpha === 1) {
    return color;
  }

  return [color[0], color[1], color[2], Math.round(color[3] * clamp(alpha, 0, 1))];
}

function applyCanvasFilterOperations(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  operations: readonly CanvasFilterOperation[],
  filterTransform: Matrix2D = IDENTITY_MATRIX
): Uint8ClampedArray {
  let output = copyPixels(pixels);

  for (const operation of operations) {
    if (operation.type === "opacity") {
      output = applyOpacityFilter(output, operation.amount);
      continue;
    }

    if (operation.type === "blur") {
      output = applyBlurFilter(output, width, height, operation.stdDeviationX, operation.stdDeviationY);
      continue;
    }

    if (operation.type === "dropShadow") {
      output = applyDropShadowFilter(output, width, height, operation, filterTransform);
      continue;
    }

    if (operation.type === "colorMatrix") {
      output = applyColorMatrixFilter(output, operation.values);
      continue;
    }

    output = applyComponentTransferFilter(output, operation.funcs);
  }

  return output;
}

function isOnlyOpacityFilter(operations: readonly CanvasFilterOperation[]): boolean {
  return operations.every((operation) => operation.type === "opacity");
}

function applyOpacityFilter(pixels: Uint8ClampedArray, amount: number): Uint8ClampedArray {
  const output = copyPixels(pixels);

  for (let offset = 3; offset < output.length; offset += 4) {
    output[offset] = Math.round(output[offset] * clamp(amount, 0, 1));
  }

  return output;
}

function applyColorMatrixFilter(pixels: Uint8ClampedArray, matrix: readonly number[]): Uint8ClampedArray {
  const output = new Uint8ClampedArray(pixels.length);

  for (let offset = 0; offset < pixels.length; offset += 4) {
    const r = pixels[offset] / 255;
    const g = pixels[offset + 1] / 255;
    const b = pixels[offset + 2] / 255;
    const a = pixels[offset + 3] / 255;
    output[offset] = Math.round(clamp(matrix[0] * r + matrix[1] * g + matrix[2] * b + matrix[3] * a + matrix[4], 0, 1) * 255);
    output[offset + 1] = Math.round(clamp(matrix[5] * r + matrix[6] * g + matrix[7] * b + matrix[8] * a + matrix[9], 0, 1) * 255);
    output[offset + 2] = Math.round(clamp(matrix[10] * r + matrix[11] * g + matrix[12] * b + matrix[13] * a + matrix[14], 0, 1) * 255);
    output[offset + 3] = Math.round(clamp(matrix[15] * r + matrix[16] * g + matrix[17] * b + matrix[18] * a + matrix[19], 0, 1) * 255);
  }

  return output;
}

function applyComponentTransferFilter(pixels: Uint8ClampedArray, funcs: readonly ComponentTransferFunc[]): Uint8ClampedArray {
  const output = new Uint8ClampedArray(pixels.length);

  for (let offset = 0; offset < pixels.length; offset += 4) {
    output[offset] = Math.round(applyComponentTransferFunc(pixels[offset] / 255, funcs[0]) * 255);
    output[offset + 1] = Math.round(applyComponentTransferFunc(pixels[offset + 1] / 255, funcs[1]) * 255);
    output[offset + 2] = Math.round(applyComponentTransferFunc(pixels[offset + 2] / 255, funcs[2]) * 255);
    output[offset + 3] = Math.round(applyComponentTransferFunc(pixels[offset + 3] / 255, funcs[3]) * 255);
  }

  return output;
}

function applyComponentTransferFunc(value: number, func: ComponentTransferFunc): number {
  if (func.type === "identity") {
    return value;
  }

  if (func.type === "linear") {
    return clamp((func.slope ?? 1) * value + (func.intercept ?? 0), 0, 1);
  }

  if (func.type === "gamma") {
    return clamp((func.amplitude ?? 1) * value ** (func.exponent ?? 1) + (func.offset ?? 0), 0, 1);
  }

  const table = func.tableValues ?? [0, 1];
  if (func.type === "discrete") {
    return clamp(table[clamp(Math.floor(value * table.length), 0, table.length - 1)], 0, 1);
  }

  if (table.length === 1) {
    return clamp(table[0], 0, 1);
  }

  const position = value * (table.length - 1);
  const left = clamp(Math.floor(position), 0, table.length - 1);
  const right = clamp(left + 1, 0, table.length - 1);
  return clamp(lerp(table[left], table[right], position - left), 0, 1);
}

function applyDropShadowFilter(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  operation: Extract<CanvasFilterOperation, { readonly type: "dropShadow" }>,
  filterTransform: Matrix2D
): Uint8ClampedArray {
  const shadow = new Uint8ClampedArray(pixels.length);
  const transformedOffset = transformVector(filterTransform, operation.dx, operation.dy);
  const dx = Math.round(transformedOffset.x);
  const dy = Math.round(transformedOffset.y);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const sourceOffset = (y * width + x) * 4;
      const alpha = pixels[sourceOffset + 3];

      if (alpha === 0) {
        continue;
      }

      const targetX = x + dx;
      const targetY = y + dy;

      if (targetX < 0 || targetX >= width || targetY < 0 || targetY >= height) {
        continue;
      }

      const targetOffset = (targetY * width + targetX) * 4;
      const color = applyAlpha(operation.color, alpha / 255);
      compositePixel(shadow, targetOffset, color, "source-over");
    }
  }

  const blurredShadow = applyBlurFilter(shadow, width, height, operation.stdDeviationX, operation.stdDeviationY);
  const output = copyPixels(blurredShadow);

  for (let offset = 0; offset < pixels.length; offset += 4) {
    compositePixel(output, offset, [pixels[offset], pixels[offset + 1], pixels[offset + 2], pixels[offset + 3]], "source-over");
  }

  return output;
}

function applyBlurFilter(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  stdDeviationX: number,
  stdDeviationY: number
): Uint8ClampedArray {
  let output = pixels;

  if (stdDeviationX > 0) {
    output = gaussianBlurHorizontal(output, width, height, createGaussianKernel(stdDeviationX));
  }

  if (stdDeviationY > 0) {
    output = gaussianBlurVertical(output, width, height, createGaussianKernel(stdDeviationY));
  }

  return output === pixels ? copyPixels(pixels) : output;
}

function copyPixels(pixels: Uint8ClampedArray): Uint8ClampedArray {
  const copy = new Uint8ClampedArray(pixels.length);
  copy.set(pixels);
  return copy;
}

function createGaussianKernel(stdDeviation: number): Float64Array {
  const scaledStdDeviation = stdDeviation * SVG_GAUSSIAN_BLUR_SIGMA_SCALE;
  const radius = Math.ceil(scaledStdDeviation * 3);
  const kernel = new Float64Array(radius * 2 + 1);
  const denominator = 2 * scaledStdDeviation * scaledStdDeviation;
  let sum = 0;

  for (let offset = -radius; offset <= radius; offset += 1) {
    const weight = Math.exp(-(offset * offset) / denominator);
    kernel[offset + radius] = weight;
    sum += weight;
  }

  for (let index = 0; index < kernel.length; index += 1) {
    kernel[index] /= sum;
  }

  return kernel;
}

function gaussianBlurHorizontal(pixels: Uint8ClampedArray, width: number, height: number, kernel: Float64Array): Uint8ClampedArray {
  const output = new Uint8ClampedArray(pixels.length);
  const radius = Math.floor(kernel.length / 2);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      let red = 0;
      let green = 0;
      let blue = 0;
      let alpha = 0;

      for (let kernelIndex = 0; kernelIndex < kernel.length; kernelIndex += 1) {
        const sx = x + kernelIndex - radius;

        if (sx < 0 || sx >= width) {
          continue;
        }

        const offset = (y * width + sx) * 4;
        const weight = kernel[kernelIndex];
        red += pixels[offset] * pixels[offset + 3] * weight;
        green += pixels[offset + 1] * pixels[offset + 3] * weight;
        blue += pixels[offset + 2] * pixels[offset + 3] * weight;
        alpha += pixels[offset + 3] * weight;
      }

      const targetOffset = (y * width + x) * 4;
      output[targetOffset] = alpha === 0 ? 0 : Math.round(red / alpha);
      output[targetOffset + 1] = alpha === 0 ? 0 : Math.round(green / alpha);
      output[targetOffset + 2] = alpha === 0 ? 0 : Math.round(blue / alpha);
      output[targetOffset + 3] = Math.round(alpha);
    }
  }

  return output;
}

function gaussianBlurVertical(pixels: Uint8ClampedArray, width: number, height: number, kernel: Float64Array): Uint8ClampedArray {
  const output = new Uint8ClampedArray(pixels.length);
  const radius = Math.floor(kernel.length / 2);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      let red = 0;
      let green = 0;
      let blue = 0;
      let alpha = 0;

      for (let kernelIndex = 0; kernelIndex < kernel.length; kernelIndex += 1) {
        const sy = y + kernelIndex - radius;

        if (sy < 0 || sy >= height) {
          continue;
        }

        const offset = (sy * width + x) * 4;
        const weight = kernel[kernelIndex];
        red += pixels[offset] * pixels[offset + 3] * weight;
        green += pixels[offset + 1] * pixels[offset + 3] * weight;
        blue += pixels[offset + 2] * pixels[offset + 3] * weight;
        alpha += pixels[offset + 3] * weight;
      }

      const targetOffset = (y * width + x) * 4;
      output[targetOffset] = alpha === 0 ? 0 : Math.round(red / alpha);
      output[targetOffset + 1] = alpha === 0 ? 0 : Math.round(green / alpha);
      output[targetOffset + 2] = alpha === 0 ? 0 : Math.round(blue / alpha);
      output[targetOffset + 3] = Math.round(alpha);
    }
  }

  return output;
}

function offsetPolygons(polygons: readonly Point[][], offsetX: number, offsetY: number): Point[][] {
  return polygons.map((polygon) => polygon.map((point) => ({ x: point.x + offsetX, y: point.y + offsetY })));
}

function assertFiniteNumbers(values: readonly number[], label: string): void {
  if (values.some((value) => !Number.isFinite(Number(value)))) {
    throw new TypeError(`${label} arguments must be finite.`);
  }
}

function normalizeImageDataColorSpace(settings?: ImageDataSettings): CanvasImageDataColorSpace {
  if (settings?.colorSpace === undefined || settings.colorSpace === "srgb") {
    return "srgb";
  }

  throw createNotSupportedError("Only the srgb ImageData color space is supported.");
}

function parseCssLength(value: string): string | undefined {
  const normalized = value.trim().toLowerCase();

  if (normalized.length === 0 || normalized.includes(";") || normalized.includes("calc(")) {
    return undefined;
  }

  const match = /^([+-]?(?:\d+|\d*\.\d+))(?:([a-z]+)|\s*)$/.exec(normalized);
  if (!match) {
    return undefined;
  }

  const number = Number(match[1]);
  const unit = match[2] ?? "";

  if (!Number.isFinite(number)) {
    return undefined;
  }

  if (unit.length === 0) {
    return number === 0 ? "0px" : undefined;
  }

  if (!CSS_LENGTH_UNITS.has(unit)) {
    return undefined;
  }

  return `${serializeCssNumber(number)}${unit}`;
}

function cssLengthToPixels(value: string, fontSize: number): number {
  const match = /^([+-]?(?:\d+|\d*\.\d+))([a-z%]+)$/.exec(value.trim().toLowerCase());

  if (!match) {
    return 0;
  }

  const amount = Number(match[1]);
  const unit = match[2];

  if (!Number.isFinite(amount)) {
    return 0;
  }

  if (unit === "px") {
    return amount;
  }

  if (unit === "pt") {
    return (amount * 4) / 3;
  }

  if (unit === "em" || unit === "rem") {
    return amount * fontSize;
  }

  if (unit === "%") {
    return (amount / 100) * fontSize;
  }

  return 0;
}

function parseCanvasFont(value: string): string | undefined {
  const trimmed = value.trim();

  if (
    trimmed.length === 0 ||
    trimmed.includes(";") ||
    trimmed.includes("{") ||
    trimmed.includes("}") ||
    /\bvar\s*\(/i.test(trimmed)
  ) {
    return undefined;
  }

  const tokens = tokenizeCssWhitespace(trimmed);
  const sizeIndex = tokens.findIndex((token) => parseFontSizeToken(token) !== undefined);

  if (sizeIndex === -1 || sizeIndex === tokens.length - 1) {
    return undefined;
  }

  for (const token of tokens.slice(0, sizeIndex)) {
    if (!isFontPrefixToken(token)) {
      return undefined;
    }
  }

  const size = parseFontSizeToken(tokens[sizeIndex]);
  const family = serializeFontFamily(tokens.slice(sizeIndex + 1).join(" "));

  if (!size || !family) {
    return undefined;
  }

  const prefix = serializeFontPrefix(tokens.slice(0, sizeIndex));
  return [...prefix, size, family].join(" ");
}

function tokenizeCssWhitespace(value: string): string[] {
  const tokens: string[] = [];
  let current = "";
  let quote: "'" | "\"" | undefined;

  for (let index = 0; index < value.length; index += 1) {
    const char = value[index];

    if (quote) {
      current += char;
      if (char === quote) {
        quote = undefined;
      }
      continue;
    }

    if (char === "'" || char === "\"") {
      quote = char;
      current += char;
      continue;
    }

    if (/\s/.test(char)) {
      if (current.length > 0) {
        tokens.push(current);
        current = "";
      }
      continue;
    }

    current += char;
  }

  if (quote) {
    return [];
  }

  if (current.length > 0) {
    tokens.push(current);
  }

  return tokens;
}

function isFontPrefixToken(token: string): boolean {
  const normalized = token.toLowerCase();

  return (
    FONT_STYLE_KEYWORDS.has(normalized) ||
    FONT_VARIANT_KEYWORDS.has(normalized) ||
    FONT_WEIGHT_KEYWORDS.has(normalized) ||
    FONT_STRETCH_KEYWORDS.has(normalized) ||
    isNumericFontWeight(normalized)
  );
}

function parseFontSizeToken(token: string): string | undefined {
  const [size] = token.split("/");
  const normalized = size.toLowerCase();

  if (FONT_SIZE_KEYWORDS.has(normalized)) {
    return normalized;
  }

  if (normalized.endsWith("%")) {
    const percentage = Number(normalized.slice(0, -1));
    return Number.isFinite(percentage) && percentage > 0 ? `${serializeCssNumber(percentage)}%` : undefined;
  }

  const length = parseCssLength(normalized);
  if (!length) {
    return undefined;
  }

  return length === "0px" ? undefined : length;
}

function serializeFontPrefix(tokens: readonly string[]): string[] {
  const serialized: string[] = [];
  let style = "";
  let variant = "";
  let weight = "";
  let stretch = "";

  for (const token of tokens) {
    const normalized = token.toLowerCase();

    if (FONT_STYLE_KEYWORDS.has(normalized) && normalized !== "normal") {
      style = normalized;
      continue;
    }

    if (FONT_VARIANT_KEYWORDS.has(normalized) && normalized !== "normal") {
      variant = normalized;
      continue;
    }

    if ((FONT_WEIGHT_KEYWORDS.has(normalized) || isNumericFontWeight(normalized)) && normalized !== "normal" && normalized !== "400") {
      weight = normalized;
      continue;
    }

    if (FONT_STRETCH_KEYWORDS.has(normalized) && normalized !== "normal") {
      stretch = normalized;
    }
  }

  if (style) {
    serialized.push(style);
  }
  if (variant) {
    serialized.push(variant);
  }
  if (weight) {
    serialized.push(weight);
  }
  if (stretch) {
    serialized.push(stretch);
  }

  return serialized;
}

function isNumericFontWeight(value: string): boolean {
  const weight = Number(value);
  return Number.isInteger(weight) && weight >= 1 && weight <= 1000;
}

function serializeFontFamily(value: string): string | undefined {
  const families = splitCssCommaList(value).map(serializeSingleFontFamily);

  if (families.length === 0 || families.some((family) => family === undefined)) {
    return undefined;
  }

  return families.join(", ");
}

function splitCssCommaList(value: string): string[] {
  const parts: string[] = [];
  let current = "";
  let quote: "'" | "\"" | undefined;

  for (let index = 0; index < value.length; index += 1) {
    const char = value[index];

    if (quote) {
      current += char;
      if (char === quote) {
        quote = undefined;
      }
      continue;
    }

    if (char === "'" || char === "\"") {
      quote = char;
      current += char;
      continue;
    }

    if (char === ",") {
      parts.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  if (quote) {
    return [];
  }

  parts.push(current.trim());
  return parts.filter((part) => part.length > 0);
}

function serializeSingleFontFamily(value: string): string | undefined {
  const trimmed = value.trim();
  const quoted = /^(['"])(.*)\1$/.exec(trimmed);

  if (quoted) {
    const family = quoted[2].replace(/\s+/g, " ").trim();
    return family.length > 0 ? `"${family.replace(/["\\]/g, "\\$&")}"` : undefined;
  }

  const normalized = trimmed.replace(/\s+/g, " ");
  const lower = normalized.toLowerCase();

  if (PROPERTY_WIDE_KEYWORDS.has(lower)) {
    return undefined;
  }

  if (GENERIC_FONT_FAMILIES.has(lower)) {
    return lower;
  }

  if (!/^[-_a-zA-Z][-_a-zA-Z0-9]*(?: [-_a-zA-Z][-_a-zA-Z0-9]*)*$/.test(normalized)) {
    return undefined;
  }

  return `"${normalized}"`;
}

function serializeCssNumber(value: number): string {
  if (Object.is(value, -0)) {
    return "0";
  }

  return String(value);
}

function parseCssColorObject(value: unknown): { rgba: Rgba; serialized: string } | undefined {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  const record = value as {
    readonly constructor?: { readonly name?: string };
    readonly r?: unknown;
    readonly g?: unknown;
    readonly b?: unknown;
    readonly h?: unknown;
    readonly s?: unknown;
    readonly l?: unknown;
    readonly alpha?: unknown;
  };

  if (record.constructor?.name === "CSSRGB") {
    const rgba: Rgba = [
      cssRgbComponentToByte(record.r),
      cssRgbComponentToByte(record.g),
      cssRgbComponentToByte(record.b),
      cssAlphaToByte(record.alpha)
    ];
    return { rgba, serialized: serializeColor(rgba) };
  }

  if (record.constructor?.name === "CSSHSL") {
    const rgba = hslToRgba(cssHueToDegrees(record.h), cssUnitInterval(record.s), cssUnitInterval(record.l), cssAlphaToByte(record.alpha));
    return { rgba, serialized: serializeColor(rgba) };
  }

  return undefined;
}

function parseColor(value: string): { rgba: Rgba; serialized: string } | undefined {
  const normalized = value.trim().toLowerCase();
  const named = NAMED_COLORS[normalized];

  if (named) {
    return {
      rgba: named,
      serialized: serializeColor(named)
    };
  }

  const shortHex = /^#([0-9a-f]{3})$/i.exec(normalized);
  if (shortHex) {
    const rgba: Rgba = [
      Number.parseInt(shortHex[1][0] + shortHex[1][0], 16),
      Number.parseInt(shortHex[1][1] + shortHex[1][1], 16),
      Number.parseInt(shortHex[1][2] + shortHex[1][2], 16),
      255
    ];
    return { rgba, serialized: serializeColor(rgba) };
  }

  const longHex = /^#([0-9a-f]{6})$/i.exec(normalized);
  if (longHex) {
    const rgba: Rgba = [
      Number.parseInt(longHex[1].slice(0, 2), 16),
      Number.parseInt(longHex[1].slice(2, 4), 16),
      Number.parseInt(longHex[1].slice(4, 6), 16),
      255
    ];
    return { rgba, serialized: serializeColor(rgba) };
  }

  const shortHexWithAlpha = /^#([0-9a-f]{4})$/i.exec(normalized);
  if (shortHexWithAlpha) {
    const rgba: Rgba = [
      Number.parseInt(shortHexWithAlpha[1][0] + shortHexWithAlpha[1][0], 16),
      Number.parseInt(shortHexWithAlpha[1][1] + shortHexWithAlpha[1][1], 16),
      Number.parseInt(shortHexWithAlpha[1][2] + shortHexWithAlpha[1][2], 16),
      Number.parseInt(shortHexWithAlpha[1][3] + shortHexWithAlpha[1][3], 16)
    ];
    return { rgba, serialized: serializeColor(rgba) };
  }

  const longHexWithAlpha = /^#([0-9a-f]{8})$/i.exec(normalized);
  if (longHexWithAlpha) {
    const rgba: Rgba = [
      Number.parseInt(longHexWithAlpha[1].slice(0, 2), 16),
      Number.parseInt(longHexWithAlpha[1].slice(2, 4), 16),
      Number.parseInt(longHexWithAlpha[1].slice(4, 6), 16),
      Number.parseInt(longHexWithAlpha[1].slice(6, 8), 16)
    ];
    return { rgba, serialized: serializeColor(rgba) };
  }

  const rgb = /^rgb\(\s*([+-]?\d*\.?\d+%?)\s*,\s*([+-]?\d*\.?\d+%?)\s*,\s*([+-]?\d*\.?\d+%?)\s*\)?$/.exec(normalized);
  if (rgb) {
    const rgba: Rgba = [
      parseRgbComponent(rgb[1]),
      parseRgbComponent(rgb[2]),
      parseRgbComponent(rgb[3]),
      255
    ];
    return { rgba, serialized: serializeColor(rgba) };
  }

  const rgba = /^rgba\(\s*([+-]?\d*\.?\d+%?)\s*,\s*([+-]?\d*\.?\d+%?)\s*,\s*([+-]?\d*\.?\d+%?)\s*,\s*([+-]?\d*\.?\d+%?)\s*\)?$/.exec(
    normalized
  );
  if (rgba) {
    const alpha = parseAlpha(rgba[4]);
    const color: Rgba = [
      parseRgbComponent(rgba[1]),
      parseRgbComponent(rgba[2]),
      parseRgbComponent(rgba[3]),
      alpha.byte
    ];
    return { rgba: color, serialized: serializeColor(color, alpha.serialized) };
  }

  const hsl = /^hsl\(\s*([+-]?\d*\.?\d+)\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*\)$/.exec(normalized);
  if (hsl) {
    const color = hslToRgba(Number(hsl[1]), Number(hsl[2]) / 100, Number(hsl[3]) / 100, 255);
    return { rgba: color, serialized: serializeColor(color) };
  }

  const hsla = /^hsla\(\s*([+-]?\d*\.?\d+)\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+%?)\s*\)$/.exec(normalized);
  if (hsla) {
    const alpha = parseAlpha(hsla[4]);
    const color = hslToRgba(Number(hsla[1]), Number(hsla[2]) / 100, Number(hsla[3]) / 100, alpha.byte);
    return { rgba: color, serialized: serializeColor(color, alpha.serialized) };
  }

  return undefined;
}

function serializeColor(color: Rgba, alphaOverride?: string): string {
  if (color[3] === 255) {
    return `#${toHexByte(color[0])}${toHexByte(color[1])}${toHexByte(color[2])}`;
  }

  const alpha = alphaOverride ?? Math.round((color[3] / 255) * 1000) / 1000;
  return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
}

function toHexByte(value: number): string {
  return value.toString(16).padStart(2, "0");
}

function parseRgbComponent(value: string): number {
  if (value.endsWith("%")) {
    return clamp(Math.round((Number(value.slice(0, -1)) / 100) * 255), 0, 255);
  }

  return clamp(Math.round(Number(value)), 0, 255);
}

function parseAlpha(value: string): { byte: number; serialized: string } {
  if (value.endsWith("%")) {
    const alpha = clamp(Number(value.slice(0, -1)) / 100, 0, 1);
    return { byte: Math.round(alpha * 255), serialized: serializeAlpha(alpha) };
  }

  const alpha = clamp(Number(value), 0, 1);
  return { byte: Math.round(alpha * 255), serialized: serializeAlpha(alpha) };
}

function serializeAlpha(value: number): string {
  return String(Math.round(value * 1000) / 1000);
}

function hslToRgba(hue: number, saturation: number, lightness: number, alpha: number): Rgba {
  const h = positiveModulo(hue, 360) / 360;
  const s = clamp(saturation, 0, 1);
  const l = clamp(lightness, 0, 1);

  if (s === 0) {
    const gray = Math.round(l * 255);
    return [gray, gray, gray, alpha];
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [
    Math.round(hueToRgb(p, q, h + 1 / 3) * 255),
    Math.round(hueToRgb(p, q, h) * 255),
    Math.round(hueToRgb(p, q, h - 1 / 3) * 255),
    alpha
  ];
}

function hueToRgb(p: number, q: number, t: number): number {
  if (t < 0) {
    t += 1;
  }
  if (t > 1) {
    t -= 1;
  }
  if (t < 1 / 6) {
    return p + (q - p) * 6 * t;
  }
  if (t < 1 / 2) {
    return q;
  }
  if (t < 2 / 3) {
    return p + (q - p) * (2 / 3 - t) * 6;
  }
  return p;
}

function cssRgbComponentToByte(value: unknown): number {
  const unit = cssUnit(value);
  if (unit?.unit === "percent") {
    return clamp(Math.round((unit.value / 100) * 255), 0, 255);
  }
  return clamp(Math.round(Number(unit?.value ?? value) * 255), 0, 255);
}

function cssAlphaToByte(value: unknown): number {
  if (value === undefined) {
    return 255;
  }
  const unit = cssUnit(value);
  if (unit?.unit === "percent") {
    return clamp(Math.round((unit.value / 100) * 255), 0, 255);
  }
  return clamp(Math.round(Number(unit?.value ?? value) * 255), 0, 255);
}

function cssHueToDegrees(value: unknown): number {
  const unit = cssUnit(value);
  return Number(unit?.value ?? value);
}

function cssUnitInterval(value: unknown): number {
  const unit = cssUnit(value);
  if (unit?.unit === "percent") {
    return unit.value / 100;
  }
  return Number(unit?.value ?? value);
}

function cssUnit(value: unknown): { value: number; unit: string } | undefined {
  if (!value || typeof value !== "object") {
    return undefined;
  }
  const record = value as { readonly value?: unknown; readonly unit?: unknown };
  if (typeof record.value === "number" && typeof record.unit === "string") {
    return { value: record.value, unit: record.unit };
  }
  return undefined;
}

function createIndexSizeError(message: string): Error {
  if (typeof DOMException === "function") {
    return new DOMException(message, "IndexSizeError");
  }

  const error = new Error(message);
  error.name = "IndexSizeError";
  return error;
}

function createSyntaxError(message: string): Error {
  if (typeof DOMException === "function") {
    return new DOMException(message, "SyntaxError");
  }

  const error = new Error(message);
  error.name = "SyntaxError";
  return error;
}

function createNotSupportedError(message: string): Error {
  if (typeof DOMException === "function") {
    return new DOMException(message, "NotSupportedError");
  }

  const error = new Error(message);
  error.name = "NotSupportedError";
  return error;
}

function createInvalidStateError(message: string): Error {
  if (typeof DOMException === "function") {
    return new DOMException(message, "InvalidStateError");
  }

  const error = new Error(message);
  error.name = "InvalidStateError";
  return error;
}

function createTypeMismatchError(message: string): Error {
  if (typeof DOMException === "function") {
    return new DOMException(message, "TypeMismatchError");
  }

  const error = new Error(message);
  error.name = "TypeMismatchError";
  return error;
}

function createRangeError(message: string): RangeError {
  return new RangeError(message);
}

function toWebIDLLong(value: unknown, label: string): number {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    throw new TypeError(`${label} must be finite`);
  }

  return Math.trunc(number);
}
