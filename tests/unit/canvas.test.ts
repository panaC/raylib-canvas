import { afterEach, describe, expect, it } from "vitest";
import { createCanvas, createRaylibCanvasRenderer } from "../../src/index";

const USE_RAYLIB_RENDERER = process.env.RAYLIB_CANVAS_RENDERER === "raylib";
const disposableRenderers: Array<{ dispose(): void }> = [];

async function createTestCanvas(width: number, height: number): Promise<Awaited<ReturnType<typeof createCanvas>>> {
  const renderer = USE_RAYLIB_RENDERER ? await createRaylibCanvasRenderer(width, height) : undefined;

  if (renderer) {
    disposableRenderers.push(renderer);
  }

  return createCanvas(width, height, renderer ? { renderer } : {});
}

afterEach(() => {
  for (const renderer of disposableRenderers.splice(0)) {
    renderer.dispose();
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

  it("ignores non-finite rectangle arguments", async () => {
    const canvas = await createTestCanvas(3, 3);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "red";
    ctx.fillRect(Number.NaN, 0, 1, 1);
    ctx.fillRect(0, 0, Number.POSITIVE_INFINITY, 1);

    expect(pixelAt(ctx, 0, 0)).toEqual([0, 0, 0, 0]);
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

    expect(blob?.type).toBe("image/png");
    expect([...bytes.subarray(0, 8)]).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
    expect(canvas.toDataURL("image/jpeg")).toMatch(/^data:image\/png;base64,/);
  });

  it.runIf(USE_RAYLIB_RENDERER)("returns a live mutable pixel view from the raylib renderer", async () => {
    const renderer = await createRaylibCanvasRenderer(2, 2);
    disposableRenderers.push(renderer);
    const pixels = renderer.getPixels();

    pixels[0] = 12;
    pixels[1] = 34;
    pixels[2] = 56;
    pixels[3] = 78;

    expect(Array.from(renderer.getPixels().slice(0, 4))).toEqual([12, 34, 56, 78]);
  });
});
