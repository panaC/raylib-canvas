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

void rcl_put_image_data(
    RclCanvas *canvas,
    const unsigned char *source,
    int source_width,
    int source_left,
    int source_top,
    int source_right,
    int source_bottom,
    int dest_x,
    int dest_y
)
{
    if ((canvas == NULL) || (source == NULL)) return;
    if (source_width <= 0) return;
    if (source_left < 0 || source_top < 0 || source_right < source_left || source_bottom < source_top) return;

    unsigned char *target = (unsigned char *)canvas->image.data;
    if (target == NULL) return;

    for (int source_y = source_top; source_y < source_bottom; source_y++)
    {
        int target_y = dest_y + source_y;
        if ((target_y < 0) || (target_y >= canvas->height)) continue;

        int target_x = dest_x + source_left;
        if ((target_x < 0) || (target_x + (source_right - source_left) > canvas->width)) continue;

        size_t source_offset = ((size_t)source_y*(size_t)source_width + (size_t)source_left)*4u;
        size_t target_offset = ((size_t)target_y*(size_t)canvas->width + (size_t)target_x)*4u;
        size_t byte_length = (size_t)(source_right - source_left)*4u;

        for (size_t index = 0; index < byte_length; index++)
        {
            target[target_offset + index] = source[source_offset + index];
        }
    }
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
