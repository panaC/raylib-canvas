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

The smoke suite is listed in `tests/wpt/canvas-smoke-tests.txt`. It currently
covers official upstream files for:

- canvas context existence and context sharing
- `fillRect()` basic and negative-size drawing
- `clearRect()` basic and negative-size clearing
- `fillStyle` hex parsing and invalid-name retention
- `getImageData()` basic reads, out-of-bounds transparent pixels, zero-size
  errors, and non-finite argument errors

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
- `PYTHON` changes the Python executable used to launch WPT.
