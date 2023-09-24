import type { BlockObjectResponse, RichTextItemResponse } from "@notionhq/client/api-endpoints";
import { isFullBlock, isFullPageOrDatabase } from "@notionhq/client";
import { ensureDir } from "std/fs/ensure_dir.ts";

import { filters, notion, richTextToString } from "./utils.ts";
import { resolveBlockImages } from "./image.ts";

export type Gallery = {
  id: string;
  slug: string;
  title: string;
  blocks?: BlockObjectResponse[];
};

interface PostResponse {
  Slug?: { type: "url"; url: string };
  Name?: { title: RichTextItemResponse[] };
}

export async function writeGalleries() {
  const galleryDB = await notion.databases.query({
    database_id: Deno.env.get("NOTION_GALLERIES_ID") || "",
    filter: filters
  });

  await Promise.all(
    galleryDB.results.map(async (item) => {
      if (isFullPageOrDatabase(item)) {
        const { Name, Slug } = item.properties as PostResponse;

        const gallery: Partial<Gallery> = { id: item.id, slug: Slug?.url, title: richTextToString(Name?.title), blocks: [] };

        let blocks = await notion.blocks.children.list({ block_id: item.id });

        blocks = await resolveBlockImages(blocks);

        blocks.results.forEach((block) => {
          if (isFullBlock(block)) gallery.blocks?.push(block);
        });

        if (gallery.id && gallery.slug && gallery.title) {
          const dir = "static/notion/galleries";
          const encoder = new TextEncoder();
          const data = encoder.encode(JSON.stringify(gallery, null, 2));

          await ensureDir(dir);
          await Deno.writeFile(`${dir}/${gallery.slug}.json`, data, { create: true });
        }
      }
    })
  );
}
