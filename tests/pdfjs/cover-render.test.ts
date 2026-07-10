import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { beforeAll, describe, expect, it } from "vitest";
import { PNG } from "pngjs";
import {
  Canvas,
  CanvasPath2D,
  RaylibCanvasRenderer,
  loadRaylibCanvasModule,
  type Canvas2DContext,
  type RaylibCanvasWasmModule
} from "../../src/index";

const TEST_DIR = dirname(fileURLToPath(import.meta.url));
const PDF_FIXTURE_PATH = join(TEST_DIR, "compressed.tracemonkey-pldi-09.pdf");

type CanvasAndContext = {
  canvas: Canvas | null;
  context: Canvas2DContext | null;
  renderer: RaylibCanvasRenderer | null;
};

const USE_RAYLIB_RENDERER = process.env.RAYLIB_CANVAS_RENDERER === "raylib";
const COVER_PNG_PATH = join(
  TEST_DIR,
  USE_RAYLIB_RENDERER ? "compressed.tracemonkey-pldi-09-cover-raylib.png" : "compressed.tracemonkey-pldi-09-cover.png"
);
let raylibModule: RaylibCanvasWasmModule | undefined;

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

function createCanvasAndContext(width: number, height: number): CanvasAndContext {
  const canvasWidth = Math.ceil(width);
  const canvasHeight = Math.ceil(height);
  const renderer = createRenderer(canvasWidth, canvasHeight);
  const canvas = new Canvas(canvasWidth, canvasHeight, renderer ? { renderer } : {});

  return {
    canvas,
    context: canvas.getContext("2d"),
    renderer
  };
}

function createRenderer(width: number, height: number): RaylibCanvasRenderer | undefined {
  if (!USE_RAYLIB_RENDERER) {
    return undefined;
  }

  if (!raylibModule) {
    throw new Error("raylib module was not loaded before creating a pdf.js canvas");
  }

  return new RaylibCanvasRenderer(width, height, raylibModule);
}

class RaylibCanvasFactory {
  create(width: number, height: number): CanvasAndContext {
    return createCanvasAndContext(width, height);
  }

  reset(canvasAndContext: CanvasAndContext, width: number, height: number): void {
    canvasAndContext.renderer?.dispose();
    const reset = createCanvasAndContext(width, height);
    canvasAndContext.canvas = reset.canvas;
    canvasAndContext.context = reset.context;
    canvasAndContext.renderer = reset.renderer;
  }

  destroy(canvasAndContext: CanvasAndContext): void {
    canvasAndContext.renderer?.dispose();
    canvasAndContext.canvas = null;
    canvasAndContext.context = null;
    canvasAndContext.renderer = null;
  }
}

describe("pdfjs-dist cover rendering", () => {
  beforeAll(async () => {
    if (USE_RAYLIB_RENDERER) {
      raylibModule = await loadRaylibCanvasModule();
    }
  });

  it("extracts the first fixture PDF page to a PNG using the selected canvas backend", async () => {
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
      const canvasAndContext = createCanvasAndContext(viewport.width, viewport.height);

      await page.render({
        canvasContext: canvasAndContext.context as unknown as CanvasRenderingContext2D,
        viewport
      }).promise;

      const pngBytes = await toPngBytes(canvasAndContext.canvas!);
      canvasAndContext.renderer?.dispose();
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
