import type { Entry, Includes } from "src/types";

export type GetEntriesResponse<E extends Entry> = {
  items: E[];
  includes: Includes;
};

type GetEntriesParams = Record<string, string | number | string[] | undefined>;

export async function getEntries<E extends Entry>(
  previewUrl: string,
  params: GetEntriesParams = {}
): Promise<GetEntriesResponse<E>> {
  try {
    const { SPACE_ID, PREVIEW_TOKEN, DELIVERY_TOKEN, PREVIEW } = import.meta.env;
    const preview = Boolean(PREVIEW) || getPreview(previewUrl);
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

export function getPreview(url: string): boolean {
  return url.includes("preview.") || url.includes("localhost");
}
