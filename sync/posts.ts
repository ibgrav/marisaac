import type { BlockObjectResponse, RichTextItemResponse } from "@notionhq/client/api-endpoints";
import { isFullBlock, isFullPageOrDatabase } from "@notionhq/client";
import { ensureDir } from "std/fs/ensure_dir.ts";
import { filters, notion, richTextToString } from "./utils.ts";
import { resolveBlockImages, resolveImage } from "./image.ts";

export type Post = {
  id: string;
  slug: string;
  title: string;
  image?: string;
  blocks?: BlockObjectResponse[];
};

interface PostResponse {
  Slug?: { type: "url"; url: string };
  Name?: { title: RichTextItemResponse[] };
  Image?: { type: "files"; files: { name: string; type: "external"; file: { url: string } }[] };
}

export async function writePosts() {
  const postsDB = await notion.databases.query({
    database_id: Deno.env.get("NOTION_BLOG_ID")!,
    filter: filters
  });

  await Promise.all(
    postsDB.results.map(async (item) => {
      if (isFullPageOrDatabase(item)) {
        const { Name, Slug, Image } = item.properties as PostResponse;

        const post: Partial<Post> = { id: item.id, slug: Slug?.url, title: richTextToString(Name?.title), blocks: [] };

        const image = Image?.files?.[0];
        if (image) post.image = await resolveImage(image.file.url);

        let blocks = await notion.blocks.children.list({ block_id: item.id });

        blocks = await resolveBlockImages(blocks);

        blocks.results.forEach((block) => {
          if (isFullBlock(block)) post.blocks?.push(block);
        });

        if (post.id && post.slug && post.title) {
          const dir = "data/notion/posts";
          const encoder = new TextEncoder();
          const data = encoder.encode(JSON.stringify(post, null, 2));

          await ensureDir(dir);
          await Deno.writeFile(`${dir}/${post.slug}.json`, data, { create: true });
        }
      }
    })
  );
}
