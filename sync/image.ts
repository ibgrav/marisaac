import { isFullBlock } from "@notionhq/client";
import { ListBlockChildrenResponse } from "@notionhq/client/api-endpoints";
import { ensureDir } from "std/fs/ensure_dir.ts";
import { ImageMagick, IMagickImage, initialize, MagickFormat } from "imagemagick_deno";

await initialize();

export async function resolveImage(src?: string): Promise<string | undefined> {
  if (!src) return undefined;

  const url = new URL(src);
  let name = url.pathname.split("/").pop();
  name = name?.replace(".jpeg", ".jpg").replace(".jpg", ".webp");

  if (!name) return undefined;

  const dir = "static/notion/images";
  await ensureDir(dir);

  const path = `${dir}/${name}`;

  try {
    await Deno.stat(path);
    console.log("skipping found image...", name);
  } catch (e) {
    if (e instanceof Deno.errors.NotFound) {
      console.log("downloading new image...", name);

      const res = await fetch(src);
      const data = new Uint8Array(await res.arrayBuffer());

      await ImageMagick.read(data, async (img: IMagickImage) => {
        img.resize(200, 100);

        await img.write(MagickFormat.Jpeg, (data: Uint8Array) => {
          return Deno.writeFile(path, data);
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
