import type { BlockObjectResponse, QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";
import { notion } from "./client";
import { isFullPageOrDatabase } from "@notionhq/client";
import { richTextToString } from "./rich-text";
import { createStatusFilters } from "./status-filters";

export type Post = {
  id: string;
  slug?: string;
  title?: string;
  image?: string;
  blocks?: BlockObjectResponse[];
};

export async function getPosts(preview?: boolean) {
  const posts: Post[] = [];

  const database = await notion.databases.query({
    database_id: import.meta.env.NOTION_BLOG_DB_ID,
    filter: createStatusFilters(preview)
  });

  await Promise.all(
    database.results.map(async (item) => {
      if (isFullPageOrDatabase(item)) {
        const post: Post = { id: item.id };

        const { Name, Slug, Image } = item.properties;

        if (Slug?.type === "url" && typeof Slug.url === "string") {
          post.slug = Slug.url;
        }

        if (Name?.type === "title") {
          if (Array.isArray(Name.title)) {
            post.title = richTextToString(Name.title);
          }
        }

        if (Image?.type === "files") {
          if (Array.isArray(Image.files)) {
            if (Image.files[0].type === "file") {
              post.image = Image.files[0].file.url;
            }
          }
        }

        posts.push(post);
      }
    })
  );

  return posts;
}