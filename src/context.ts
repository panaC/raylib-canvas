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
  fillStyle: string;

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
   * Returns the live RGBA backing pixels for encoding and diagnostics.
   * This is a deliberate package extension, not part of the web Canvas API.
   */
  getPixels(): Uint8ClampedArray;

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
   * Fills the current path or the supplied path.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-fill-dev
   */
  fill(path?: CanvasPath2D, fillRule?: CanvasFillRule): void;

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
   * Closes the current subpath.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-closepath-dev
   */
  closePath(): void;

  /**
   * Returns a copy of pixels from the requested rectangle.
   * @see https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-getimagedata-dev
   */
  getImageData(sx: number, sy: number, sw: number, sh: number): CanvasImageData;

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
  | { readonly type: "closePath" };

type CanvasState = {
  readonly fillStyle: string;
  readonly fillColor: Rgba;
  readonly transform: Matrix2D;
  readonly strokeStyle: string;
  readonly fillRule: CanvasFillRule;
  readonly globalAlpha: number;
  readonly lineWidth: number;
  readonly lineCap: CanvasLineCap;
  readonly lineJoin: CanvasLineJoin;
  readonly miterLimit: number;
  readonly globalCompositeOperation: string;
  readonly font: string;
  readonly filter: string;
  readonly lineDash: readonly number[];
  readonly lineDashOffset: number;
};

const NAMED_COLORS: Record<string, Rgba> = {
  black: [0, 0, 0, 255],
  blue: [0, 0, 255, 255],
  green: [0, 128, 0, 255],
  red: [255, 0, 0, 255],
  transparent: [0, 0, 0, 0],
  white: [255, 255, 255, 255]
};
const TRANSPARENT_BLACK: Rgba = [0, 0, 0, 0];
const IDENTITY_MATRIX: Matrix2D = [1, 0, 0, 1, 0, 0];
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

export class CanvasPath2D {
  readonly #commands: PathCommand[] = [];

  constructor(path?: CanvasPath2D) {
    if (path) {
      this.#commands.push(...path.getCommands());
    }
  }

  moveTo(x: number, y: number): void {
    if (![x, y].every(Number.isFinite)) {
      return;
    }

    this.#commands.push({ type: "moveTo", x, y });
  }

  lineTo(x: number, y: number): void {
    if (![x, y].every(Number.isFinite)) {
      return;
    }

    this.#commands.push({ type: "lineTo", x, y });
  }

  bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void {
    if (![cp1x, cp1y, cp2x, cp2y, x, y].every(Number.isFinite)) {
      return;
    }

    this.#commands.push({ type: "bezierCurveTo", cp1x, cp1y, cp2x, cp2y, x, y });
  }

  quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void {
    if (![cpx, cpy, x, y].every(Number.isFinite)) {
      return;
    }

    this.#commands.push({ type: "quadraticCurveTo", cpx, cpy, x, y });
  }

  rect(x: number, y: number, width: number, height: number): void {
    if (![x, y, width, height].every(Number.isFinite)) {
      return;
    }

    this.#commands.push({ type: "rect", x, y, width, height });
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
  readonly colorSpace = "srgb";

  constructor(data: Uint8ClampedArray, width: number, height: number) {
    assertNonNegativeInteger(width, "width");
    assertNonNegativeInteger(height, "height");

    if (data.length !== width * height * 4) {
      throw new Error("ImageData data length must match width * height * 4");
    }

    this.data = data;
    this.width = width;
    this.height = height;
  }
}

export abstract class Canvas2DRenderingContext implements Canvas2DContext {
  #fillStyle = "#000000";
  #fillColor: Rgba = [0, 0, 0, 255];
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
  strokeStyle = "#000000";
  fillRule: CanvasFillRule = "nonzero";
  font = "10px sans-serif";
  filter = "none";
  imageSmoothingEnabled = true;

  constructor(readonly canvas: Canvas) {}

  abstract getPixels(): Uint8ClampedArray;

  protected abstract fillRectPixels(x: number, y: number, width: number, height: number, color: Rgba): void;

  get fillStyle(): string {
    return this.#fillStyle;
  }

  set fillStyle(value: string) {
    const color = parseColor(String(value));

    if (!color) {
      return;
    }

    this.#fillStyle = color.serialized;
    this.#fillColor = color.rgba;
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

  save(): void {
    this.#stateStack.push({
      fillStyle: this.#fillStyle,
      fillColor: this.#fillColor,
      transform: this.#transform,
      strokeStyle: this.strokeStyle,
      fillRule: this.fillRule,
      globalAlpha: this.globalAlpha,
      lineWidth: this.lineWidth,
      lineCap: this.lineCap,
      lineJoin: this.lineJoin,
      miterLimit: this.miterLimit,
      globalCompositeOperation: this.globalCompositeOperation,
      font: this.font,
      filter: this.filter,
      lineDash: [...this.#lineDash],
      lineDashOffset: this.lineDashOffset
    });
  }

  restore(): void {
    const state = this.#stateStack.pop();

    if (!state) {
      return;
    }

    this.#fillStyle = state.fillStyle;
    this.#fillColor = state.fillColor;
    this.#transform = state.transform;
    this.strokeStyle = state.strokeStyle;
    this.fillRule = state.fillRule;
    this.globalAlpha = state.globalAlpha;
    this.lineWidth = state.lineWidth;
    this.lineCap = state.lineCap;
    this.lineJoin = state.lineJoin;
    this.miterLimit = state.miterLimit;
    this.globalCompositeOperation = state.globalCompositeOperation;
    this.font = state.font;
    this.filter = state.filter;
    this.#lineDash = [...state.lineDash];
    this.lineDashOffset = state.lineDashOffset;
  }

  clearRect(x: number, y: number, width: number, height: number): void {
    this.#clearTransformedRect(x, y, width, height);
  }

  fillRect(x: number, y: number, width: number, height: number): void {
    this.#fillTransformedRect(x, y, width, height, this.#effectiveFillColor());
  }

  fill(path: CanvasPath2D = this.#currentPath, _fillRule: CanvasFillRule = this.fillRule): void {
    for (const polygon of pathToPolygons(path, this.#transform)) {
      fillPolygon(
        this.getPixels(),
        this.canvas.width,
        this.canvas.height,
        polygon,
        this.#effectiveFillColor(),
        this.#globalCompositeOperation
      );
    }
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

  closePath(): void {
    this.#currentPath.closePath();
  }

  getImageData(sx: number, sy: number, sw: number, sh: number): CanvasImageData {
    const sourceX = toWebIDLLong(sx, "sx");
    const sourceY = toWebIDLLong(sy, "sy");
    const sourceWidth = toWebIDLLong(sw, "sw");
    const sourceHeight = toWebIDLLong(sh, "sh");

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

    return new CanvasImageData(data, width, height);
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

  clip(_path?: CanvasPath2D, _fillRule?: CanvasFillRule): void {
    // Clipping is not implemented yet; pdf.js calls this only for clipped paths.
  }

  #clearTransformedRect(x: number, y: number, width: number, height: number): void {
    if (![x, y, width, height].every(Number.isFinite)) {
      return;
    }

    if (isIdentityMatrix(this.#transform)) {
      this.fillRectPixels(x, y, width, height, TRANSPARENT_BLACK);
      return;
    }

    const path = new CanvasPath2D();
    path.rect(x, y, width, height);
    for (const polygon of pathToPolygons(path, this.#transform)) {
      clearPolygon(this.getPixels(), this.canvas.width, this.canvas.height, polygon);
    }
  }

  #fillTransformedRect(x: number, y: number, width: number, height: number, color: Rgba): void {
    if (![x, y, width, height].every(Number.isFinite)) {
      return;
    }

    if (isIdentityMatrix(this.#transform)) {
      this.#fillRectPixels(x, y, width, height, color);
      return;
    }

    const path = new CanvasPath2D();
    path.rect(x, y, width, height);
    for (const polygon of pathToPolygons(path, this.#transform)) {
      fillPolygon(this.getPixels(), this.canvas.width, this.canvas.height, polygon, color, this.#globalCompositeOperation);
    }
  }

  #fillRectPixels(x: number, y: number, width: number, height: number, color: Rgba): void {
    if (this.#globalCompositeOperation === "source-over" && color[3] === 255) {
      this.fillRectPixels(x, y, width, height, color);
      return;
    }

    const x2 = x + width;
    const y2 = y + height;
    const left = clamp(Math.trunc(Math.min(x, x2)), 0, this.canvas.width);
    const top = clamp(Math.trunc(Math.min(y, y2)), 0, this.canvas.height);
    const right = clamp(Math.trunc(Math.max(x, x2)), 0, this.canvas.width);
    const bottom = clamp(Math.trunc(Math.max(y, y2)), 0, this.canvas.height);
    const pixels = this.getPixels();

    for (let py = top; py < bottom; py += 1) {
      for (let px = left; px < right; px += 1) {
        compositePixel(pixels, (py * this.canvas.width + px) * 4, color, this.#globalCompositeOperation);
      }
    }
  }

  #effectiveFillColor(): Rgba {
    const alpha = this.#globalAlpha;

    if (alpha === 1) {
      return this.#fillColor;
    }

    return [this.#fillColor[0], this.#fillColor[1], this.#fillColor[2], Math.round(this.#fillColor[3] * alpha)];
  }
}

type Point = { readonly x: number; readonly y: number };

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
      const from = lastPoint ?? transformPoint(transform, 0, 0);
      const cp1 = transformPoint(transform, command.cp1x, command.cp1y);
      const cp2 = transformPoint(transform, command.cp2x, command.cp2y);
      const to = transformPoint(transform, command.x, command.y);
      appendCubicBezier(current, from, cp1, cp2, to);
      start ??= from;
      lastPoint = to;
      continue;
    }

    if (command.type === "quadraticCurveTo") {
      const from = lastPoint ?? transformPoint(transform, 0, 0);
      const cp = transformPoint(transform, command.cpx, command.cpy);
      const to = transformPoint(transform, command.x, command.y);
      appendQuadraticBezier(current, from, cp, to);
      start ??= from;
      lastPoint = to;
      continue;
    }

    if (command.type === "rect") {
      closeCurrent();
      const leftTop = transformPoint(transform, command.x, command.y);
      const rightTop = transformPoint(transform, command.x + command.width, command.y);
      const rightBottom = transformPoint(transform, command.x + command.width, command.y + command.height);
      const leftBottom = transformPoint(transform, command.x, command.y + command.height);
      polygons.push([leftTop, rightTop, rightBottom, leftBottom]);
      lastPoint = undefined;
      continue;
    }

    if (start) {
      current.push(start);
    }
    closeCurrent();
  }

  closeCurrent();
  return polygons;
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

function assertNonNegativeInteger(value: number, label: string): void {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error(`${label} must be a non-negative integer`);
  }
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

  const rgb = /^rgb\(\s*(-?\d{1,3})\s*,\s*(-?\d{1,3})\s*,\s*(-?\d{1,3})\s*\)$/.exec(normalized);
  if (rgb) {
    const rgba: Rgba = [
      clamp(Number(rgb[1]), 0, 255),
      clamp(Number(rgb[2]), 0, 255),
      clamp(Number(rgb[3]), 0, 255),
      255
    ];
    return { rgba, serialized: serializeColor(rgba) };
  }

  const rgba = /^rgba\(\s*(-?\d{1,3})\s*,\s*(-?\d{1,3})\s*,\s*(-?\d{1,3})\s*,\s*(\d*\.?\d+%?)\s*\)$/.exec(
    normalized
  );
  if (rgba) {
    const color: Rgba = [
      clamp(Number(rgba[1]), 0, 255),
      clamp(Number(rgba[2]), 0, 255),
      clamp(Number(rgba[3]), 0, 255),
      parseAlpha(rgba[4])
    ];
    return { rgba: color, serialized: serializeColor(color) };
  }

  return undefined;
}

function serializeColor(color: Rgba): string {
  if (color[3] === 255) {
    return `#${toHexByte(color[0])}${toHexByte(color[1])}${toHexByte(color[2])}`;
  }

  const alpha = Math.round((color[3] / 255) * 1000) / 1000;
  return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
}

function toHexByte(value: number): string {
  return value.toString(16).padStart(2, "0");
}

function parseAlpha(value: string): number {
  if (value.endsWith("%")) {
    return clamp(Math.round((Number(value.slice(0, -1)) / 100) * 255), 0, 255);
  }

  return clamp(Math.round(Number(value) * 255), 0, 255);
}

function createIndexSizeError(message: string): Error {
  if (typeof DOMException === "function") {
    return new DOMException(message, "IndexSizeError");
  }

  const error = new Error(message);
  error.name = "IndexSizeError";
  return error;
}

function toWebIDLLong(value: unknown, label: string): number {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    throw new TypeError(`${label} must be finite`);
  }

  return Math.trunc(number);
}
