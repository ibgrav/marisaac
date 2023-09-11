import type { Entry } from "src/types";

export type GetEntriesResponse<E extends Entry> = {
  items: E[];
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
    const preview = Boolean(import.meta.env.VITE_PREVIEW);

    const token = preview ? import.meta.env.VITE_PREVIEW_TOKEN : import.meta.env.VITE_DELIVERY_TOKEN;

    const url = new URL(
      `/spaces/${import.meta.env.VITE_SPACE_ID}/environments/master/entries`,
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
    return { items: [] };
  }
}
