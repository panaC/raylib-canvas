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
| `reset()` | [WHATWG reset](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-reset-dev) | done |
| `beginLayer(options)` | [WHATWG beginLayer](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-beginlayer-dev) | partial |
| `endLayer()` | [WHATWG endLayer](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-endlayer-dev) | partial |
| `save()` | [WHATWG save](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-save-dev) | waiting |
| `restore()` | [WHATWG restore](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-restore-dev) | waiting |
| `scale(x, y)` | [WHATWG scale](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-scale-dev) | done |
| `rotate(angle)` | [WHATWG rotate](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-rotate-dev) | done |
| `translate(x, y)` | [WHATWG translate](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-translate-dev) | done |
| `transform(a, b, c, d, e, f)` | [WHATWG transform](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-transform-dev) | done |
| `getTransform()` | [WHATWG getTransform](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-gettransform-dev) | done |
| `setTransform(...)` | [WHATWG setTransform](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-settransform-dev) | done |
| `resetTransform()` | [WHATWG resetTransform](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-resettransform-dev) | done |
| `globalAlpha` | [WHATWG globalAlpha](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-globalalpha-dev) | done |
| `globalCompositeOperation` | [WHATWG globalCompositeOperation](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-globalcompositeoperation-dev) | partial |
| `lineWidth` | [WHATWG lineWidth](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-linewidth-dev) | done |
| `lineCap` | [WHATWG lineCap](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-linecap-dev) | done |
| `lineJoin` | [WHATWG lineJoin](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-linejoin-dev) | done |
| `miterLimit` | [WHATWG miterLimit](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-miterlimit-dev) | done |
| `setLineDash(segments)` | [WHATWG setLineDash](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-setlinedash-dev) | done |
| `getLineDash()` | [WHATWG getLineDash](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-getlinedash-dev) | done |
| `lineDashOffset` | [WHATWG lineDashOffset](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-linedashoffset-dev) | done |
| `font` | [WHATWG font](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-font-dev) | partial |
| `textAlign` | [WHATWG textAlign](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-textalign-dev) | done |
| `textBaseline` | [WHATWG textBaseline](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-textbaseline-dev) | done |
| `direction` | [WHATWG direction](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-direction-dev) | done |
| `letterSpacing` | [WHATWG letterSpacing](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-letterspacing-dev) | done |
| `wordSpacing` | [WHATWG wordSpacing](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-wordspacing-dev) | done |
| `fontKerning` | [WHATWG fontKerning](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-fontkerning-dev) | done |
| `fontStretch` | [WHATWG fontStretch](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-fontstretch-dev) | done |
| `fontVariantCaps` | [WHATWG fontVariantCaps](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-fontvariantcaps-dev) | done |
| `textRendering` | [WHATWG textRendering](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-textrendering-dev) | done |
| `fillStyle` | [WHATWG fillStyle](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-fillstyle-dev) | partial |
| `strokeStyle` | [WHATWG strokeStyle](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-strokestyle-dev) | partial |
| `createLinearGradient(x0, y0, x1, y1)` | [WHATWG createLinearGradient](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-createlineargradient-dev) | partial |
| `createRadialGradient(...)` | [WHATWG createRadialGradient](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-createradialgradient-dev) | partial |
| `createConicGradient(startAngle, x, y)` | [WHATWG createConicGradient](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-createconicgradient-dev) | partial |
| `createPattern(image, repetition)` | [WHATWG createPattern](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-createpattern-dev) | partial |
| `shadowOffsetX` | [WHATWG shadowOffsetX](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-shadowoffsetx-dev) | partial |
| `shadowOffsetY` | [WHATWG shadowOffsetY](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-shadowoffsety-dev) | partial |
| `shadowBlur` | [WHATWG shadowBlur](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-shadowblur-dev) | partial |
| `shadowColor` | [WHATWG shadowColor](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-shadowcolor-dev) | partial |
| `filter` | [WHATWG filter](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-filter-dev) | partial |
| `clearRect(x, y, w, h)` | [WHATWG clearRect](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-clearrect-dev) | partial |
| `fillRect(x, y, w, h)` | [WHATWG fillRect](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-fillrect-dev) | partial |
| `strokeRect(x, y, w, h)` | [WHATWG strokeRect](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-strokerect-dev) | partial |
| `beginPath()` | [WHATWG beginPath](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-beginpath-dev) | done |
| `closePath()` | [WHATWG closePath](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-closepath-dev) | partial |
| `moveTo(x, y)` | [WHATWG moveTo](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-moveto-dev) | done |
| `lineTo(x, y)` | [WHATWG lineTo](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-lineto-dev) | partial |
| `quadraticCurveTo(cpx, cpy, x, y)` | [WHATWG quadraticCurveTo](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-quadraticcurveto-dev) | partial |
| `bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)` | [WHATWG bezierCurveTo](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-beziercurveto-dev) | partial |
| `arcTo(x1, y1, x2, y2, radius)` | [WHATWG arcTo](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-arcto-dev) | partial |
| `rect(x, y, w, h)` | [WHATWG rect](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-rect-dev) | partial |
| `roundRect(x, y, w, h, radii)` | [WHATWG roundRect](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-roundrect-dev) | partial |
| `arc(x, y, radius, startAngle, endAngle, counterclockwise)` | [WHATWG arc](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-arc-dev) | partial |
| `ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise)` | [WHATWG ellipse](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-ellipse-dev) | partial |
| `fill(pathOrRule?)` | [WHATWG fill](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-fill-dev) | partial |
| `stroke(path?)` | [WHATWG stroke](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-stroke-dev) | partial |
| `clip(pathOrRule?)` | [WHATWG clip](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-clip-dev) | waiting |
| `isPointInPath(...)` | [WHATWG isPointInPath](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-ispointinpath-dev) | waiting |
| `isPointInStroke(...)` | [WHATWG isPointInStroke](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-ispointinstroke-dev) | waiting |
| `drawFocusIfNeeded(...)` | [WHATWG drawFocusIfNeeded](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-drawfocusifneeded-dev) | not-planned |
| `scrollPathIntoView(...)` | [WHATWG scrollPathIntoView](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-scrollpathintoview-dev) | not-planned |
| `fillText(text, x, y, maxWidth?)` | [WHATWG fillText](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-filltext-dev) | waiting |
| `strokeText(text, x, y, maxWidth?)` | [WHATWG strokeText](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-stroketext-dev) | partial |
| `measureText(text)` | [WHATWG measureText](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-measuretext-dev) | partial |
| `drawImage(...)` | [WHATWG drawImage](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-drawimage-dev) | partial |
| `createImageData(...)` | [WHATWG createImageData](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-createimagedata-dev) | partial |
| `getImageData(sx, sy, sw, sh, settings?)` | [WHATWG getImageData](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-getimagedata-dev) | partial |
| `putImageData(imageData, dx, dy, ...)` | [WHATWG putImageData](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-putimagedata-dev) | done |
| `imageSmoothingEnabled` | [WHATWG imageSmoothingEnabled](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-imagesmoothingenabled-dev) | done |
| `imageSmoothingQuality` | [WHATWG imageSmoothingQuality](https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-imagesmoothingquality-dev) | done |
