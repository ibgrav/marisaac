import { ContentfulAsset } from "../types.ts";

type Image = {
  src: string;
  width: number;
  height: number;
  placeholder: string;
};

export function image(asset?: ContentfulAsset, full?: boolean): Image | undefined {
  if (typeof asset?.fields.file?.url !== "string") return undefined;

  const md: Image = { src: asset.fields.file.url, placeholder: asset.fields.file.url, width: 1, height: 1 };

  if (asset.fields.file?.details && "image" in asset.fields.file?.details) {
    if (asset.fields.file.details.image?.height) md.height = asset.fields.file.details.image?.height;
    if (asset.fields.file.details.image?.width) md.width = asset.fields.file.details.image?.width;
  }

  const url = new URL("https:" + md.src);

  url.searchParams.set("fm", "webp");
  url.searchParams.set("q", full ? "80" : "60");
  url.searchParams.set("f", "faces");
  url.searchParams.set("fit", "fill");

  const width = full ? 1200 : 400;

  md.height = Math.floor(md.height * (width / md.width));
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
