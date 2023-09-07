export type ContentfulEntry<F = any> = {
  sys: { id: string };
  fields: F;
};

export type ContentfulQueryResult = {
  items: ContentfulEntry[];
};

export type RichTextNodeTypes = "document" | `heading-${1 | 2 | 3 | 4 | 5 | 6}` | "paragraph" | "text";

export type RichTextNode = {
  nodeType?: RichTextNodeTypes;
  content?: RichTextNode[];
  value?: string;
  marks?: { type: string }[];
};

export type PostEntry = ContentfulEntry<{
  title: string;
  slug: string;
  content: RichTextNode;
}>;
