import type { documentToHtmlString } from "@contentful/rich-text-html-renderer";

export type ContentfulDocument = Parameters<typeof documentToHtmlString>[0];

export type ContentfulQuery = { content_type: string } & Record<string, string | undefined>;

export interface ContentfulQueryResult<T = unknown> {
  items: Array<T>;
}

export interface ContentfulEntry<F = Record<string, unknown>> {
  sys: { id: string };
  fields: F;
}

export type PostEntry = ContentfulEntry<{
  title: string;
  slug: string;
  publishDate: string;
  content: ContentfulDocument;
}>;
