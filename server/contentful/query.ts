import { QueryResult, ContentfulEntry } from "../types.ts";

const kv = await Deno.openKv();

export async function query<T extends ContentfulEntry>(
  params: Record<string, string | number | string[]>
): Promise<QueryResult<T>> {
  const preview = true;

  const result: QueryResult<T> = {
    items: [],
    includes: { Entry: [], Asset: [] }
  };

  const key = ["query", preview, JSON.stringify(params)];

  const cached = await kv.get(key);
  if (cached.value) return cached.value as QueryResult<T>;

  try {
    const spaceId = Deno.env.get("CONTENTFUL_SPACE_ID");
    const accessToken = preview ? Deno.env.get("CONTENTFUL_PREVIEW_TOKEN") : Deno.env.get("CONTENTFUL_DELIVERY_TOKEN");

    const url = new URL(
      `/spaces/${spaceId}/environments/master/entries`,
      `https://${preview ? "preview" : "cdn"}.contentful.com`
    );

    url.searchParams.set("access_token", accessToken!);

    for (const [key, value] of Object.entries(params)) {
      if (value) url.searchParams.set(key, String(value));
    }

    const res = await fetch(url);
    const data = await res.json();

    if (data.items) result.items = data.items;
    if (data.includes?.Entry) result.includes.Entry = data.includes.Entry;
    if (data.includes?.Asset) result.includes.Asset = data.includes.Asset;

    await kv.set(key, result);
  } catch (e) {
    console.error(e);
  }

  return result;
}
