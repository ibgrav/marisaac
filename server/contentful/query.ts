import { QueryResult, ContentfulEntry } from "../types.ts";

const kv = await Deno.openKv();

interface CacheData<T extends ContentfulEntry> {
  ts: number;
  result: QueryResult<T>;
}

export async function query<T extends ContentfulEntry>(
  preview = false,
  params: Record<string, string | number | string[]>
): Promise<QueryResult<T>> {
  const result: QueryResult<T> = {
    items: [],
    includes: { Entry: [], Asset: [] }
  };

  const key = ["query", JSON.stringify(params)];

  if (!preview) {
    const cached = await kv.get<CacheData<T>>(key);
    if (cached.value) {
      if (Date.now() - cached.value.ts < 1000 * 60 * 5) {
        return cached.value.result as QueryResult<T>;
      }
    }
  }

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

    if (!preview) await kv.set(key, { ts: Date.now(), result });
  } catch (e) {
    console.error(e);
  }

  return result;
}
