import { ContentfulAsset } from "../types.ts";

type Image = {
  src: string;
  width: number;
  height: number;
  placeholder: string;
};

interface ImageArgs {
  full?: boolean;
  ratio?: "4:3" | "3:4" | "16:9";
}

export function image(asset?: ContentfulAsset, args?: ImageArgs): Image | undefined {
  if (typeof asset?.fields.file?.url !== "string") return undefined;

  const { full, ratio } = args || {};

  const md: Image = { src: asset.fields.file.url, placeholder: asset.fields.file.url, width: 1, height: 1 };

  if (asset.fields.file?.details && "image" in asset.fields.file?.details) {
    if (asset.fields.file.details.image?.height) md.height = asset.fields.file.details.image?.height;
    if (asset.fields.file.details.image?.width) md.width = asset.fields.file.details.image?.width;
  }

  const url = new URL("https:" + md.src);

  url.searchParams.set("fm", "webp");
  url.searchParams.set("f", "faces");
  url.searchParams.set("fit", "fill");
  url.searchParams.set("q", full ? "80" : "60");

  const width = full ? 1200 : 400;

  if (ratio === "4:3") {
    md.height = width * 0.75;
  } else if (ratio === "3:4") {
    md.height = width * 1.33;
  } else if (ratio === "16:9") {
    md.height = width * 0.5625;
  } else {
    md.height = Math.floor(md.height * (width / md.width));
  }

  md.width = width;

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
