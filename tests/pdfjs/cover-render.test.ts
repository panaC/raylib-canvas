import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { performance } from "node:perf_hooks";
import { dirname, extname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";
import { beforeAll, describe, expect, it } from "vitest";
import { PNG } from "pngjs";
import {
  Canvas,
  CanvasPath2D,
  RaylibCanvas2DContext,
  loadRaylibCanvasModule,
  type Canvas2DContext,
  type RaylibCanvasWasmModule
} from "../../src/index";

const TEST_DIR = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(TEST_DIR, "..", "..");
const PDF_FIXTURE_PATH = join(TEST_DIR, "compressed.tracemonkey-pldi-09.pdf");
const PERFORMANCE_RESULT_PATH = join(PROJECT_ROOT, "test-results", "pdfjs", "cover-render-performance.json");

type CanvasAndContext = {
  canvas: Canvas | null;
  context: Canvas2DContext | null;
  raylibContext: RaylibCanvas2DContext | null;
};

const USE_RAYLIB_CONTEXT = process.env.RAYLIB_CANVAS_CONTEXT === "raylib";
const CONTEXT_NAME = USE_RAYLIB_CONTEXT ? "raylib WASM context" : "JavaScript context";
const COVER_PNG_PATH = join(
  TEST_DIR,
  USE_RAYLIB_CONTEXT ? "compressed.tracemonkey-pldi-09-cover-raylib.png" : "compressed.tracemonkey-pldi-09-cover.png"
);
const NATIVE_DOM_COVER_PNG_PATH = join(TEST_DIR, "compressed.tracemonkey-pldi-09-cover-native.png");
let raylibModule: RaylibCanvasWasmModule | undefined;

type CoverRenderTiming = {
  context: string;
  coverPng: string;
  width: number;
  height: number;
  nonWhitePixels: number;
  timingsMs: {
    pdfLoad: number;
    pageLoad: number;
    render: number;
    pngEncode: number;
    pngWrite: number;
    total: number;
  };
  updatedAt: string;
};

type CoverRenderPerformanceReport = {
  fixture: string;
  scale: number;
  results: Record<string, CoverRenderTiming>;
};

type StaticServer = {
  origin: string;
  close: () => Promise<void>;
};

type NativeDomCoverRender = {
  width: number;
  height: number;
  pngBytes: number[];
  timingsMs: {
    pdfLoad: number;
    pageLoad: number;
    render: number;
    pngEncode: number;
    totalBeforePngWrite: number;
  };
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

function roundTiming(milliseconds: number): number {
  return Number(milliseconds.toFixed(2));
}

function contentTypeForPath(path: string): string {
  switch (extname(path)) {
    case ".mjs":
    case ".js":
      return "text/javascript; charset=utf-8";
    case ".pdf":
      return "application/pdf";
    case ".wasm":
      return "application/wasm";
    case ".png":
      return "image/png";
    case ".html":
      return "text/html; charset=utf-8";
    default:
      return "application/octet-stream";
  }
}

async function startStaticServer(root: string): Promise<StaticServer> {
  const rootPath = resolve(root);
  const server = createServer(async (request, response) => {
    try {
      const url = new URL(request.url ?? "/", "http://127.0.0.1");
      const pathname = decodeURIComponent(url.pathname);

      if (pathname === "/") {
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        response.end("<!doctype html><title>pdfjs native DOM canvas test</title>");
        return;
      }

      const filePath = resolve(rootPath, `.${pathname}`);

      if (filePath !== rootPath && !filePath.startsWith(`${rootPath}${sep}`)) {
        response.writeHead(403);
        response.end("Forbidden");
        return;
      }

      const body = await readFile(filePath);
      response.writeHead(200, { "Content-Type": contentTypeForPath(filePath) });
      response.end(body);
    } catch {
      response.writeHead(404);
      response.end("Not found");
    }
  });

  await new Promise<void>((resolveListen) => server.listen(0, "127.0.0.1", resolveListen));
  const address = server.address();

  if (!address || typeof address === "string") {
    throw new Error("Expected a TCP address for the PDF static server");
  }

  return {
    origin: `http://127.0.0.1:${address.port}`,
    close: () =>
      new Promise<void>((resolveClose, rejectClose) => {
        server.close((error?: Error) => {
          if (error) {
            rejectClose(error);
            return;
          }

          resolveClose();
        });
      })
  };
}

async function writePerformanceResult(result: CoverRenderTiming): Promise<void> {
  await mkdir(dirname(PERFORMANCE_RESULT_PATH), { recursive: true });

  let report: CoverRenderPerformanceReport = {
    fixture: "tests/pdfjs/compressed.tracemonkey-pldi-09.pdf",
    scale: 1,
    results: {}
  };

  try {
    report = JSON.parse(await readFile(PERFORMANCE_RESULT_PATH, "utf8")) as CoverRenderPerformanceReport;
  } catch {
    // The report is optional generated test output.
  }

  report.fixture = "tests/pdfjs/compressed.tracemonkey-pldi-09.pdf";
  report.scale = 1;
  report.results[result.context] = result;

  await writeFile(PERFORMANCE_RESULT_PATH, `${JSON.stringify(report, null, 2)}\n`);
}

function createCanvasAndContext(width: number, height: number): CanvasAndContext {
  const canvasWidth = Math.ceil(width);
  const canvasHeight = Math.ceil(height);
  const canvas = new Canvas(
    canvasWidth,
    canvasHeight,
    USE_RAYLIB_CONTEXT ? { context: createRaylibContext } : {}
  );
  const context = canvas.getContext("2d");

  return {
    canvas,
    context,
    raylibContext: context instanceof RaylibCanvas2DContext ? context : null
  };
}

function createRaylibContext(canvas: Canvas): RaylibCanvas2DContext {
  if (!raylibModule) {
    throw new Error("raylib module was not loaded before creating a pdf.js canvas");
  }

  return new RaylibCanvas2DContext(canvas, raylibModule);
}

class RaylibCanvasFactory {
  create(width: number, height: number): CanvasAndContext {
    return createCanvasAndContext(width, height);
  }

  reset(canvasAndContext: CanvasAndContext, width: number, height: number): void {
    canvasAndContext.raylibContext?.dispose();
    const reset = createCanvasAndContext(width, height);
    canvasAndContext.canvas = reset.canvas;
    canvasAndContext.context = reset.context;
    canvasAndContext.raylibContext = reset.raylibContext;
  }

  destroy(canvasAndContext: CanvasAndContext): void {
    canvasAndContext.raylibContext?.dispose();
    canvasAndContext.canvas = null;
    canvasAndContext.context = null;
    canvasAndContext.raylibContext = null;
  }
}

describe("pdfjs-dist cover rendering", () => {
  beforeAll(async () => {
    if (USE_RAYLIB_CONTEXT) {
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
      const totalStart = performance.now();
      const pdfLoadStart = performance.now();
      const pdf = await loadingTask.promise;
      const pdfLoadEnd = performance.now();
      const pageLoadStart = performance.now();
      const page = await pdf.getPage(1);
      const pageLoadEnd = performance.now();
      const viewport = page.getViewport({ scale: 1 });
      const canvasAndContext = createCanvasAndContext(viewport.width, viewport.height);

      const renderStart = performance.now();
      await page.render({
        canvasContext: canvasAndContext.context as unknown as CanvasRenderingContext2D,
        viewport
      }).promise;
      const renderEnd = performance.now();

      const pngEncodeStart = performance.now();
      const pngBytes = await toPngBytes(canvasAndContext.canvas!);
      const pngEncodeEnd = performance.now();
      canvasAndContext.raylibContext?.dispose();
      const pngWriteStart = performance.now();
      await writeFile(COVER_PNG_PATH, pngBytes);
      const pngWriteEnd = performance.now();
      const png = PNG.sync.read(Buffer.from(pngBytes));
      const nonWhitePixels = countNonWhitePixels(png);
      const totalEnd = performance.now();

      expect([...pngBytes.subarray(0, 8)]).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
      expect(png.width).toBe(612);
      expect(png.height).toBe(792);
      expect(nonWhitePixels).toBeGreaterThan(1_000);

      await writePerformanceResult({
        context: CONTEXT_NAME,
        coverPng: USE_RAYLIB_CONTEXT
          ? "tests/pdfjs/compressed.tracemonkey-pldi-09-cover-raylib.png"
          : "tests/pdfjs/compressed.tracemonkey-pldi-09-cover.png",
        width: png.width,
        height: png.height,
        nonWhitePixels,
        timingsMs: {
          pdfLoad: roundTiming(pdfLoadEnd - pdfLoadStart),
          pageLoad: roundTiming(pageLoadEnd - pageLoadStart),
          render: roundTiming(renderEnd - renderStart),
          pngEncode: roundTiming(pngEncodeEnd - pngEncodeStart),
          pngWrite: roundTiming(pngWriteEnd - pngWriteStart),
          total: roundTiming(totalEnd - totalStart)
        },
        updatedAt: new Date().toISOString()
      });
    } finally {
      await loadingTask.destroy();

      if (previousPath2D === undefined) {
        delete globals.Path2D;
      } else {
        globals.Path2D = previousPath2D;
      }
    }
  });

  it.runIf(!USE_RAYLIB_CONTEXT)(
    "extracts the first fixture PDF page to a PNG using native DOM canvas",
    async () => {
      const server = await startStaticServer(PROJECT_ROOT);
      const browser = await chromium.launch({ headless: true });

      try {
        const browserPage = await browser.newPage();
        await browserPage.goto(server.origin);

        const nativeResult = await browserPage.evaluate<NativeDomCoverRender, { pdfUrl: string; pdfjsUrl: string; workerUrl: string }>(
          async ({ pdfUrl, pdfjsUrl, workerUrl }) => {
            const pdfjs = await new Function("url", "return import(url)")(pdfjsUrl);
            pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

            const totalStart = globalThis.performance.now();
            const pdfBytes = new Uint8Array(await (await fetch(pdfUrl)).arrayBuffer());
            const pdfLoadStart = globalThis.performance.now();
            const loadingTask = pdfjs.getDocument({
              data: pdfBytes,
              disableFontFace: true,
              useWorkerFetch: false
            });

            try {
              const pdf = await loadingTask.promise;
              const pdfLoadEnd = globalThis.performance.now();
              const pageLoadStart = globalThis.performance.now();
              const pdfPage = await pdf.getPage(1);
              const pageLoadEnd = globalThis.performance.now();
              const viewport = pdfPage.getViewport({ scale: 1 });
              const canvas = document.createElement("canvas");
              canvas.width = Math.ceil(viewport.width);
              canvas.height = Math.ceil(viewport.height);
              const context = canvas.getContext("2d");

              if (!context) {
                throw new Error("Expected a native 2D canvas context");
              }

              const renderStart = globalThis.performance.now();
              await pdfPage.render({ canvasContext: context, viewport }).promise;
              const renderEnd = globalThis.performance.now();
              const pngEncodeStart = globalThis.performance.now();
              const blob = await new Promise<Blob>((resolveBlob, rejectBlob) => {
                canvas.toBlob((encodedBlob) => {
                  if (!encodedBlob) {
                    rejectBlob(new Error("Expected native DOM canvas to encode a PNG blob"));
                    return;
                  }

                  resolveBlob(encodedBlob);
                }, "image/png");
              });
              const pngBytes = Array.from(new Uint8Array(await blob.arrayBuffer()));
              const pngEncodeEnd = globalThis.performance.now();

              return {
                width: canvas.width,
                height: canvas.height,
                pngBytes,
                timingsMs: {
                  pdfLoad: pdfLoadEnd - pdfLoadStart,
                  pageLoad: pageLoadEnd - pageLoadStart,
                  render: renderEnd - renderStart,
                  pngEncode: pngEncodeEnd - pngEncodeStart,
                  totalBeforePngWrite: pngEncodeEnd - totalStart
                }
              };
            } finally {
              await loadingTask.destroy();
            }
          },
          {
            pdfUrl: `${server.origin}/tests/pdfjs/compressed.tracemonkey-pldi-09.pdf`,
            pdfjsUrl: `${server.origin}/node_modules/pdfjs-dist/legacy/build/pdf.mjs`,
            workerUrl: `${server.origin}/node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs`
          }
        );

        const pngBytes = Uint8Array.from(nativeResult.pngBytes);
        const pngWriteStart = performance.now();
        await writeFile(NATIVE_DOM_COVER_PNG_PATH, pngBytes);
        const pngWriteEnd = performance.now();
        const png = PNG.sync.read(Buffer.from(pngBytes));
        const nonWhitePixels = countNonWhitePixels(png);

        expect([...pngBytes.subarray(0, 8)]).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
        expect(nativeResult.width).toBe(612);
        expect(nativeResult.height).toBe(792);
        expect(png.width).toBe(612);
        expect(png.height).toBe(792);
        expect(nonWhitePixels).toBeGreaterThan(1_000);

        const pngWrite = pngWriteEnd - pngWriteStart;
        await writePerformanceResult({
          context: "native DOM canvas",
          coverPng: "tests/pdfjs/compressed.tracemonkey-pldi-09-cover-native.png",
          width: png.width,
          height: png.height,
          nonWhitePixels,
          timingsMs: {
            pdfLoad: roundTiming(nativeResult.timingsMs.pdfLoad),
            pageLoad: roundTiming(nativeResult.timingsMs.pageLoad),
            render: roundTiming(nativeResult.timingsMs.render),
            pngEncode: roundTiming(nativeResult.timingsMs.pngEncode),
            pngWrite: roundTiming(pngWrite),
            total: roundTiming(nativeResult.timingsMs.totalBeforePngWrite + pngWrite)
          },
          updatedAt: new Date().toISOString()
        });
      } finally {
        await browser.close();
        await server.close();
      }
    }
  );
});
