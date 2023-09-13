import type { Document } from "@contentful/rich-text-types";

declare global {
  interface Window {
    map: any;
    // mapkit: any;
    initMapKit: (value: unknown) => void;
  }
}

export type Includes = {
  Asset: Array<Asset>;
  Entries: Array<Entry>;
};

export type Link = {
  sys: { id: string };
};

export type Asset = {
  sys: { id: string };
  fields: {
    file: { url: string };
  };
};

export type Entry<Id extends string = string, F extends Record<string, unknown> = Record<string, unknown>> = {
  fields: F;
  sys: {
    id: string;
    contentType: { sys: { id: Id } };
  };
};

export type PostEntry = Entry<
  "post",
  {
    title: string;
    slug: string;
    publishDate: string;
    content: Document;
    image: Link;
  }
>;

export type LocationEntry = Entry<
  "location",
  {
    title: string;
    coordinates: { lat: number; lon: number };
  }
>;
