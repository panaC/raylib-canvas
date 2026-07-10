## whatwg canvas specification references

- [WHATWG HTML - The 2D rendering context](https://html.spec.whatwg.org/multipage/canvas.html#the-2d-rendering-context)
- [WHATWG HTML - The canvas state](https://html.spec.whatwg.org/multipage/canvas.html#the-canvas-state)
- [WHATWG HTML - Line styles](https://html.spec.whatwg.org/multipage/canvas.html#line-styles)
- [WHATWG HTML - Text styles](https://html.spec.whatwg.org/multipage/canvas.html#text-styles)
- [WHATWG HTML - Transformations](https://html.spec.whatwg.org/multipage/canvas.html#transformations)
- [WHATWG HTML - Fill and stroke styles](https://html.spec.whatwg.org/multipage/canvas.html#fill-and-stroke-styles)
- [WHATWG HTML - Drawing rectangles to the bitmap](https://html.spec.whatwg.org/multipage/canvas.html#drawing-rectangles-to-the-bitmap)
- [WHATWG HTML - Drawing paths to the canvas](https://html.spec.whatwg.org/multipage/canvas.html#drawing-paths-to-the-canvas)
- [WHATWG HTML - Drawing text to the bitmap](https://html.spec.whatwg.org/multipage/canvas.html#drawing-text-to-the-bitmap)
- [WHATWG HTML - Drawing images](https://html.spec.whatwg.org/multipage/canvas.html#drawing-images)
- [WHATWG HTML - Pixel manipulation](https://html.spec.whatwg.org/multipage/canvas.html#pixel-manipulation)
- [WHATWG HTML - Compositing](https://html.spec.whatwg.org/multipage/canvas.html#compositing)
- [WHATWG HTML - Image smoothing](https://html.spec.whatwg.org/multipage/canvas.html#image-smoothing)
- [WHATWG HTML - Shadows](https://html.spec.whatwg.org/multipage/canvas.html#shadows)
- [WHATWG HTML - Filters](https://html.spec.whatwg.org/multipage/canvas.html#filters)

## context backend status

- JavaScript software context: default backend through `JavascriptCanvas2DContext`.
- raylib 6.0 WASM context: opt-in backend through `createRaylibCanvas2DContextFactory()`.
  It currently targets the same Canvas API coverage as the JavaScript context.

| API method name | canvas official web reference | status (waiting/not-planned/partial/done) |
| --- | --- | --- |
| `canvas` | [WHATWG CanvasRenderingContext2D.canvas](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-canvas-dev) | waiting |
| `getContextAttributes()` | [WHATWG getContextAttributes](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-getcontextattributes-dev) | waiting |
| `isContextLost()` | [WHATWG isContextLost](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-iscontextlost-dev) | waiting |
| `reset()` | [WHATWG reset](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-reset-dev) | waiting |
| `save()` | [WHATWG save](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-save-dev) | waiting |
| `restore()` | [WHATWG restore](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-restore-dev) | waiting |
| `scale(x, y)` | [WHATWG scale](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-scale-dev) | done |
| `rotate(angle)` | [WHATWG rotate](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-rotate-dev) | waiting |
| `translate(x, y)` | [WHATWG translate](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-translate-dev) | waiting |
| `transform(a, b, c, d, e, f)` | [WHATWG transform](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-transform-dev) | waiting |
| `getTransform()` | [WHATWG getTransform](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-gettransform-dev) | waiting |
| `setTransform(...)` | [WHATWG setTransform](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-settransform-dev) | waiting |
| `resetTransform()` | [WHATWG resetTransform](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-resettransform-dev) | waiting |
| `globalAlpha` | [WHATWG globalAlpha](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-globalalpha-dev) | waiting |
| `globalCompositeOperation` | [WHATWG globalCompositeOperation](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-globalcompositeoperation-dev) | waiting |
| `lineWidth` | [WHATWG lineWidth](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-linewidth-dev) | waiting |
| `lineCap` | [WHATWG lineCap](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-linecap-dev) | waiting |
| `lineJoin` | [WHATWG lineJoin](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-linejoin-dev) | waiting |
| `miterLimit` | [WHATWG miterLimit](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-miterlimit-dev) | waiting |
| `setLineDash(segments)` | [WHATWG setLineDash](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-setlinedash-dev) | waiting |
| `getLineDash()` | [WHATWG getLineDash](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-getlinedash-dev) | waiting |
| `lineDashOffset` | [WHATWG lineDashOffset](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-linedashoffset-dev) | waiting |
| `font` | [WHATWG font](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-font-dev) | waiting |
| `textAlign` | [WHATWG textAlign](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-textalign-dev) | waiting |
| `textBaseline` | [WHATWG textBaseline](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-textbaseline-dev) | waiting |
| `direction` | [WHATWG direction](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-direction-dev) | waiting |
| `letterSpacing` | [WHATWG letterSpacing](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-letterspacing-dev) | waiting |
| `wordSpacing` | [WHATWG wordSpacing](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-wordspacing-dev) | waiting |
| `fontKerning` | [WHATWG fontKerning](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-fontkerning-dev) | waiting |
| `fontStretch` | [WHATWG fontStretch](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-fontstretch-dev) | waiting |
| `fontVariantCaps` | [WHATWG fontVariantCaps](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-fontvariantcaps-dev) | waiting |
| `textRendering` | [WHATWG textRendering](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-textrendering-dev) | waiting |
| `fillStyle` | [WHATWG fillStyle](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-fillstyle-dev) | partial |
| `strokeStyle` | [WHATWG strokeStyle](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-strokestyle-dev) | waiting |
| `createLinearGradient(x0, y0, x1, y1)` | [WHATWG createLinearGradient](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-createlineargradient-dev) | waiting |
| `createRadialGradient(...)` | [WHATWG createRadialGradient](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-createradialgradient-dev) | waiting |
| `createConicGradient(startAngle, x, y)` | [WHATWG createConicGradient](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-createconicgradient-dev) | waiting |
| `createPattern(image, repetition)` | [WHATWG createPattern](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-createpattern-dev) | waiting |
| `shadowOffsetX` | [WHATWG shadowOffsetX](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-shadowoffsetx-dev) | waiting |
| `shadowOffsetY` | [WHATWG shadowOffsetY](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-shadowoffsety-dev) | waiting |
| `shadowBlur` | [WHATWG shadowBlur](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-shadowblur-dev) | waiting |
| `shadowColor` | [WHATWG shadowColor](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-shadowcolor-dev) | waiting |
| `filter` | [WHATWG filter](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-filter-dev) | waiting |
| `clearRect(x, y, w, h)` | [WHATWG clearRect](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-clearrect-dev) | partial |
| `fillRect(x, y, w, h)` | [WHATWG fillRect](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-fillrect-dev) | partial |
| `strokeRect(x, y, w, h)` | [WHATWG strokeRect](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-strokerect-dev) | waiting |
| `beginPath()` | [WHATWG beginPath](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-beginpath-dev) | waiting |
| `closePath()` | [WHATWG closePath](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-closepath-dev) | waiting |
| `moveTo(x, y)` | [WHATWG moveTo](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-moveto-dev) | waiting |
| `lineTo(x, y)` | [WHATWG lineTo](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-lineto-dev) | waiting |
| `quadraticCurveTo(cpx, cpy, x, y)` | [WHATWG quadraticCurveTo](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-quadraticcurveto-dev) | waiting |
| `bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)` | [WHATWG bezierCurveTo](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-beziercurveto-dev) | waiting |
| `arcTo(x1, y1, x2, y2, radius)` | [WHATWG arcTo](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-arcto-dev) | waiting |
| `rect(x, y, w, h)` | [WHATWG rect](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-rect-dev) | waiting |
| `roundRect(x, y, w, h, radii)` | [WHATWG roundRect](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-roundrect-dev) | waiting |
| `arc(x, y, radius, startAngle, endAngle, counterclockwise)` | [WHATWG arc](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-arc-dev) | waiting |
| `ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise)` | [WHATWG ellipse](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-ellipse-dev) | waiting |
| `fill(pathOrRule?)` | [WHATWG fill](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-fill-dev) | waiting |
| `stroke(path?)` | [WHATWG stroke](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-stroke-dev) | waiting |
| `clip(pathOrRule?)` | [WHATWG clip](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-clip-dev) | waiting |
| `isPointInPath(...)` | [WHATWG isPointInPath](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-ispointinpath-dev) | waiting |
| `isPointInStroke(...)` | [WHATWG isPointInStroke](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-ispointinstroke-dev) | waiting |
| `drawFocusIfNeeded(...)` | [WHATWG drawFocusIfNeeded](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-drawfocusifneeded-dev) | not-planned |
| `scrollPathIntoView(...)` | [WHATWG scrollPathIntoView](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-scrollpathintoview-dev) | not-planned |
| `fillText(text, x, y, maxWidth?)` | [WHATWG fillText](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-filltext-dev) | waiting |
| `strokeText(text, x, y, maxWidth?)` | [WHATWG strokeText](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-stroketext-dev) | waiting |
| `measureText(text)` | [WHATWG measureText](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-measuretext-dev) | waiting |
| `drawImage(...)` | [WHATWG drawImage](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-drawimage-dev) | waiting |
| `createImageData(...)` | [WHATWG createImageData](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-createimagedata-dev) | waiting |
| `getImageData(sx, sy, sw, sh, settings?)` | [WHATWG getImageData](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-getimagedata-dev) | partial |
| `putImageData(imageData, dx, dy, ...)` | [WHATWG putImageData](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-putimagedata-dev) | waiting |
| `imageSmoothingEnabled` | [WHATWG imageSmoothingEnabled](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-imagesmoothingenabled-dev) | waiting |
| `imageSmoothingQuality` | [WHATWG imageSmoothingQuality](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-imagesmoothingquality-dev) | waiting |
