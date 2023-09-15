import { getEntries } from "functions/lib/contentful";
import { PostEntry, ServerContext } from "src/types";

export const onRequest = async (ctx: ServerContext) => {
  console.log(JSON.stringify(ctx, null, 2));

  const entries = await getEntries<PostEntry>(ctx, {
    include: 0,
    content_type: "post",
    select: ["fields.slug", "fields.title"]
  });

  return new Response(JSON.stringify(entries), {
    headers: { "content-type": "application/json" }
  });
};
