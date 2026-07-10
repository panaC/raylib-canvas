import { afterEach, describe, expect, it } from "vitest";
import { PNG } from "pngjs";
import { createCanvas, createRaylibCanvas2DContextFactory } from "../../src/index";

const USE_RAYLIB_CONTEXT = process.env.RAYLIB_CANVAS_CONTEXT === "raylib";
const disposableContexts: Array<{ dispose(): void }> = [];

async function createTestCanvas(width: number, height: number): Promise<Awaited<ReturnType<typeof createCanvas>>> {
  const createContext = USE_RAYLIB_CONTEXT ? await createRaylibCanvas2DContextFactory() : undefined;

  return createCanvas(
    width,
    height,
    createContext
      ? {
          context(canvas) {
            const context = createContext(canvas);
            disposableContexts.push(context as { dispose(): void });
            return context;
          }
        }
      : {}
  );
}

afterEach(() => {
  for (const context of disposableContexts.splice(0)) {
    context.dispose();
  }
});

type TestCanvas = Awaited<ReturnType<typeof createTestCanvas>>;
type TestContext = NonNullable<ReturnType<TestCanvas["getContext"]>>;

function toBlob(canvas: TestCanvas, type = "image/png"): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type));
}

function pixelAt(ctx: TestContext, x: number, y: number): number[] {
  return Array.from(ctx.getImageData(x, y, 1, 1).data);
}

describe("createCanvas", () => {
  it("renders a rectangle and generates a PNG blob", async () => {
    const canvas = await createTestCanvas(16, 12);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#FF0000";
    ctx.fillRect(2, 3, 4, 5);

    const blob = await toBlob(canvas);
    const bytes = new Uint8Array(await blob!.arrayBuffer());

    expect(canvas.width).toBe(16);
    expect(canvas.height).toBe(12);
    expect(blob?.type).toBe("image/png");
    expect([...bytes.subarray(0, 8)]).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
  });

  it("returns one bound 2d context and null for unsupported context ids", async () => {
    const canvas = await createTestCanvas(10, 10);
    const ctx = canvas.getContext("2d");

    expect(ctx).not.toBeNull();
    expect(ctx.canvas).toBe(canvas);
    expect(canvas.getContext("2d")).toBe(ctx);
    expect(canvas.getContext("webgl")).toBeNull();
    expect(canvas.getContext("2D")).toBeNull();
  });

  it("serializes supported fillStyle colors and ignores invalid assignments", async () => {
    const canvas = await createTestCanvas(4, 4);
    const ctx = canvas.getContext("2d");

    expect(ctx.fillStyle).toBe("#000000");

    ctx.fillStyle = "red";
    expect(ctx.fillStyle).toBe("#ff0000");

    ctx.fillStyle = "#0F0";
    expect(ctx.fillStyle).toBe("#00ff00");

    ctx.fillStyle = "not-a-css-color";
    expect(ctx.fillStyle).toBe("#00ff00");

    ctx.fillRect(0, 0, 1, 1);
    expect(pixelAt(ctx, 0, 0)).toEqual([0, 255, 0, 255]);
  });

  it("validates globalAlpha assignments", async () => {
    const canvas = await createTestCanvas(2, 2);
    const ctx = canvas.getContext("2d");

    expect(ctx.globalAlpha).toBe(1);

    ctx.globalAlpha = 0.5;
    expect(ctx.globalAlpha).toBe(0.5);

    ctx.globalAlpha = Number.POSITIVE_INFINITY;
    ctx.globalAlpha = Number.NEGATIVE_INFINITY;
    ctx.globalAlpha = Number.NaN;
    ctx.globalAlpha = 1.1;
    ctx.globalAlpha = -0.1;
    expect(ctx.globalAlpha).toBe(0.5);

    ctx.globalAlpha = 0;
    expect(ctx.globalAlpha).toBe(0);

    ctx.globalAlpha = 1;
    expect(ctx.globalAlpha).toBe(1);
  });

  it("validates globalCompositeOperation assignments", async () => {
    const canvas = await createTestCanvas(2, 2);
    const ctx = canvas.getContext("2d");

    expect(ctx.globalCompositeOperation).toBe("source-over");

    ctx.globalCompositeOperation = "xor";
    expect(ctx.globalCompositeOperation).toBe("xor");

    ctx.globalCompositeOperation = "Source-over";
    ctx.globalCompositeOperation = "over";
    ctx.globalCompositeOperation = "darker";
    ctx.globalCompositeOperation = "source-over\0";
    ctx.globalCompositeOperation = "nonexistent";
    expect(ctx.globalCompositeOperation).toBe("xor");
  });

  it("validates line style assignments", async () => {
    const canvas = await createTestCanvas(2, 2);
    const ctx = canvas.getContext("2d");

    expect(ctx.lineWidth).toBe(1);
    expect(ctx.lineCap).toBe("butt");
    expect(ctx.lineJoin).toBe("miter");
    expect(ctx.miterLimit).toBe(10);
    expect(ctx.lineDashOffset).toBe(0);

    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "bevel";
    ctx.miterLimit = 7.5;
    ctx.lineDashOffset = -3;

    expect(ctx.lineWidth).toBe(2.5);
    expect(ctx.lineCap).toBe("round");
    expect(ctx.lineJoin).toBe("bevel");
    expect(ctx.miterLimit).toBe(7.5);
    expect(ctx.lineDashOffset).toBe(-3);

    ctx.lineWidth = 0;
    ctx.lineWidth = -1;
    ctx.lineWidth = Number.NaN;
    ctx.lineWidth = Number.POSITIVE_INFINITY;
    ctx.lineCap = "ROUND" as CanvasLineCap;
    ctx.lineCap = "invalid" as CanvasLineCap;
    ctx.lineJoin = "butt" as CanvasLineJoin;
    ctx.lineJoin = "invalid" as CanvasLineJoin;
    ctx.miterLimit = 0;
    ctx.miterLimit = -1;
    ctx.miterLimit = Number.NaN;
    ctx.miterLimit = Number.NEGATIVE_INFINITY;
    ctx.lineDashOffset = Number.NaN;
    ctx.lineDashOffset = Number.POSITIVE_INFINITY;

    expect(ctx.lineWidth).toBe(2.5);
    expect(ctx.lineCap).toBe("round");
    expect(ctx.lineJoin).toBe("bevel");
    expect(ctx.miterLimit).toBe(7.5);
    expect(ctx.lineDashOffset).toBe(-3);
  });

  it("normalizes and protects the line dash list", async () => {
    const canvas = await createTestCanvas(2, 2);
    const ctx = canvas.getContext("2d");

    expect(ctx.getLineDash()).toEqual([]);

    ctx.setLineDash([1, 2, 3]);
    expect(ctx.getLineDash()).toEqual([1, 2, 3, 1, 2, 3]);

    const dash = ctx.getLineDash();
    dash[0] = 99;
    expect(ctx.getLineDash()).toEqual([1, 2, 3, 1, 2, 3]);

    ctx.setLineDash([4, 0]);
    expect(ctx.getLineDash()).toEqual([4, 0]);

    ctx.setLineDash([5, Number.NaN]);
    ctx.setLineDash([5, Number.POSITIVE_INFINITY]);
    ctx.setLineDash([5, -1]);
    expect(ctx.getLineDash()).toEqual([4, 0]);

    ctx.setLineDash([]);
    expect(ctx.getLineDash()).toEqual([]);
  });

  it("saves and restores line style state", async () => {
    const canvas = await createTestCanvas(2, 2);
    const ctx = canvas.getContext("2d");

    ctx.lineWidth = 4;
    ctx.lineCap = "square";
    ctx.lineJoin = "round";
    ctx.miterLimit = 3;
    ctx.setLineDash([2, 1]);
    ctx.lineDashOffset = 5;
    ctx.save();

    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.lineJoin = "bevel";
    ctx.miterLimit = 9;
    ctx.setLineDash([7, 3]);
    ctx.lineDashOffset = -2;
    ctx.restore();

    expect(ctx.lineWidth).toBe(4);
    expect(ctx.lineCap).toBe("square");
    expect(ctx.lineJoin).toBe("round");
    expect(ctx.miterLimit).toBe(3);
    expect(ctx.getLineDash()).toEqual([2, 1]);
    expect(ctx.lineDashOffset).toBe(5);
  });

  it("exposes default text drawing styles", async () => {
    const canvas = await createTestCanvas(2, 2);
    const ctx = canvas.getContext("2d");

    expect(ctx.font).toBe("10px sans-serif");
    expect(ctx.textAlign).toBe("start");
    expect(ctx.textBaseline).toBe("alphabetic");
    expect(ctx.direction).toBe("inherit");
    expect(ctx.letterSpacing).toBe("0px");
    expect(ctx.wordSpacing).toBe("0px");
    expect(ctx.fontKerning).toBe("auto");
    expect(ctx.fontStretch).toBe("normal");
    expect(ctx.fontVariantCaps).toBe("normal");
    expect(ctx.textRendering).toBe("auto");
  });

  it("validates text alignment and direction assignments", async () => {
    const canvas = await createTestCanvas(2, 2);
    const ctx = canvas.getContext("2d");

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.direction = "rtl";

    expect(ctx.textAlign).toBe("center");
    expect(ctx.textBaseline).toBe("middle");
    expect(ctx.direction).toBe("rtl");

    ctx.textAlign = "CENTER" as typeof ctx.textAlign;
    ctx.textAlign = "invalid" as typeof ctx.textAlign;
    ctx.textBaseline = "baseline" as typeof ctx.textBaseline;
    ctx.textBaseline = "Middle" as typeof ctx.textBaseline;
    ctx.direction = "RTL" as typeof ctx.direction;
    ctx.direction = "invalid" as typeof ctx.direction;

    expect(ctx.textAlign).toBe("center");
    expect(ctx.textBaseline).toBe("middle");
    expect(ctx.direction).toBe("rtl");
  });

  it("validates font feature text style assignments", async () => {
    const canvas = await createTestCanvas(2, 2);
    const ctx = canvas.getContext("2d");

    ctx.fontKerning = "none";
    ctx.fontStretch = "expanded";
    ctx.fontVariantCaps = "small-caps";
    ctx.textRendering = "optimizeLegibility";

    expect(ctx.fontKerning).toBe("none");
    expect(ctx.fontStretch).toBe("expanded");
    expect(ctx.fontVariantCaps).toBe("small-caps");
    expect(ctx.textRendering).toBe("optimizeLegibility");

    ctx.fontKerning = "NONE" as typeof ctx.fontKerning;
    ctx.fontKerning = "invalid" as typeof ctx.fontKerning;
    ctx.fontStretch = "Expanded" as typeof ctx.fontStretch;
    ctx.fontStretch = "invalid" as typeof ctx.fontStretch;
    ctx.fontVariantCaps = "Small-Caps" as typeof ctx.fontVariantCaps;
    ctx.fontVariantCaps = "invalid" as typeof ctx.fontVariantCaps;
    ctx.textRendering = "optimizespeed" as typeof ctx.textRendering;
    ctx.textRendering = "invalid" as typeof ctx.textRendering;

    expect(ctx.fontKerning).toBe("none");
    expect(ctx.fontStretch).toBe("expanded");
    expect(ctx.fontVariantCaps).toBe("small-caps");
    expect(ctx.textRendering).toBe("optimizeLegibility");
  });

  it("parses and serializes supported font assignments", async () => {
    const canvas = await createTestCanvas(2, 2);
    const ctx = canvas.getContext("2d");

    ctx.font = "20px serif";
    expect(ctx.font).toBe("20px serif");

    ctx.font = "20PX   SERIF";
    expect(ctx.font).toBe("20px serif");

    ctx.font = "italic 400 12px/2 Unknown Font, sans-serif";
    expect(ctx.font).toBe('italic 12px "Unknown Font", sans-serif');

    ctx.font = "bold small-caps expanded 16pt 'Display Face'";
    expect(ctx.font).toBe('small-caps bold expanded 16pt "Display Face"');
  });

  it("ignores invalid font assignments", async () => {
    const canvas = await createTestCanvas(2, 2);
    const ctx = canvas.getContext("2d");

    ctx.font = "20px serif";

    for (const value of [
      "",
      "bogus",
      "inherit",
      "10px {bogus}",
      "10px initial",
      "10px default",
      "10px inherit",
      "10px revert",
      "var(--x)",
      "var(--x, 10px serif)",
      "1em serif; background: green; margin: 10px",
      "0px serif",
      "12px"
    ]) {
      ctx.font = value;
      expect(ctx.font).toBe("20px serif");
    }
  });

  it("parses text spacing as CSS lengths", async () => {
    const canvas = await createTestCanvas(2, 2);
    const ctx = canvas.getContext("2d");

    ctx.letterSpacing = "3px";
    ctx.wordSpacing = "5PX";
    expect(ctx.letterSpacing).toBe("3px");
    expect(ctx.wordSpacing).toBe("5px");

    ctx.letterSpacing = "-1px";
    ctx.wordSpacing = "0";
    expect(ctx.letterSpacing).toBe("-1px");
    expect(ctx.wordSpacing).toBe("0px");

    ctx.letterSpacing = "normal";
    ctx.letterSpacing = "calc(1px + 1px)";
    ctx.wordSpacing = "NaNpx";
    ctx.wordSpacing = "1%";

    expect(ctx.letterSpacing).toBe("-1px");
    expect(ctx.wordSpacing).toBe("0px");
  });

  it("saves and restores text drawing style state", async () => {
    const canvas = await createTestCanvas(2, 2);
    const ctx = canvas.getContext("2d");

    ctx.font = "italic 12px serif";
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    ctx.direction = "ltr";
    ctx.letterSpacing = "2px";
    ctx.wordSpacing = "4px";
    ctx.fontKerning = "none";
    ctx.fontStretch = "condensed";
    ctx.fontVariantCaps = "all-small-caps";
    ctx.textRendering = "geometricPrecision";
    ctx.save();

    ctx.font = "20px monospace";
    ctx.textAlign = "left";
    ctx.textBaseline = "bottom";
    ctx.direction = "rtl";
    ctx.letterSpacing = "8px";
    ctx.wordSpacing = "10px";
    ctx.fontKerning = "normal";
    ctx.fontStretch = "expanded";
    ctx.fontVariantCaps = "titling-caps";
    ctx.textRendering = "optimizeSpeed";
    ctx.restore();

    expect(ctx.font).toBe("italic 12px serif");
    expect(ctx.textAlign).toBe("right");
    expect(ctx.textBaseline).toBe("top");
    expect(ctx.direction).toBe("ltr");
    expect(ctx.letterSpacing).toBe("2px");
    expect(ctx.wordSpacing).toBe("4px");
    expect(ctx.fontKerning).toBe("none");
    expect(ctx.fontStretch).toBe("condensed");
    expect(ctx.fontVariantCaps).toBe("all-small-caps");
    expect(ctx.textRendering).toBe("geometricPrecision");
  });

  it("applies globalAlpha to filled rectangles", async () => {
    const canvas = await createTestCanvas(2, 2);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#00ff00";
    ctx.fillRect(0, 0, 2, 2);
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(0, 0, 1, 1);

    expect(pixelAt(ctx, 0, 0)).toEqual([128, 127, 0, 255]);
    expect(pixelAt(ctx, 1, 1)).toEqual([0, 255, 0, 255]);
  });

  it("combines globalAlpha with fillStyle alpha", async () => {
    const canvas = await createTestCanvas(1, 1);
    const ctx = canvas.getContext("2d");

    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
    ctx.fillRect(0, 0, 1, 1);

    expect(pixelAt(ctx, 0, 0)).toEqual([255, 0, 0, 64]);
  });

  it("saves and restores compositing state", async () => {
    const canvas = await createTestCanvas(1, 1);
    const ctx = canvas.getContext("2d");

    ctx.globalAlpha = 0.25;
    ctx.globalCompositeOperation = "copy";
    ctx.save();
    ctx.globalAlpha = 0.75;
    ctx.globalCompositeOperation = "xor";
    ctx.restore();

    expect(ctx.globalAlpha).toBe(0.25);
    expect(ctx.globalCompositeOperation).toBe("copy");
  });

  it("applies Porter-Duff globalCompositeOperation modes to filled rectangles", async () => {
    const cases: Array<{ readonly operation: string; readonly expected: number[] }> = [
      { operation: "clear", expected: [0, 0, 0, 0] },
      { operation: "copy", expected: [255, 0, 0, 255] },
      { operation: "source-over", expected: [255, 0, 0, 255] },
      { operation: "source-in", expected: [255, 0, 0, 255] },
      { operation: "source-out", expected: [0, 0, 0, 0] },
      { operation: "source-atop", expected: [255, 0, 0, 255] },
      { operation: "destination-over", expected: [0, 0, 255, 255] },
      { operation: "destination-in", expected: [0, 0, 255, 255] },
      { operation: "destination-out", expected: [0, 0, 0, 0] },
      { operation: "destination-atop", expected: [0, 0, 255, 255] },
      { operation: "lighter", expected: [255, 0, 255, 255] },
      { operation: "xor", expected: [0, 0, 0, 0] }
    ];

    for (const { operation, expected } of cases) {
      const canvas = await createTestCanvas(1, 1);
      const ctx = canvas.getContext("2d");

      ctx.fillStyle = "#0000ff";
      ctx.fillRect(0, 0, 1, 1);
      ctx.globalCompositeOperation = operation;
      ctx.fillStyle = "#ff0000";
      ctx.fillRect(0, 0, 1, 1);

      expect(pixelAt(ctx, 0, 0)).toEqual(expected);
    }
  });

  it("does not apply globalAlpha or globalCompositeOperation to clearRect", async () => {
    const canvas = await createTestCanvas(2, 2);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#ff0000";
    ctx.fillRect(0, 0, 2, 2);
    ctx.globalAlpha = 0;
    ctx.globalCompositeOperation = "destination-over";
    ctx.clearRect(0, 0, 1, 1);

    expect(pixelAt(ctx, 0, 0)).toEqual([0, 0, 0, 0]);
    expect(pixelAt(ctx, 1, 1)).toEqual([255, 0, 0, 255]);
  });

  it("encodes composited pixels into PNG output", async () => {
    const canvas = await createTestCanvas(1, 1);
    const ctx = canvas.getContext("2d");

    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(0, 0, 1, 1);

    const blob = await toBlob(canvas);
    const bytes = new Uint8Array(await blob!.arrayBuffer());
    const png = PNG.sync.read(Buffer.from(bytes));

    expect(Array.from(png.data)).toEqual([255, 0, 0, 128]);
  });

  it("draws negative rectangle dimensions in the opposite direction", async () => {
    const canvas = await createTestCanvas(6, 6);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "blue";
    ctx.fillRect(4, 4, -2, -3);

    expect(pixelAt(ctx, 2, 1)).toEqual([0, 0, 255, 255]);
    expect(pixelAt(ctx, 3, 3)).toEqual([0, 0, 255, 255]);
    expect(pixelAt(ctx, 4, 4)).toEqual([0, 0, 0, 0]);
  });

  it("clips filled rectangles to the canvas bounds", async () => {
    const canvas = await createTestCanvas(4, 4);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "red";
    ctx.fillRect(-1, -1, 3, 3);

    expect(pixelAt(ctx, 0, 0)).toEqual([255, 0, 0, 255]);
    expect(pixelAt(ctx, 1, 1)).toEqual([255, 0, 0, 255]);
    expect(pixelAt(ctx, 2, 2)).toEqual([0, 0, 0, 0]);
  });

  it("does not draw zero-sized filled rectangles", async () => {
    const canvas = await createTestCanvas(3, 3);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, 3, 3);
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 3, 0);
    ctx.fillRect(0, 0, 0, 3);
    ctx.fillRect(0, 0, 0, 0);

    expect(pixelAt(ctx, 1, 1)).toEqual([0, 128, 0, 255]);
  });

  it("ignores non-finite rectangle arguments", async () => {
    const canvas = await createTestCanvas(3, 3);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "red";
    ctx.fillRect(Number.NaN, 0, 1, 1);
    ctx.fillRect(0, 0, Number.POSITIVE_INFINITY, 1);

    expect(pixelAt(ctx, 0, 0)).toEqual([0, 0, 0, 0]);
  });

  it("clears negative rectangle dimensions in the opposite direction", async () => {
    const canvas = await createTestCanvas(5, 5);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 5, 5);
    ctx.clearRect(4, 4, -2, -3);

    expect(pixelAt(ctx, 2, 1)).toEqual([0, 0, 0, 0]);
    expect(pixelAt(ctx, 3, 3)).toEqual([0, 0, 0, 0]);
    expect(pixelAt(ctx, 4, 4)).toEqual([255, 0, 0, 255]);
  });

  it("does not clear zero-sized rectangles or non-finite rectangles", async () => {
    const canvas = await createTestCanvas(3, 3);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, 3, 3);
    ctx.clearRect(0, 0, 3, 0);
    ctx.clearRect(0, 0, 0, 3);
    ctx.clearRect(Number.NEGATIVE_INFINITY, 0, 3, 3);
    ctx.clearRect(0, 0, 3, Number.NaN);

    expect(pixelAt(ctx, 1, 1)).toEqual([0, 128, 0, 255]);
  });

  it("adds translation to the current transform", async () => {
    const canvas = await createTestCanvas(4, 4);
    const ctx = canvas.getContext("2d");

    ctx.translate(2, 3);
    const transform = ctx.getTransform();

    expect(transform.a).toBe(1);
    expect(transform.b).toBe(0);
    expect(transform.c).toBe(0);
    expect(transform.d).toBe(1);
    expect(transform.e).toBe(2);
    expect(transform.f).toBe(3);
  });

  it("returns an identity matrix for an untransformed context", async () => {
    const canvas = await createTestCanvas(4, 4);
    const ctx = canvas.getContext("2d");
    const transform = ctx.getTransform();

    expect(transform.a).toBe(1);
    expect(transform.b).toBe(0);
    expect(transform.c).toBe(0);
    expect(transform.d).toBe(1);
    expect(transform.e).toBe(0);
    expect(transform.f).toBe(0);
    expect(transform.is2D).toBe(true);
    expect(transform.isIdentity).toBe(true);
  });

  it("returns DOMMatrix-compatible aliases and array serialization", async () => {
    const canvas = await createTestCanvas(4, 4);
    const ctx = canvas.getContext("2d");

    ctx.transform(1, 2, 3, 4, 5, 6);
    const transform = ctx.getTransform();

    expect(transform.m11).toBe(1);
    expect(transform.m12).toBe(2);
    expect(transform.m21).toBe(3);
    expect(transform.m22).toBe(4);
    expect(transform.m41).toBe(5);
    expect(transform.m42).toBe(6);
    expect(Array.from(transform.toFloat32Array())).toEqual([1, 2, 0, 0, 3, 4, 0, 0, 0, 0, 1, 0, 5, 6, 0, 1]);
    expect(Array.from(transform.toFloat64Array())).toEqual([1, 2, 0, 0, 3, 4, 0, 0, 0, 0, 1, 0, 5, 6, 0, 1]);
    expect(transform.isIdentity).toBe(false);
  });

  it("returns a copy of the current transform", async () => {
    const canvas = await createTestCanvas(4, 4);
    const ctx = canvas.getContext("2d");

    ctx.translate(2, 3);
    const transform = ctx.getTransform();
    transform.e = 99;
    transform.m42 = 100;

    const nextTransform = ctx.getTransform();
    expect(nextTransform.e).toBe(2);
    expect(nextTransform.f).toBe(3);
  });

  it("post-multiplies translation with the existing transform", async () => {
    const canvas = await createTestCanvas(4, 4);
    const ctx = canvas.getContext("2d");

    ctx.scale(2, 3);
    ctx.translate(5, 7);
    const transform = ctx.getTransform();

    expect(transform.a).toBe(2);
    expect(transform.b).toBe(0);
    expect(transform.c).toBe(0);
    expect(transform.d).toBe(3);
    expect(transform.e).toBe(10);
    expect(transform.f).toBe(21);
  });

  it("ignores non-finite translation offsets", async () => {
    const canvas = await createTestCanvas(4, 4);
    const ctx = canvas.getContext("2d");

    ctx.translate(2, 3);
    ctx.translate(Number.NaN, 1);
    ctx.translate(1, Number.POSITIVE_INFINITY);
    const transform = ctx.getTransform();

    expect(transform.a).toBe(1);
    expect(transform.b).toBe(0);
    expect(transform.c).toBe(0);
    expect(transform.d).toBe(1);
    expect(transform.e).toBe(2);
    expect(transform.f).toBe(3);
  });

  it("applies translation to filled rectangle rendering", async () => {
    const canvas = await createTestCanvas(6, 6);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "red";
    ctx.translate(2, 3);
    ctx.fillRect(1, 1, 2, 2);

    expect(pixelAt(ctx, 2, 3)).toEqual([0, 0, 0, 0]);
    expect(pixelAt(ctx, 3, 4)).toEqual([255, 0, 0, 255]);
    expect(pixelAt(ctx, 4, 5)).toEqual([255, 0, 0, 255]);
    expect(pixelAt(ctx, 5, 5)).toEqual([0, 0, 0, 0]);
  });

  it("adds an arbitrary matrix to the current transform", async () => {
    const canvas = await createTestCanvas(4, 4);
    const ctx = canvas.getContext("2d");

    ctx.transform(1, 2, 3, 4, 5, 6);
    const transform = ctx.getTransform();

    expect(transform.a).toBe(1);
    expect(transform.b).toBe(2);
    expect(transform.c).toBe(3);
    expect(transform.d).toBe(4);
    expect(transform.e).toBe(5);
    expect(transform.f).toBe(6);
  });

  it("post-multiplies arbitrary matrices with the existing transform", async () => {
    const canvas = await createTestCanvas(4, 4);
    const ctx = canvas.getContext("2d");

    ctx.transform(1, 2, 3, 4, 5, 6);
    ctx.transform(-2, 1, 1.5, -0.5, 1, -2);
    const transform = ctx.getTransform();

    expect(transform.a).toBe(1);
    expect(transform.b).toBe(0);
    expect(transform.c).toBe(0);
    expect(transform.d).toBe(1);
    expect(transform.e).toBe(0);
    expect(transform.f).toBe(0);
  });

  it("ignores non-finite transform matrix components", async () => {
    const canvas = await createTestCanvas(4, 4);
    const ctx = canvas.getContext("2d");

    ctx.translate(2, 3);
    ctx.transform(Number.NaN, 1, 0, 1, 0, 0);
    ctx.transform(1, 0, Number.POSITIVE_INFINITY, 1, 0, 0);
    ctx.transform(1, 0, 0, 1, 0, Number.NEGATIVE_INFINITY);
    const transform = ctx.getTransform();

    expect(transform.a).toBe(1);
    expect(transform.b).toBe(0);
    expect(transform.c).toBe(0);
    expect(transform.d).toBe(1);
    expect(transform.e).toBe(2);
    expect(transform.f).toBe(3);
  });

  it("applies skewed transforms to filled rectangle rendering", async () => {
    const canvas = await createTestCanvas(7, 7);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "red";
    ctx.transform(1, 0, 1, 1, 1, 1);
    ctx.fillRect(1, 1, 2, 2);

    expect(pixelAt(ctx, 2, 2)).toEqual([0, 0, 0, 0]);
    expect(pixelAt(ctx, 3, 2)).toEqual([255, 0, 0, 255]);
    expect(pixelAt(ctx, 4, 3)).toEqual([255, 0, 0, 255]);
    expect(pixelAt(ctx, 5, 3)).toEqual([255, 0, 0, 255]);
    expect(pixelAt(ctx, 6, 4)).toEqual([0, 0, 0, 0]);
  });

  it("saves and restores the current transform", async () => {
    const canvas = await createTestCanvas(4, 4);
    const ctx = canvas.getContext("2d");

    ctx.transform(1, 2, 3, 4, 5, 6);
    ctx.save();
    ctx.translate(10, 20);
    ctx.restore();
    const transform = ctx.getTransform();

    expect(transform.a).toBe(1);
    expect(transform.b).toBe(2);
    expect(transform.c).toBe(3);
    expect(transform.d).toBe(4);
    expect(transform.e).toBe(5);
    expect(transform.f).toBe(6);
  });

  it("replaces the current transform with setTransform", async () => {
    const canvas = await createTestCanvas(4, 4);
    const ctx = canvas.getContext("2d");

    ctx.translate(10, 20);
    ctx.setTransform(1, 2, 3, 4, 5, 6);
    const transform = ctx.getTransform();

    expect(transform.a).toBe(1);
    expect(transform.b).toBe(2);
    expect(transform.c).toBe(3);
    expect(transform.d).toBe(4);
    expect(transform.e).toBe(5);
    expect(transform.f).toBe(6);
  });

  it("resets the current transform when setTransform has no arguments", async () => {
    const canvas = await createTestCanvas(4, 4);
    const ctx = canvas.getContext("2d");

    ctx.setTransform(2, 0, 0, 3, 4, 5);
    ctx.setTransform();
    const transform = ctx.getTransform();

    expect(transform.a).toBe(1);
    expect(transform.b).toBe(0);
    expect(transform.c).toBe(0);
    expect(transform.d).toBe(1);
    expect(transform.e).toBe(0);
    expect(transform.f).toBe(0);
  });

  it("throws when setTransform has missing numeric arguments", async () => {
    const canvas = await createTestCanvas(4, 4);
    const ctx = canvas.getContext("2d");
    const setTransform = ctx.setTransform as (...args: number[]) => void;

    expect(() => setTransform.call(ctx, 1)).toThrow(TypeError);
    expect(() => setTransform.call(ctx, 1, 0)).toThrow(TypeError);
    expect(() => setTransform.call(ctx, 1, 0, 0)).toThrow(TypeError);
    expect(() => setTransform.call(ctx, 1, 0, 0, 1)).toThrow(TypeError);
    expect(() => setTransform.call(ctx, 1, 0, 0, 1, 0)).toThrow(TypeError);
  });

  it("ignores non-finite setTransform matrix components", async () => {
    const canvas = await createTestCanvas(4, 4);
    const ctx = canvas.getContext("2d");

    ctx.translate(2, 3);
    ctx.setTransform(Number.NaN, 1, 0, 1, 0, 0);
    ctx.setTransform(1, 0, Number.POSITIVE_INFINITY, 1, 0, 0);
    ctx.setTransform(1, 0, 0, 1, 0, Number.NEGATIVE_INFINITY);
    const transform = ctx.getTransform();

    expect(transform.a).toBe(1);
    expect(transform.b).toBe(0);
    expect(transform.c).toBe(0);
    expect(transform.d).toBe(1);
    expect(transform.e).toBe(2);
    expect(transform.f).toBe(3);
  });

  it("applies setTransform to filled rectangle rendering", async () => {
    const canvas = await createTestCanvas(7, 7);
    const ctx = canvas.getContext("2d");

    ctx.translate(4, 4);
    ctx.setTransform(1, 0, 1, 1, 1, 1);
    ctx.fillStyle = "red";
    ctx.fillRect(1, 1, 2, 2);

    expect(pixelAt(ctx, 2, 2)).toEqual([0, 0, 0, 0]);
    expect(pixelAt(ctx, 3, 2)).toEqual([255, 0, 0, 255]);
    expect(pixelAt(ctx, 4, 3)).toEqual([255, 0, 0, 255]);
    expect(pixelAt(ctx, 5, 3)).toEqual([255, 0, 0, 255]);
    expect(pixelAt(ctx, 6, 4)).toEqual([0, 0, 0, 0]);
  });

  it("resets the current transform to identity", async () => {
    const canvas = await createTestCanvas(4, 4);
    const ctx = canvas.getContext("2d");

    ctx.transform(1, 2, 3, 4, 5, 6);
    ctx.resetTransform();
    const transform = ctx.getTransform();

    expect(transform.a).toBe(1);
    expect(transform.b).toBe(0);
    expect(transform.c).toBe(0);
    expect(transform.d).toBe(1);
    expect(transform.e).toBe(0);
    expect(transform.f).toBe(0);
  });

  it("applies untransformed rendering after resetTransform", async () => {
    const canvas = await createTestCanvas(6, 6);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "blue";
    ctx.translate(3, 3);
    ctx.fillRect(0, 0, 2, 2);
    ctx.resetTransform();
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 2, 2);

    expect(pixelAt(ctx, 0, 0)).toEqual([255, 0, 0, 255]);
    expect(pixelAt(ctx, 1, 1)).toEqual([255, 0, 0, 255]);
    expect(pixelAt(ctx, 3, 3)).toEqual([0, 0, 255, 255]);
    expect(pixelAt(ctx, 5, 5)).toEqual([0, 0, 0, 0]);
  });

  it("keeps resetTransform idempotent", async () => {
    const canvas = await createTestCanvas(4, 4);
    const ctx = canvas.getContext("2d");

    ctx.resetTransform();
    ctx.resetTransform();
    const transform = ctx.getTransform();

    expect(transform.isIdentity).toBe(true);
    expect(Array.from(transform.toFloat32Array())).toEqual([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  });

  it("restores a saved transform after resetTransform", async () => {
    const canvas = await createTestCanvas(4, 4);
    const ctx = canvas.getContext("2d");

    ctx.translate(2, 3);
    ctx.save();
    ctx.resetTransform();
    ctx.restore();
    const transform = ctx.getTransform();

    expect(transform.a).toBe(1);
    expect(transform.b).toBe(0);
    expect(transform.c).toBe(0);
    expect(transform.d).toBe(1);
    expect(transform.e).toBe(2);
    expect(transform.f).toBe(3);
  });

  it("adds rotation to the current transform", async () => {
    const canvas = await createTestCanvas(4, 4);
    const ctx = canvas.getContext("2d");

    ctx.rotate(Math.PI / 2);
    const transform = ctx.getTransform();

    expect(transform.a).toBeCloseTo(0);
    expect(transform.b).toBeCloseTo(1);
    expect(transform.c).toBeCloseTo(-1);
    expect(transform.d).toBeCloseTo(0);
    expect(transform.e).toBe(0);
    expect(transform.f).toBe(0);
  });

  it("post-multiplies rotation with the existing transform", async () => {
    const canvas = await createTestCanvas(4, 4);
    const ctx = canvas.getContext("2d");

    ctx.translate(5, 7);
    ctx.rotate(Math.PI / 2);
    const transform = ctx.getTransform();

    expect(transform.a).toBeCloseTo(0);
    expect(transform.b).toBeCloseTo(1);
    expect(transform.c).toBeCloseTo(-1);
    expect(transform.d).toBeCloseTo(0);
    expect(transform.e).toBe(5);
    expect(transform.f).toBe(7);
  });

  it("ignores non-finite rotation angles", async () => {
    const canvas = await createTestCanvas(4, 4);
    const ctx = canvas.getContext("2d");

    ctx.translate(2, 3);
    ctx.rotate(Number.NaN);
    ctx.rotate(Number.POSITIVE_INFINITY);
    const transform = ctx.getTransform();

    expect(transform.a).toBe(1);
    expect(transform.b).toBe(0);
    expect(transform.c).toBe(0);
    expect(transform.d).toBe(1);
    expect(transform.e).toBe(2);
    expect(transform.f).toBe(3);
  });

  it("applies rotation to filled rectangle rendering", async () => {
    const canvas = await createTestCanvas(6, 6);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "red";
    ctx.translate(3, 1);
    ctx.rotate(Math.PI / 2);
    ctx.fillRect(0, 0, 2, 2);

    expect(pixelAt(ctx, 1, 1)).toEqual([255, 0, 0, 255]);
    expect(pixelAt(ctx, 2, 2)).toEqual([255, 0, 0, 255]);
    expect(pixelAt(ctx, 3, 1)).toEqual([0, 0, 0, 0]);
    expect(pixelAt(ctx, 1, 3)).toEqual([0, 0, 0, 0]);
  });

  it("clears pixels to transparent black", async () => {
    const canvas = await createTestCanvas(4, 4);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 4, 4);
    ctx.clearRect(1, 1, 2, 2);

    expect(pixelAt(ctx, 0, 0)).toEqual([255, 0, 0, 255]);
    expect(pixelAt(ctx, 1, 1)).toEqual([0, 0, 0, 0]);
    expect(pixelAt(ctx, 2, 2)).toEqual([0, 0, 0, 0]);
  });

  it("adds scale factors to the current transform", async () => {
    const canvas = await createTestCanvas(4, 4);
    const ctx = canvas.getContext("2d");

    ctx.scale(2, 3);
    const transform = ctx.getTransform();

    expect(transform.a).toBe(2);
    expect(transform.b).toBe(0);
    expect(transform.c).toBe(0);
    expect(transform.d).toBe(3);
    expect(transform.e).toBe(0);
    expect(transform.f).toBe(0);
  });

  it("post-multiplies scale with the existing transform", async () => {
    const canvas = await createTestCanvas(4, 4);
    const ctx = canvas.getContext("2d");

    ctx.translate(5, 7);
    ctx.scale(2, 3);
    const transform = ctx.getTransform();

    expect(transform.a).toBe(2);
    expect(transform.d).toBe(3);
    expect(transform.e).toBe(5);
    expect(transform.f).toBe(7);
  });

  it("ignores non-finite scale factors", async () => {
    const canvas = await createTestCanvas(4, 4);
    const ctx = canvas.getContext("2d");

    ctx.translate(2, 3);
    ctx.scale(Number.NaN, 1);
    ctx.scale(1, Number.POSITIVE_INFINITY);
    const transform = ctx.getTransform();

    expect(transform.a).toBe(1);
    expect(transform.d).toBe(1);
    expect(transform.e).toBe(2);
    expect(transform.f).toBe(3);
  });

  it("applies scale to filled rectangle rendering", async () => {
    const canvas = await createTestCanvas(8, 8);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "red";
    ctx.scale(2, 3);
    ctx.fillRect(1, 1, 2, 1);

    expect(pixelAt(ctx, 1, 3)).toEqual([0, 0, 0, 0]);
    expect(pixelAt(ctx, 2, 3)).toEqual([255, 0, 0, 255]);
    expect(pixelAt(ctx, 5, 5)).toEqual([255, 0, 0, 255]);
    expect(pixelAt(ctx, 6, 5)).toEqual([0, 0, 0, 0]);
  });

  it("clips cleared rectangles to the canvas bounds", async () => {
    const canvas = await createTestCanvas(4, 4);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 4, 4);
    ctx.clearRect(-1, -1, 3, 3);

    expect(pixelAt(ctx, 0, 0)).toEqual([0, 0, 0, 0]);
    expect(pixelAt(ctx, 1, 1)).toEqual([0, 0, 0, 0]);
    expect(pixelAt(ctx, 2, 2)).toEqual([255, 0, 0, 255]);
  });

  it("copies image data and treats out-of-bounds pixels as transparent black", async () => {
    const canvas = await createTestCanvas(2, 2);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "rgb(255, 0, 0)";
    ctx.fillRect(0, 0, 1, 1);

    const imageData = ctx.getImageData(-1, -1, 3, 3);
    expect(imageData.width).toBe(3);
    expect(imageData.height).toBe(3);
    expect(Array.from(imageData.data.slice(0, 4))).toEqual([0, 0, 0, 0]);
    expect(Array.from(imageData.data.slice(16, 20))).toEqual([255, 0, 0, 255]);

    imageData.data[16] = 0;
    expect(pixelAt(ctx, 0, 0)).toEqual([255, 0, 0, 255]);
  });

  it("copies image data with negative source dimensions from top-left to bottom-right", async () => {
    const canvas = await createTestCanvas(10, 5);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 10, 5);
    ctx.fillStyle = "white";
    ctx.fillRect(2, 1, 6, 1);

    const imageData = ctx.getImageData(8, 3, -2, -2);
    expect(imageData.width).toBe(2);
    expect(imageData.height).toBe(2);
    expect(Array.from(imageData.data.slice(0, 4))).toEqual([255, 255, 255, 255]);
    expect(Array.from(imageData.data.slice(imageData.data.length - 4))).toEqual([0, 0, 0, 255]);

    const outOfBounds = ctx.getImageData(0, 0, -1, -1);
    expect(Array.from(outOfBounds.data)).toEqual([0, 0, 0, 0]);
  });

  it("throws IndexSizeError for zero-sized image data reads", async () => {
    const canvas = await createTestCanvas(2, 2);
    const ctx = canvas.getContext("2d");

    expect(() => ctx.getImageData(0, 0, 0, 1)).toThrow(/source width or height/i);
    expect(() => ctx.getImageData(0, 0, 1, 0)).toThrow(/source width or height/i);
  });

  it("falls back to PNG for unsupported serialization MIME types", async () => {
    const canvas = await createTestCanvas(2, 2);

    const blob = await toBlob(canvas, "image/jpeg");
    const bytes = new Uint8Array(await blob!.arrayBuffer());
    const dataUrl = canvas.toDataURL("image/jpeg");

    expect(blob?.type).toBe("image/png");
    expect([...bytes.subarray(0, 8)]).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
    expect(dataUrl).toMatch(/^data:image\/png;base64,/);
    expect(dataUrl).toContain("iVBORw0KGgo");
  });

  it.runIf(USE_RAYLIB_CONTEXT)("returns a live mutable pixel view from the raylib context", async () => {
    const createContext = await createRaylibCanvas2DContextFactory();
    const canvas = await createCanvas(2, 2, {
      context(canvas) {
        const context = createContext(canvas);
        disposableContexts.push(context as { dispose(): void });
        return context;
      }
    });
    const context = canvas.getContext("2d");
    const pixels = context.getPixels();

    pixels[0] = 12;
    pixels[1] = 34;
    pixels[2] = 56;
    pixels[3] = 78;

    expect(Array.from(context.getPixels().slice(0, 4))).toEqual([12, 34, 56, 78]);
  });
});
