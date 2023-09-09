import { type Document } from "@contentful/rich-text-types";

export type PostEntry = {
  contentTypeId: "post";
  fields: {
    slug: string;
    title: string;
    content: Document;
  };
};
