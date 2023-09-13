import type { Entry, Includes } from "$lib/types";
import { SPACE_ID, PREVIEW, PREVIEW_TOKEN, DELIVERY_TOKEN } from "$env/static/private";

export type GetEntriesResponse<E extends Entry> = {
  items: E[];
  includes: Includes;
};

type GetEntriesParams = {
  content_type: string;
  limit?: number;
  select?: string[];
  include?: number;
  order?: string;
  [key: `fields.${string}`]: string;
};

export async function getEntries<E extends Entry>(params: GetEntriesParams): Promise<GetEntriesResponse<E>> {
  try {
    const token = PREVIEW ? PREVIEW_TOKEN : DELIVERY_TOKEN;

    const url = new URL(
      `/spaces/${SPACE_ID}/environments/master/entries`,
      `https://${PREVIEW ? "preview" : "cdn"}.contentful.com`
    );

    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.append(key, String(value));
    });

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return (await res.json()) as GetEntriesResponse<E>;
  } catch (e) {
    console.error(e);
    return { items: [], includes: { Asset: [], Entries: [] } };
  }
}
