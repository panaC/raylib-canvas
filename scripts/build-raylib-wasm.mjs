import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const esmOutput = "dist/native/raylib-canvas.js";
const wptOutput = "dist/native/raylib-canvas-wpt.js";
const raylibSourceCwd = "vendor/raylib/src";
const esmOutputFromRaylibSource = "../../../dist/native/raylib-canvas.js";
const wptOutputFromRaylibSource = "../../../dist/native/raylib-canvas-wpt.js";
const exportedFunctions = [
  "_rcl_init",
  "_rcl_destroy",
  "_rcl_fill_rect",
  "_rcl_clear_rect",
  "_rcl_pixels_ptr",
  "_rcl_pixels_len",
  "_rcl_raylib_version_major"
];

const emccCheck = spawnSync("emcc", ["--version"], { stdio: "ignore", shell: false });

if (emccCheck.error) {
  throw new Error(
    [
      "Emscripten compiler `emcc` was not found on PATH.",
      "Install or activate Emscripten, then rerun `npm run build:raylib-wasm`."
    ].join("\n")
  );
}

if (!existsSync(raylibSourceCwd)) {
  throw new Error(
    [
      `raylib sources were not found at ${raylibSourceCwd}.`,
      "Run `npm run init:raylib` to clone the pinned raylib tag before building the WASM backend."
    ].join("\n")
  );
}

mkdirSync(dirname(esmOutput), { recursive: true });

const sharedArgs = [
  "../../../native/raylib-canvas/raylib_canvas.c",
  "rcore.c",
  "rtextures.c",
  "-I.",
  "-std=c99",
  "-O3",
  "--no-entry",
  "-U_WIN32",
  "-U_WIN64",
  "-U_MSC_VER",
  "-D_POSIX_C_SOURCE=199309L",
  "-DPLATFORM_MEMORY",
  "-DGRAPHICS_API_OPENGL_SOFTWARE",
  "-DEXTERNAL_CONFIG_FLAGS",
  "-DSUPPORT_MODULE_RSHAPES=0",
  "-DSUPPORT_MODULE_RTEXTURES=1",
  "-DSUPPORT_MODULE_RTEXT=0",
  "-DSUPPORT_MODULE_RMODELS=0",
  "-DSUPPORT_MODULE_RAUDIO=0",
  "-DSUPPORT_TRACELOG=0",
  "-DSUPPORT_CAMERA_SYSTEM=0",
  "-DSUPPORT_GESTURES_SYSTEM=0",
  "-DSUPPORT_RPRAND_GENERATOR=0",
  "-DSUPPORT_MOUSE_GESTURES=0",
  "-DSUPPORT_SCREEN_CAPTURE=0",
  "-DSUPPORT_COMPRESSION_API=0",
  "-DSUPPORT_AUTOMATION_EVENTS=0",
  "-sALLOW_MEMORY_GROWTH=1",
  "-sWASM=1",
  "-sFILESYSTEM=0",
  `-sEXPORTED_FUNCTIONS=${JSON.stringify(exportedFunctions)}`,
  "-sEXPORTED_RUNTIME_METHODS=[]"
];

execFileSync(
  "emcc",
  [
    ...sharedArgs,
    "-o",
    esmOutputFromRaylibSource,
    "-sMODULARIZE=1",
    "-sEXPORT_ES6=1",
    "-sENVIRONMENT=web,node"
  ],
  { cwd: raylibSourceCwd, stdio: "inherit" }
);

execFileSync(
  "emcc",
  [
    ...sharedArgs,
    "-o",
    wptOutputFromRaylibSource,
    "-sMODULARIZE=0",
    "-sSINGLE_FILE=1",
    "-sWASM_ASYNC_COMPILATION=0",
    "-sEXPORT_NAME=RaylibCanvasWasmModule",
    "-sENVIRONMENT=web",
    "--post-js",
    "../../../native/raylib-canvas/raylib_canvas_wpt_post.js"
  ],
  { cwd: raylibSourceCwd, stdio: "inherit" }
);

console.log(`raylib WASM backend written to ${esmOutput}`);
console.log(`raylib WPT preload written to ${wptOutput}`);
