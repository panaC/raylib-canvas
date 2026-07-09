import { expect, test } from "@playwright/test";

test("basic browser demo renders the requested red rectangle", async ({ page }) => {
  await page.goto("/examples/basic.html");
  await expect(page.locator("body")).toHaveAttribute("data-ready", "true");

  const sample = await page.evaluate(async () => {
    const image = document.querySelector<HTMLImageElement>("#output")!;
    const sampler = document.createElement("canvas");
    sampler.width = image.naturalWidth;
    sampler.height = image.naturalHeight;
    const ctx = sampler.getContext("2d")!;
    ctx.drawImage(image, 0, 0);

    return {
      red: Array.from(ctx.getImageData(150, 140, 1, 1).data),
      white: Array.from(ctx.getImageData(20, 20, 1, 1).data)
    };
  });

  expect(sample.red).toEqual([255, 0, 0, 255]);
  expect(sample.white).toEqual([255, 255, 255, 255]);
});
