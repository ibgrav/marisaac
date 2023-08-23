import { createContentfulUrl } from "./create-contentful-url";
import type { ContentfulQuery, ContentfulQueryResult } from "../types";

export async function contentfulFetch<T>(params: ContentfulQuery): Promise<ContentfulQueryResult<T>> {
  try {
    const url = createContentfulUrl(params);

    const res = await fetch(url);
    return (await res.json()) as ContentfulQueryResult<T>;
  } catch (e) {
    console.error(e);
    return { items: [] };
  }
}
