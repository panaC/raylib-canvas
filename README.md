# raylib-canvas

Canvas-like 2D API with pluggable renderers, currently backed by a small JavaScript software rasterizer.

## Goal

`raylib-canvas` is an incremental Canvas 2D implementation for environments where the public API should feel close to web Canvas, while the actual pixels can be produced by different renderer backends.

The current package is deliberately small: it grows by adding narrow, tested Canvas API slices, then checking them against unit tests, browser-facing integration tests, selected upstream WPT files, and real consumers such as `pdfjs-dist`.

The long-term direction is:

- keep the public facade close to the web Canvas API;
- keep renderer details behind the `CanvasRenderer` interface;
- support the JavaScript renderer first for correctness and portability;
- add a raylib-oriented renderer backend next without changing user-facing canvas code.

## Quickstart

From this checkout:

```sh
npm install
npm run build
```

```js
import { createCanvas } from "raylib-canvas";

const canvas = await createCanvas(800, 450);
const ctx = canvas.getContext("2d");

ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, 800, 450);

ctx.fillStyle = "#ff0000";
ctx.fillRect(100, 100, 200, 80);

canvas.toBlob((blob) => {
  if (!blob) {
    throw new Error("Could not encode canvas");
  }

  // Use the image/png Blob in Node, a browser, or a test harness.
}, "image/png");
```

Run the browser demo:

```sh
npm run demo:build
npm run demo:serve
```

The demo is served at `http://127.0.0.1:4173/examples/basic.html`.

## Current Canvas Surface

The implemented API is intentionally partial. The current public surface includes:

- `createCanvas(width, height)`;
- `new Canvas(width, height)`;
- `canvas.width`, `canvas.height`, `canvas.getContext("2d")`;
- `canvas.toBlob(callback, "image/png")` and `canvas.toDataURL("image/png")`;
- `ctx.canvas`, `ctx.fillStyle`, `ctx.globalAlpha`, `ctx.save()`, `ctx.restore()`;
- `ctx.fillRect()`, `ctx.clearRect()`, `ctx.getImageData()`;
- basic path drawing through `beginPath()`, `moveTo()`, `lineTo()`, `rect()`, `closePath()`, and `fill()`;
- basic transforms through `transform()`, `setTransform()`, `resetTransform()`, `getTransform()`, `scale()`, and `translate()`;
- `CanvasPath2D`, `CanvasImageData`, and `CanvasTransformMatrix` helpers used by tests and the pdf.js harness.

See [docs/API_MATRIX.md](docs/API_MATRIX.md) for the broader Canvas 2D API checklist.

## Backend Renderers

### JavaScript renderer

The default backend is `SoftwareCanvasRenderer`, also exported as `Javascript2DContextCanvasRenderer`. It owns an RGBA `Uint8ClampedArray`, rasterizes the currently supported primitives in JavaScript, and is used by the unit, WPT, e2e, and pdf.js tests.

PNG output is handled by `pngjs` behind the injectable `PngEncoder` interface.

### Renderer injection

Custom renderers can be injected without changing the public canvas facade:

```ts
import { createCanvas, type CanvasRenderer } from "raylib-canvas";

const renderer: CanvasRenderer = {
  width: 800,
  height: 450,
  fillRect(x, y, width, height, color) {
    // Forward drawing work to another renderer.
  },
  getPixels() {
    // Return RGBA pixels for PNG encoding and getImageData().
    return new Uint8ClampedArray(800 * 450 * 4);
  }
};

const canvas = await createCanvas(800, 450, { renderer });
```

### raylib renderer

The raylib backend is incoming. The intended shape is to keep `createCanvas()` and the 2D context API stable while swapping the software renderer for a raylib-oriented implementation, likely through a native, WASM, or process-backed bridge.

## Tests

```sh
npm run build
npm run test:unit
npm run test:pdfjs
npm run test:wpt
npm run test:e2e
```

Or run the full checked suite:

```sh
npm test
```

Test scripts:

| Command | Purpose |
| --- | --- |
| `npm run test:unit` | Fast Vitest coverage for API behavior and PNG encoding. |
| `npm run test:pdfjs` | Renders a real PDF page through `pdfjs-dist` and this canvas implementation. |
| `npm run test:wpt` | Runs the current green upstream Canvas WPT smoke suite through the browser shim. |
| `npm run test:e2e` | Runs the browser demo with Playwright and samples rendered pixels. |
| `npm run wpt:setup` | Fetches the pinned upstream WPT checkout. |
| `npm run wpt:full` | Runs the full upstream `html/canvas` WPT tree. Failures are expected until more Canvas 2D APIs land. |
| `npm run wpt:progress` | Summarizes WPT coverage from reports under `test-results/wpt/`. |

WPT details, including the pinned upstream commit and smoke-suite scope, live in [docs/WPT_COMPATIBILITY.md](docs/WPT_COMPATIBILITY.md).

## Current Test Snapshot

Latest checked WPT smoke report: [test-results/wpt/smoke-report.json](test-results/wpt/smoke-report.json)

- 12 official upstream HTML Canvas files executed.
- 12 files reported expected results.
- 0 unexpected files.
- 0 unexpected subtests/results.
- Covered areas: context creation/sharing, `fillRect()`, `clearRect()`, `fillStyle`, and `getImageData()`.

The pdf.js integration test renders page 1 of [tests/pdfjs/compressed.tracemonkey-pldi-09.pdf](tests/pdfjs/compressed.tracemonkey-pldi-09.pdf) through `pdfjs-dist`, using this package as the canvas factory. The generated cover image is written to [tests/pdfjs/compressed.tracemonkey-pldi-09-cover.png](tests/pdfjs/compressed.tracemonkey-pldi-09-cover.png), and the test asserts:

- PNG signature is valid.
- Image size is `612x792`.
- Rendered output contains more than 1,000 non-white pixels.

![pdf.js cover rendered through raylib-canvas](tests/pdfjs/compressed.tracemonkey-pldi-09-cover.png)
