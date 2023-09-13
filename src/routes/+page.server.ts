import { getEntries } from "$lib/contentful";
import type { PostEntry } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return await getEntries<PostEntry>({
    include: 0,
    content_type: "post",
    select: ["fields.slug", "fields.title"]
  });
};
