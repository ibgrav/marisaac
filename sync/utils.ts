import { Client } from "@notionhq/client";
import { QueryDatabaseParameters, RichTextItemResponse } from "@notionhq/client/api-endpoints";

export const notion = new Client({ auth: Deno.env.get("NOTION_TOKEN") });

export const richTextToString = (items: RichTextItemResponse[] = []) => items.reduce((p, c) => p + c.plain_text, "");

export const filters: QueryDatabaseParameters["filter"] = {
  or: [
    { type: "status", property: "Status", status: { equals: "Done" } },
    { type: "status", property: "Status", status: { equals: "In Progress" } }
  ]
};
