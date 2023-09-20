import type { BlockObjectResponse, QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";
import { notion } from "./client";
import { isFullPageOrDatabase } from "@notionhq/client";
import { richTextToString } from "./rich-text";
import { createStatusFilters } from "./status-filters";

export type Gallery = {
  id: string;
  slug?: string;
  title?: string;
  blocks?: BlockObjectResponse[];
};

export async function getGalleries(preview?: boolean) {
  const galleries: Gallery[] = [];

  const database = await notion.databases.query({
    database_id: import.meta.env.NOTION_GALLERIES_DB_ID,
    filter: createStatusFilters(preview)
  });

  await Promise.all(
    database.results.map(async (item) => {
      if (isFullPageOrDatabase(item)) {
        const gallery: Gallery = { id: item.id };

        const { Name, Slug } = item.properties;

        if (Slug?.type === "url" && typeof Slug.url === "string") {
          gallery.slug = Slug.url;
        }

        if (Name?.type === "title") {
          if (Array.isArray(Name.title)) {
            gallery.title = richTextToString(Name.title);
          }
        }

        galleries.push(gallery);
      }
    })
  );

  return galleries;
}
