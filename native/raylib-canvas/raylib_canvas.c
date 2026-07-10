#include "raylib.h"

#include <math.h>
#include <stddef.h>
#include <stdint.h>

typedef struct RclCanvas {
    int width;
    int height;
    size_t pixels_len;
    Image image;
} RclCanvas;

static unsigned char rcl_clamp_byte(int value)
{
    if (value < 0) return 0;
    if (value > 255) return 255;
    return (unsigned char)value;
}

static void rcl_fill_rect_color(
    RclCanvas *canvas,
    double x,
    double y,
    double width,
    double height,
    Color color
)
{
    if (canvas == NULL) return;
    if (!isfinite(x) || !isfinite(y) || !isfinite(width) || !isfinite(height)) return;

    double x2 = x + width;
    double y2 = y + height;
    Rectangle rect = {
        (float)((x < x2) ? x : x2),
        (float)((y < y2) ? y : y2),
        (float)fabs(width),
        (float)fabs(height)
    };

    ImageDrawRectangleRec(&canvas->image, rect, color);
}

RclCanvas *rcl_init(int width, int height)
{
    if ((width <= 0) || (height <= 0)) return NULL;

    size_t pixel_count = (size_t)width*(size_t)height;
    if (pixel_count > (SIZE_MAX/4u)) return NULL;

    RclCanvas *canvas = (RclCanvas *)MemAlloc(sizeof(RclCanvas));
    if (canvas == NULL) return NULL;

    canvas->width = 0;
    canvas->height = 0;
    canvas->pixels_len = 0;
    canvas->image = (Image){ 0 };

    canvas->image = GenImageColor(width, height, BLANK);
    if (canvas->image.data == NULL)
    {
        MemFree(canvas);
        return NULL;
    }

    canvas->width = width;
    canvas->height = height;
    canvas->pixels_len = pixel_count*4u;
    return canvas;
}

void rcl_destroy(RclCanvas *canvas)
{
    if (canvas == NULL) return;

    UnloadImage(canvas->image);
    canvas->image.data = NULL;
    MemFree(canvas);
}

void rcl_fill_rect(
    RclCanvas *canvas,
    double x,
    double y,
    double width,
    double height,
    int red,
    int green,
    int blue,
    int alpha
)
{
    Color color = {
        rcl_clamp_byte(red),
        rcl_clamp_byte(green),
        rcl_clamp_byte(blue),
        rcl_clamp_byte(alpha)
    };
    rcl_fill_rect_color(canvas, x, y, width, height, color);
}

void rcl_clear_rect(RclCanvas *canvas, double x, double y, double width, double height)
{
    rcl_fill_rect_color(canvas, x, y, width, height, BLANK);
}

unsigned char *rcl_pixels_ptr(RclCanvas *canvas)
{
    if (canvas == NULL) return NULL;
    return (unsigned char *)canvas->image.data;
}

int rcl_pixels_len(RclCanvas *canvas)
{
    if ((canvas == NULL) || (canvas->pixels_len > (size_t)INT32_MAX)) return 0;
    return (int)canvas->pixels_len;
}

int rcl_raylib_version_major(void)
{
    return RAYLIB_VERSION_MAJOR;
}
