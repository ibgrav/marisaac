export type Link = { sys: { id: string } };

export type QueryResult<T extends ContentfulEntry = ContentfulEntry> = {
  items: T[];
  includes: Includes;
};

export type Includes = {
  Entry?: Link[];
  Asset?: Link[];
};

export type ContentfulAsset = {
  sys: { id: string };
  fields: {
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
  fields: F;
};

export type Album = ContentfulEntry<{
  slug: string;
  title: string;
  images: Link[];
}>;
