import { QueryResult, ContentfulEntry } from "../types.ts";

export async function query<T extends ContentfulEntry>(
  params: Record<string, string | number | string[]>
): Promise<QueryResult<T>> {
  const result: QueryResult<T> = {
    items: [],
    includes: { Entry: [], Asset: [] }
  };

  try {
    const spaceId = Deno.env.get("CONTENTFUL_SPACE_ID");
    const preview = Boolean(Deno.env.get("CONTENTFUL_PREVIEW"));
    const accessToken = preview ? Deno.env.get("CONTENTFUL_PREVIEW_TOKEN") : Deno.env.get("CONTENTFUL_DELIVERY_TOKEN");

    const url = new URL(
      `/spaces/${spaceId}/environments/master/entries`,
      `https://${preview ? "preview" : "cdn"}.contentful.com`
    );

    for (const [key, value] of Object.entries(params)) {
      if (value) url.searchParams.set(key, String(value));
    }

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const data = await res.json();

    console.log(url);

    if (data.items) result.items = data.items;
    if (data.includes) result.includes = data.includes;
  } catch (e) {
    console.error(e);
  }

  return result;
}
