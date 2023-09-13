import { APPLE_MAP_TOKEN } from "$env/static/private";
import { getEntries, getPreview, type PostEntry } from "$lib";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async (ctx) => {
  const slug = ctx.url.searchParams.get("slug");

  if (!slug) return new Response(null, { status: 403 });

  const entries = await getEntries<PostEntry>(getPreview(ctx.request.headers), {
    include: 0,
    content_type: "post",
    select: ["fields"],
    "fields.slug": slug
  });

  return json(entries.items[0]);
};
