# Canvas WPT Compatibility

This package runs official HTML Canvas web-platform-tests instead of maintaining
a translated Vitest copy of WPT assertions.

The WPT checkout is pinned to:

```text
web-platform-tests/wpt@e3cad70090774540f1e8ee0137b3d1310a86dd8b
```

Prepare the local WPT checkout with:

```sh
npm run wpt:setup
```

Run the current green official smoke suite with:

```sh
npm run test:wpt
```

`test:wpt` builds `test-results/wpt/raylib-canvas-wpt-shim.js` and injects it
with WPT's `--inject-script` option. The runner passes `--yes` so WPT can
install missing browser-driver components without an interactive prompt. The
shim patches browser
`HTMLCanvasElement` methods so the upstream `.html` test pages exercise this
package's `Canvas` implementation.

The optional raylib WASM backend can run the same smoke manifest with:

```sh
npm run build:raylib-wasm
npm run test:wpt:raylib
```

For that lane, `build:raylib-wasm` uses the Debian Emscripten Docker build by
default and emits both the normal Emscripten module and a single-file WPT
preload. Users with a host Emscripten install can run
`npm run build:raylib-wasm:native` to produce the same artifacts without
Docker. `build-wpt-shim` prepends the preload to the injected shim when
`RAYLIB_CANVAS_CONTEXT=raylib`, so WPT pages receive a ready
`__raylibCanvasWasmModule` before any patched canvas context is created.

The smoke suite is listed in `tests/wpt/canvas-smoke-tests.txt`. It currently
covers official upstream files for:

- canvas context existence and context sharing
- `fillRect()` basic, negative-size, zero-size, and non-finite drawing
- `clearRect()` basic, negative-size, zero-size, non-finite clearing, and
  immunity from `globalAlpha`/`globalCompositeOperation`
- `globalAlpha` defaults, invalid/range assignment behavior, and filled
  rectangle rendering
- `globalCompositeOperation` defaults, accepted core operation strings,
  invalid assignment behavior, and solid filled rectangle rendering for core
  Porter-Duff modes plus `lighter` and `clear`
- `fillStyle` hex parsing and invalid-name retention
- `strokeStyle` default state, plus unit coverage for supported color parsing
  and invalid assignment retention
- `CanvasGradient` constructor exposure, object return shape, color-stop
  validation, non-finite linear gradient validation, negative radial radius
  validation, and unit coverage for linear/radial/conic rectangle rendering
- canvas-backed `CanvasPattern` creation, invalid repetition errors, and unit
  coverage for repeat and no-repeat painting; image-backed patterns remain
  partial until broader CanvasImageSource support lands
- shadow offset, blur, and color default/valid/invalid assignment behavior,
  plus smoke/unit coverage for simple shadow rendering; blurred shadow raster
  fidelity remains partial
- `filter` default, valid `blur()` state, invalid assignment retention,
  save/restore behavior, and unit coverage for `opacity()` drawing; full filter
  rendering remains partial
- `strokeRect()` basic, non-finite, and current-path isolation behavior
- path construction smoke coverage for `beginPath()`, empty `closePath()`,
  `moveTo()`, `lineTo()`, `quadraticCurveTo()`, `bezierCurveTo()`, `rect()`,
  `arc()` negative-radius validation, `arcTo()` negative-radius validation,
  and `roundRect()` no-radius/negative-radius behavior
- `fill()` current-path rendering and `evenodd` winding behavior for simple
  multi-subpath fills; broad path pixel-accuracy, clipping, hit testing, and
  exact stroke joins remain partial
- `stroke()` software path stroking is covered by unit tests for basic paths,
  transforms, line width, and dashes; full anti-aliasing, exact joins, and broad
  path edge cases remain partial
- `strokeText()` has deterministic fallback glyph-outline unit coverage; real
  font shaping and text metrics remain partial
- `measureText()` has empty-string WPT coverage and deterministic fallback
  metrics in unit tests; real font loading, shaping, and browser-exact
  `TextMetrics` values remain partial
- `drawImage()` has unit coverage for canvas sources, 3/5/9 argument overloads,
  source cropping, transforms, alpha, compositing, and nearest-neighbor
  smoothing. Broader WPT coverage remains blocked on host image sources such as
  `ImageBitmap`, `HTMLImageElement`, and decoded image resources
- line style defaults and valid/invalid assignment behavior for `lineWidth`,
  `lineCap`, `lineJoin`, and `miterLimit`
- line dash state behavior is covered by unit tests; the current upstream
  `setLineDash()` WPT also requires `strokeRect()` rendering, which is not part
  of the smoke suite yet
- text style defaults and valid/invalid assignment behavior for `textAlign`,
  `textBaseline`, `direction`, `fontStretch`, `fontVariantCaps`, and
  `textRendering`
- basic `font` parsing/default/invalid-retention behavior; full CSS font
  shorthand computation and system font support remain partial
- `letterSpacing` and `wordSpacing` absolute length parsing plus invalid and
  non-finite assignment behavior
- `fontKerning` state behavior is covered by unit tests; the current upstream
  `fontKerning` WPT also requires `measureText()` metrics, which are not part
  of the smoke suite yet
- `getImageData()` basic reads, out-of-bounds transparent pixels, zero-size
  errors, negative-size reads, and non-finite argument errors
- `createImageData()` basic two-argument and clone creation, transparent
  initial data, negative dimensions, and `srgb` settings behavior
- `putImageData()` basic writes, dirty-rectangle clipping, zero dirty
  rectangles, out-of-bounds clipping, and unit coverage that transforms,
  global alpha, and compositing are ignored
- `imageSmoothingEnabled` and `imageSmoothingQuality` default, assignment, and
  save/restore behavior; quality is stored as a hint, while rendering currently
  switches between nearest-neighbor and bilinear smoothing
- `getTransform()` identity, scale, rotate, translate, reset, and DOMMatrix
  array serialization
- `resetTransform()` matrix reset through `getTransform()` coverage
- `scale()` basic, large, repeated, negative, zero, and non-finite transforms
- `rotate()` direction, radians, wraparound, zero, and non-finite transforms
- `setTransform()` replacement, no-argument reset, skewed, and non-finite
  transforms
- `transform()` identity, matrix multiplication, skewed, and non-finite
  transforms
- `translate()` basic and non-finite transforms

Run the full upstream Canvas tree with:

```sh
npm run wpt:full
```

The full run is expected to report failures until the remaining Canvas 2D
surface is implemented. It is not part of `npm test` yet.

Inspect official WPT status with:

```sh
npm run wpt:progress
npm run wpt:progress -- --json
```

`wpt:progress` counts the upstream `html/canvas` denominator and summarizes the
latest smoke/full WPT reports under `test-results/wpt/`. Capability bucket rules
for not-yet-supported WPT areas live in `tests/wpt/progress-manifest.json`.

WPT runner environment overrides:

- `WPT_ROOT` changes the checkout path, defaulting to `.wpt-upstream`.
- `WPT_BROWSER` changes the WPT product, defaulting to `chrome`.
- `WPT_BINARY` points WPT at a specific browser binary. If omitted for
  `chrome`/`chromium`, the runner uses Playwright's installed Chromium when
  available.
- `WPT_WEBDRIVER_BINARY` points WPT at a specific WebDriver binary.
- `WPT_CHANNEL` forwards a browser release channel such as `stable` to WPT.
- `WPT_INSTALL_BROWSER=1` asks WPT to install the browser for the run.
- `WPT_INSTALL_WEBDRIVER=1` asks WPT to install a matching WebDriver for the
  run.
- `PYTHON` changes the Python executable used to launch WPT.
