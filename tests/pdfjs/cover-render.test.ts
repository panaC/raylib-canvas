import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { PNG } from "pngjs";
import { Canvas, CanvasPath2D, type Canvas2DContext } from "../../src/index";

const TEST_DIR = dirname(fileURLToPath(import.meta.url));
const PDF_FIXTURE_PATH = join(TEST_DIR, "compressed.tracemonkey-pldi-09.pdf");
const COVER_PNG_PATH = join(TEST_DIR, "compressed.tracemonkey-pldi-09-cover.png");

type CanvasAndContext = {
  canvas: Canvas | null;
  context: Canvas2DContext | null;
};

function toPngBytes(canvas: Canvas): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(async (blob) => {
      if (!blob) {
        reject(new Error("Expected a PNG blob"));
        return;
      }

      resolve(new Uint8Array(await blob.arrayBuffer()));
    }, "image/png");
  });
}

function countNonWhitePixels(png: PNG): number {
  let pixels = 0;

  for (let offset = 0; offset < png.data.length; offset += 4) {
    const red = png.data[offset];
    const green = png.data[offset + 1];
    const blue = png.data[offset + 2];
    const alpha = png.data[offset + 3];

    if (alpha !== 0 && (red !== 255 || green !== 255 || blue !== 255)) {
      pixels += 1;
    }
  }

  return pixels;
}

class RaylibCanvasFactory {
  create(width: number, height: number): CanvasAndContext {
    const canvas = new Canvas(Math.ceil(width), Math.ceil(height));
    return {
      canvas,
      context: canvas.getContext("2d")
    };
  }

  reset(canvasAndContext: CanvasAndContext, width: number, height: number): void {
    const canvas = new Canvas(Math.ceil(width), Math.ceil(height));
    canvasAndContext.canvas = canvas;
    canvasAndContext.context = canvas.getContext("2d");
  }

  destroy(canvasAndContext: CanvasAndContext): void {
    canvasAndContext.canvas = null;
    canvasAndContext.context = null;
  }
}

describe("pdfjs-dist cover rendering", () => {
  it("extracts the first fixture PDF page to a PNG using the stub canvas", async () => {
    const globals = globalThis as typeof globalThis & { Path2D?: unknown };
    const previousPath2D = globals.Path2D;
    globals.Path2D = CanvasPath2D;

    const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
    globals.Path2D = CanvasPath2D;

    const loadingTask = pdfjs.getDocument({
      data: new Uint8Array(await readFile(PDF_FIXTURE_PATH)),
      CanvasFactory: RaylibCanvasFactory,
      disableFontFace: true,
      useWorkerFetch: false
    });

    try {
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1 });
      const canvas = new Canvas(Math.ceil(viewport.width), Math.ceil(viewport.height));

      await page.render({
        canvasContext: canvas.getContext("2d") as unknown as CanvasRenderingContext2D,
        viewport
      }).promise;

      const pngBytes = await toPngBytes(canvas);
      await writeFile(COVER_PNG_PATH, pngBytes);
      const png = PNG.sync.read(Buffer.from(pngBytes));

      expect([...pngBytes.subarray(0, 8)]).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
      expect(png.width).toBe(612);
      expect(png.height).toBe(792);
      expect(countNonWhitePixels(png)).toBeGreaterThan(1_000);
    } finally {
      await loadingTask.destroy();

      if (previousPath2D === undefined) {
        delete globals.Path2D;
      } else {
        globals.Path2D = previousPath2D;
      }
    }
  });
});
