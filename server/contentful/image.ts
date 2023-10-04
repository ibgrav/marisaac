// import { ensureDir } from "std/fs/ensure_dir.ts";
import { ContentfulAsset } from "../types.ts";

type Image = {
  src: string;
  width: number;
  height: number;
  placeholder: string;
};

interface ImageArgs {
  width?: number;
  quality?: number;
  ratio?: "4:3" | "3:4" | "16:9" | "4:1" | "1:1";
  format?: "webp" | "png" | "jpg";
  fit?: "fill" | "scale" | "crop" | "thumb" | "pad";
  focus?: "top" | "bottom" | "left" | "right" | "faces" | "center";
}

export function image(asset?: ContentfulAsset, args?: ImageArgs): Image | undefined {
  if (typeof asset?.fields.file?.url !== "string") return undefined;

  const { ratio, quality = 80, format = "webp", fit = "fill", focus = "faces", width } = args || {};

  const md: Image = { src: asset.fields.file.url, placeholder: asset.fields.file.url, width: 1, height: 1 };

  if (asset.fields.file?.details && "image" in asset.fields.file?.details) {
    if (asset.fields.file.details.image?.height) md.height = asset.fields.file.details.image?.height;
    if (asset.fields.file.details.image?.width) md.width = asset.fields.file.details.image?.width;
  }

  const url = new URL("https:" + md.src);

  url.searchParams.set("fm", format);
  url.searchParams.set("f", focus);
  url.searchParams.set("fit", fit);
  url.searchParams.set("q", quality.toString());

  if (width) md.width = width;

  if (ratio === "1:1") {
    md.height = md.width;
  } else if (ratio === "4:3") {
    md.height = Math.floor(md.width * 0.75);
  } else if (ratio === "3:4") {
    md.height = Math.floor(md.width * 1.33);
  } else if (ratio === "16:9") {
    md.height = Math.floor(md.width * 0.5625);
  } else if (ratio === "4:1") {
    md.height = Math.floor(md.width * 0.25);
  } else {
    md.height = Math.floor(md.height * (md.width / md.width));
  }

  url.searchParams.set("h", md.height.toString());
  url.searchParams.set("w", md.width.toString());

  const placeHolderUrl = new URL(url);
  placeHolderUrl.searchParams.set("q", "1");
  placeHolderUrl.searchParams.set("h", Math.floor(md.height / 10).toString());
  placeHolderUrl.searchParams.set("w", Math.floor(md.width / 10).toString());

  md.src = url.href;
  md.placeholder = placeHolderUrl.href;

  return md;
}
