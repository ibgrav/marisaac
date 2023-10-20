import { ImageAsset } from "./use-albums";

type Image = {
  src: string;
  width: number;
  height: number;
  placeholder: string;
};

interface ImageArgs {
  width?: number;
  quality?: number;
  format?: "webp" | "png" | "jpg";
  ratio?: "4:3" | "3:4" | "16:9" | "4:1" | "1:1";
  fit?: "fill" | "scale" | "crop" | "thumb" | "pad";
  focus?: "top" | "bottom" | "left" | "right" | "faces" | "center";
}

export function image(asset?: ImageAsset, args: ImageArgs = {}): Image | undefined {
  if (typeof asset?.url !== "string") return undefined;

  const { ratio, quality = 80, format = "webp", fit = "fill", focus = "faces" } = args;

  const md: Image = {
    src: asset.url,
    placeholder: asset.url,
    width: args.width || 800,
    height: args.width || 800
  };

  const url = new URL(md.src);

  url.searchParams.set("fm", format);
  url.searchParams.set("f", focus);
  url.searchParams.set("fit", fit);
  url.searchParams.set("q", quality.toString());

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
    const assetRatio = (asset.height || 1) / (asset.width || 1);
    md.height = Math.floor(md.height * assetRatio);
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
