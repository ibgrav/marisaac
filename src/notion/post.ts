import type {
  BlockObjectResponse,
  QueryDatabaseParameters,
  RichTextItemResponse
} from "@notionhq/client/build/src/api-endpoints";
import { notion } from "./client";
import { isFullPageOrDatabase } from "@notionhq/client";
import { richTextToString } from "./rich-text";

export type Post = {
  id: string;
  slug?: string;
  title?: string;
  image?: string;
  blocks?: BlockObjectResponse[];
};

export async function getPosts(preview?: boolean) {
  const posts: Post[] = [];

  const filters: QueryDatabaseParameters["filter"] = {
    or: [{ type: "status", property: "Status", status: { equals: "Done" } }]
  };

  if (preview) {
    filters.or.push({ type: "status", property: "Status", status: { equals: "In Progress" } });
  }

  const database = await notion.databases.query({
    database_id: import.meta.env.NOTION_BLOG_DB_ID,
    filter: filters
  });

  await Promise.all(
    database.results.map(async (item) => {
      if (isFullPageOrDatabase(item)) {
        const post: Post = { id: item.id };

        const { Name, Slug, Image } = item.properties;

        if (Name?.type === "title") {
          if (Array.isArray(Name.title)) {
            post.title = richTextToString(Name.title);
          }
        }

        if (Slug?.type === "rich_text") {
          if (Array.isArray(Slug.rich_text)) {
            post.slug = richTextToString(Slug.rich_text);
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
