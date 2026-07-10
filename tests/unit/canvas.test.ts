import { afterEach, describe, expect, it } from "vitest";
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
