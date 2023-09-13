import { getEntries, getPreview } from "$lib/contentful";
import type { PostEntry } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (ctx) => {
  return await getEntries<PostEntry>(getPreview(ctx.request.headers), {
    include: 0,
    content_type: "post",
    select: ["fields.slug", "fields.title"]
  });
};
