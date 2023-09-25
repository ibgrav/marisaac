import { isFullBlock } from "@notionhq/client";
import { ListBlockChildrenResponse } from "@notionhq/client/api-endpoints";
import { ensureDir } from "std/fs/ensure_dir.ts";
import { ImageMagick, IMagickImage, initialize, MagickFormat } from "imagemagick_deno";

await initialize();

export async function resolveImage(src?: string): Promise<string | undefined> {
  if (!src) return undefined;

  const url = new URL(src);

  let name = url.pathname.split("/").pop();
  if (!name) return undefined;
  name = name.replace(".jpg", "").replace(".jpeg", "").replace(".png", "");

  const dir = "static/assets/images";
  await ensureDir(dir);

  let path = `${dir}/${encodeURIComponent(name)}`;

  try {
    await Deno.stat(path);
    console.log("skipping found image...", name);
  } catch (e) {
    if (e instanceof Deno.errors.NotFound) {
      console.log("downloading new image...", name);

      const res = await fetch(src);
      const data = new Uint8Array(await res.arrayBuffer());

      // const write = async (img: IMagickImage, path: string) => {
      //   await img.write(MagickFormat.Webp, (data: Uint8Array) => {
      //     path += `_w${img.width}_h${img.height}_.webp`;
      //     return Deno.writeFile(path, data);
      //   });
      // };

      await ImageMagick.read(data, async (img: IMagickImage) => {
        img.quality = 90;

        await img.write(MagickFormat.Webp, (data: Uint8Array) => {
          path += `_w${img.width}_h${img.height}_.webp`;
          return Deno.writeFile(path, data);
        });

        /** --- THUMBNAIL --- */
        img.quality = 80;
        img.resize(img.width / 3, img.height / 3);

        await img.write(MagickFormat.Webp, (data: Uint8Array) => {
          return Deno.writeFile(path.replace(".webp", "thumb_.webp"), data);
        });

        /** --- BLUR --- */

        img.quality = 1;
        img.blur(100, 100);

        await img.write(MagickFormat.Webp, (data: Uint8Array) => {
          return Deno.writeFile(path.replace(".webp", "blur_.webp"), data);
        });
      });
    }
  }

  return "/" + path;
}

export async function resolveBlockImages(blocks: ListBlockChildrenResponse) {
  blocks.results = await Promise.all(
    blocks.results.map(async (block) => {
      if (isFullBlock(block)) {
        if (block.type === "image" && block.image.type === "file") {
          const src = await resolveImage(block.image.file.url);
          if (src) block.image.file.url = src;
        }
      }
      return block;
    })
  );

  return blocks;
}
