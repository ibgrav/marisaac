import type { Entry, Includes } from "$lib/types";
import { SPACE_ID, PREVIEW_TOKEN, DELIVERY_TOKEN } from "$env/static/private";

export type GetEntriesResponse<E extends Entry> = {
  items: E[];
  includes: Includes;
};

type GetEntriesParams = {
  content_type?: string;
  limit?: number;
  select?: string[];
  include?: number;
  order?: string;
  [key: `fields.${string}`]: string | undefined;
};

export async function getEntries<E extends Entry>(
  preview: boolean = false,
  params: GetEntriesParams = {}
): Promise<GetEntriesResponse<E>> {
  try {
    const token = preview ? PREVIEW_TOKEN : DELIVERY_TOKEN;

    const url = new URL(
      `/spaces/${SPACE_ID}/environments/master/entries`,
      `https://${preview ? "preview" : "cdn"}.contentful.com`
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

export function getPreview(headers: Headers): boolean {
  const host = headers.get("X-Forwarded-Host") || headers.get("Host") || "localhost";
  return host.includes("preview.") || host.includes("localhost");
}
