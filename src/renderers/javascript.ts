import { Canvas2DRenderingContext, type Rgba } from "../context";
import type { Canvas } from "../index";

export class JavascriptCanvas2DContext extends Canvas2DRenderingContext {
  readonly pixels: Uint8ClampedArray;

  constructor(canvas: Canvas) {
    super(canvas);
    this.pixels = new Uint8ClampedArray(canvas.width * canvas.height * 4);
  }

  protected fillRectPixels(x: number, y: number, width: number, height: number, color: Rgba): void {
    const x2 = x + width;
    const y2 = y + height;
    const left = clamp(Math.trunc(Math.min(x, x2)), 0, this.canvas.width);
    const top = clamp(Math.trunc(Math.min(y, y2)), 0, this.canvas.height);
    const right = clamp(Math.trunc(Math.max(x, x2)), 0, this.canvas.width);
    const bottom = clamp(Math.trunc(Math.max(y, y2)), 0, this.canvas.height);

    if (right <= left || bottom <= top) {
      return;
    }

    for (let py = top; py < bottom; py += 1) {
      for (let px = left; px < right; px += 1) {
        const offset = (py * this.canvas.width + px) * 4;
        this.pixels[offset] = color[0];
        this.pixels[offset + 1] = color[1];
        this.pixels[offset + 2] = color[2];
        this.pixels[offset + 3] = color[3];
      }
    }
  }

  protected getBasePixels(): Uint8ClampedArray {
    return this.pixels;
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
