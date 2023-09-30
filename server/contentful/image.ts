// import { ensureDir } from "std/fs/ensure_dir.ts";
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

// const imageCache: Map<string, Image> = new Map();

// await ensureDir("static/assets/images");

export function image(asset?: ContentfulAsset, args?: ImageArgs): Image | undefined {
  if (typeof asset?.fields.file?.url !== "string") return undefined;

  // const cacheKey = JSON.stringify({ asset, args });
  // const cachedImage = imageCache.get(cacheKey);

  // if (cachedImage) return cachedImage;

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

  // cacheImages(cacheKey, md);

  return md;
}

// async function cacheImages(cacheKey: string, md: Image) {
//   try {
//     const data = new TextEncoder().encode(cacheKey);
//     const hashArray = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", data)));
//     const filename = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

//     const src = await writeImage(filename, md.src);
//     const placeholder = await writeImage(filename + "placeholder", md.placeholder);

//     imageCache.set(cacheKey, { ...md, src, placeholder });
//   } catch (e) {
//     console.error(e);
//   }
// }

// async function writeImage(filename: string, src: string) {
//   const res = await fetch(src);

//   const path = `/assets/images/${filename}`;
//   console.log("writing image from", src, "to", path);

//   await Deno.writeFile(`static/${path}`, new Uint8Array(await res.arrayBuffer()));

//   return path;
// }
