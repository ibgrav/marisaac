import type { documentToHtmlString } from "@contentful/rich-text-html-renderer";

export type Document = Parameters<typeof documentToHtmlString>[0];

export type Link = { sys: { id: string } };

export type QueryResult<T extends ContentfulEntry = ContentfulEntry> = {
  items: T[];
  includes: Includes;
};

export type Includes = {
  Entry: Link[];
  Asset: Link[];
};

export type ContentfulAsset = {
  sys: { id: string };
  fields: {
    description?: string;
    file?: {
      url: string;
      details?: {
        image?: { width: number; height: number };
      };
    };
  };
};

export type ContentfulEntry<F = unknown> = {
  sys: { id: string };
  fields: Partial<F>;
};

export type Location = ContentfulEntry<{
  slug: string;
  title: string;
  startDate: string;
  endDate: string;
  coordinates: { lon: number; lat: number };
}>;

export type Album = ContentfulEntry<{
  title: string;
  location: Link;
  images: Link[];
}>;

export type Post = ContentfulEntry<{
  slug: string;
  date: string;
  title: string;
  location: Link;
  content: Document;
}>;

export type InlineImage = ContentfulEntry<{
  align: "Full" | "Left" | "Right";
  asset: ContentfulAsset;
}>;
