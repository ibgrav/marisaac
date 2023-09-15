import { getEntries } from "functions/lib/contentful";
import { BlogApi, PostEntry, ServerContext } from "src/types";

export const onRequest = async (ctx: ServerContext) => {
  const data: BlogApi = {
    includes: { Asset: [], Entries: [] },
    posts: []
  };

  try {
    const entries = await getEntries<PostEntry>(ctx, {
      include: 0,
      content_type: "post",
      order: "fields.publishDate",
      select: ["fields.slug", "fields.title", "fields.image"]
    });

    data.includes = entries.includes;
    data.posts = entries.items;
  } catch (e) {
    console.error(e);
  }

  return new Response(JSON.stringify(data), {
    headers: { "content-type": "application/json" }
  });
};
