interface ContentfulImageOptions {
  format?: "jpg" | "png" | "webp" | "gif";
  width?: number;
  height?: number;
  radius?: number;
  fit?: "pad" | "fill" | "scale" | "crop" | "thumb";
  bgColor?: string;
  focus?:
    | "top"
    | "right"
    | "bottom"
    | "left"
    | "top_right"
    | "top_left"
    | "bottom_right"
    | "bottom_left"
    | "face"
    | "faces"
    | "center";
}

export function image(originalSrc: string = "", options: ContentfulImageOptions = {}): string {
  if (!originalSrc) return "";

  try {
    const url = new URL("https://" + originalSrc);

    url.searchParams.set("fm", options.format || "webp");
    if (options.width) url.searchParams.set("w", String(options.width));
    if (options.height) url.searchParams.set("h", String(options.height));
    if (options.radius) url.searchParams.set("r", String(options.radius));
    if (options.fit) url.searchParams.set("fit", options.fit);
    if (options.bgColor) url.searchParams.set("bg", options.bgColor);
    if (options.focus) url.searchParams.set("f", options.focus);

    return url.href;
  } catch (e) {
    console.error(e);
    return originalSrc;
  }
}
