import { createContentfulUrl } from "./contentful/create-contentful-url";
import { ContentfulEntry, ContentfulQuery } from "./types";

export async function fetchEntry(params: ContentfulQuery): Promise<ContentfulEntry> {
  const result = await fetchEntries(params);
  return result;
}

export async function fetchEntries(params: ContentfulQuery) {
  const url = createContentfulUrl(params);

  const res = await fetch(url);
  return await res.json();
}
