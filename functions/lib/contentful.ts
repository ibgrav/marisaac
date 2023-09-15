import type { Entry, Includes, ServerContext } from "src/types";

export type GetEntriesResponse<E extends Entry> = {
  items: E[];
  includes: Includes;
};

type GetEntriesParams = Record<string, string | number | string[] | undefined>;

export async function getEntries<E extends Entry>(
  ctx: ServerContext,
  params: GetEntriesParams = {}
): Promise<GetEntriesResponse<E>> {
  try {
    const { SPACE_ID, PREVIEW_TOKEN, DELIVERY_TOKEN, PREVIEW } = ctx.env;
    const preview = Boolean(PREVIEW) || getPreview(ctx);
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

export function getPreview(ctx: ServerContext): boolean {
  const host = ctx.request.headers.get("X-Forwarded-Host") || ctx.request.headers.get("Host") || "localhost";

  console.log(ctx.request);

  return host.includes("preview.") || host.includes("localhost");
}
