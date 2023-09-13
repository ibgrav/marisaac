import { getEntries } from "$lib/contentful";
import type { PostEntry } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (ctx) => {
  const host =
    ctx.request.headers.get("X-Forwarded-For") ||
    ctx.request.headers.get("X-Forwarded-Host") ||
    ctx.request.headers.get("Host");

  const preview = host?.includes("preview.");

  console.log(ctx.request.headers);

  return await getEntries<PostEntry>(preview, {
    include: 0,
    content_type: "post",
    select: ["fields.slug", "fields.title"]
  });
};
