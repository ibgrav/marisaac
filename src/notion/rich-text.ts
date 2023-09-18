import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export function richTextToString(items?: RichTextItemResponse[]): string {
  if (!Array.isArray(items)) return "";

  return items.reduce((p, c) => {
    return p + c.plain_text;
  }, "");
}
