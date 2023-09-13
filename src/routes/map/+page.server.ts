import { getEntries, getPreview } from "$lib/contentful";
import type { LocationEntry } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (ctx) => {
  return await getEntries<LocationEntry>(getPreview(ctx.request.headers), {
    include: 0,
    content_type: "location",
    select: ["fields.title", "fields.coordinates"]
  });
};
