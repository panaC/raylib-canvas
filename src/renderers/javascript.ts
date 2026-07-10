import type { CanvasRenderer, Rgba } from "../index";

export class JavascriptCanvasRenderer implements CanvasRenderer {
  readonly pixels: Uint8ClampedArray;

  constructor(
    readonly width: number,
    readonly height: number
  ) {
    assertPositiveInteger(width, "width");
    assertPositiveInteger(height, "height");
    this.pixels = new Uint8ClampedArray(width * height * 4);
  }

  fillRect(x: number, y: number, width: number, height: number, color: Rgba): void {
    if (![x, y, width, height].every(Number.isFinite)) {
      return;
    }

    const x2 = x + width;
    const y2 = y + height;
    const left = clamp(Math.trunc(Math.min(x, x2)), 0, this.width);
    const top = clamp(Math.trunc(Math.min(y, y2)), 0, this.height);
    const right = clamp(Math.trunc(Math.max(x, x2)), 0, this.width);
    const bottom = clamp(Math.trunc(Math.max(y, y2)), 0, this.height);

    if (right <= left || bottom <= top) {
      return;
    }

    for (let py = top; py < bottom; py += 1) {
      for (let px = left; px < right; px += 1) {
        const offset = (py * this.width + px) * 4;
        this.pixels[offset] = color[0];
        this.pixels[offset + 1] = color[1];
        this.pixels[offset + 2] = color[2];
        this.pixels[offset + 3] = color[3];
      }
    }
  }

  getPixels(): Uint8ClampedArray {
    return this.pixels;
  }
}

function assertPositiveInteger(value: number, label: string): void {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${label} must be a positive integer`);
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
