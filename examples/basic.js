import { createCanvas } from "canvas-rasterizer";

const canvas = await createCanvas(800, 450);

const ctx = canvas.getContext("2d");

ctx.fillStyle = "#FFFFFF";
ctx.fillRect(0, 0, 800, 450);

ctx.fillStyle = "#FF0000";
ctx.fillRect(100, 100, 200, 80);

canvas.toBlob((blob) => {
  if (!blob) {
    throw new Error("Could not encode canvas");
  }

  const url = URL.createObjectURL(blob);
  const image = document.querySelector("#output");
  const status = document.querySelector("#status");

  image.src = url;
  image.onload = () => {
    status.textContent = `${canvas.width}x${canvas.height} image/png`;
    document.body.dataset.ready = "true";
  };
});
