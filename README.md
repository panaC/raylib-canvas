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

The raylib backend is available as an opt-in WASM renderer. The public canvas
facade stays the same: create the raylib renderer, pass it through the existing
renderer injection option, and keep using the 2D context API normally.

```ts
import { createCanvas, createRaylibCanvasRenderer } from "raylib-canvas";

const renderer = await createRaylibCanvasRenderer(800, 450);
const canvas = await createCanvas(800, 450, { renderer });
```

Initialize the pinned raylib checkout, then build the WASM module with
Emscripten before using the default raylib loader. The default path builds
inside a Debian Docker container and writes the WASM artifacts back to
`dist/native`:

```sh
npm run init:raylib
npm run build:raylib-wasm
```

If you already have Emscripten available on your host `PATH`, you can use the
same compiler flags without Docker:

```sh
npm run build:raylib-wasm:native
```

The backend vendors raylib 6.0 under `vendor/raylib`, pinned to tag `6.0`
at commit `dbc56a87da87d973a9c5baa4e7438a9d20121d28`. The C bridge is
compiled with raylib's `PLATFORM_MEMORY` and `GRAPHICS_API_OPENGL_SOFTWARE`
flags and exposes the live RGBA pixel buffer expected by `CanvasRenderer`.

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
| `npm run init:raylib` | Clones raylib 6.0 into ignored `vendor/raylib` for the optional WASM backend. |
| `npm run test:unit` | Fast Vitest coverage for API behavior and PNG encoding. |
| `npm run test:pdfjs` | Renders a real PDF page through `pdfjs-dist` and this canvas implementation. |
| `npm run test:wpt` | Runs the current green upstream Canvas WPT smoke suite through the browser shim. |
| `npm run test:e2e` | Runs the browser demo with Playwright and samples rendered pixels. |
| `npm run build:raylib-wasm` | Builds the optional raylib WASM backend in a Debian Emscripten Docker container. |
| `npm run build:raylib-wasm:docker` | Same Docker build path as `build:raylib-wasm`. |
| `npm run build:raylib-wasm:native` | Builds the same WASM artifacts with a host Emscripten install on `PATH`. |
| `npm run test:raylib` | Builds and runs the raylib unit, pdf.js, and WPT smoke lanes. |
| `npm run test:unit:raylib` | Runs unit tests through the opt-in raylib renderer. |
| `npm run test:pdfjs:raylib` | Renders the pdf.js fixture through the opt-in raylib renderer. |
| `npm run test:wpt:raylib` | Runs the WPT smoke suite with the raylib WASM preload. |
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

The pdf.js integration test renders page 1 of [tests/pdfjs/compressed.tracemonkey-pldi-09.pdf](tests/pdfjs/compressed.tracemonkey-pldi-09.pdf) through `pdfjs-dist`, using this package as the canvas factory. The JavaScript renderer writes [tests/pdfjs/compressed.tracemonkey-pldi-09-cover.png](tests/pdfjs/compressed.tracemonkey-pldi-09-cover.png), and the raylib WASM renderer writes [tests/pdfjs/compressed.tracemonkey-pldi-09-cover-raylib.png](tests/pdfjs/compressed.tracemonkey-pldi-09-cover-raylib.png). Each lane asserts:

- PNG signature is valid.
- Image size is `612x792`.
- Rendered output contains more than 1,000 non-white pixels.

| JavaScript renderer | raylib WASM renderer |
| --- | --- |
| ![pdf.js cover rendered through the JavaScript renderer](tests/pdfjs/compressed.tracemonkey-pldi-09-cover.png) | ![pdf.js cover rendered through the raylib WASM renderer](tests/pdfjs/compressed.tracemonkey-pldi-09-cover-raylib.png) |
