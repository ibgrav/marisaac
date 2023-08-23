export type ContentfulQuery = { content_type: string } & Record<string, string | undefined>;

export interface ContentfulEntry {
  fields: Record<string, unknown>;
}

export interface ContentfulQueryResult {
  includes: {
    Entry?: Array<ContentfulEntry>;
  };
}
