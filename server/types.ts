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
  title: string;
  slug: string;
  startDate: string;
  endDate: string;
  coordinates: { lon: number; lat: number };
}>;

export type Album = ContentfulEntry<{
  title: string;
  location: Link;
  images: Link[];
}>;
