import { spawnSync } from "node:child_process";
import { cwd, env, exit } from "node:process";

const dockerfile = env.RAYLIB_CANVAS_DOCKERFILE ?? "docker/raylib-wasm.Dockerfile";
const image = env.RAYLIB_CANVAS_DOCKER_IMAGE ?? "raylib-canvas-emscripten";
const shouldBuildImage = env.RAYLIB_CANVAS_DOCKER_BUILD !== "0";

function run(command, args) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: false
  });

  if (typeof result.status === "number") {
    if (result.status !== 0) {
      exit(result.status);
    }
    return;
  }

  if (result.error) {
    throw result.error;
  }

  exit(1);
}

if (shouldBuildImage) {
  run("docker", ["build", "-f", dockerfile, "-t", image, "."]);
}

const runArgs = [
  "run",
  "--rm",
  "--volume",
  `${cwd()}:/workspace`,
  "--workdir",
  "/workspace"
];

if (typeof process.getuid === "function" && typeof process.getgid === "function") {
  runArgs.push("--user", `${process.getuid()}:${process.getgid()}`);
}

runArgs.push(image);

run("docker", runArgs);
