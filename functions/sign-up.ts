import * as contentful from "contentful-management";

interface Env {
  CONTENTFUL_ACCESS_TOKEN: string;
  VITE_SPACE_ID: string;
  VITE_PREVIEW_TOKEN: string;
  VITE_DELIVERY_TOKEN: string;
}

export const onRequest: PagesFunction<Env> = async (ctx) => {
  const client = contentful.createClient({ accessToken: ctx.env.CONTENTFUL_ACCESS_TOKEN });

  const space = await client.getSpace(ctx.env.VITE_SPACE_ID);
  const env = await space.getEnvironment("master");

  return new Response(JSON.stringify(env.sys), {
    status: 200,
    headers: {
      "content-type": "application/json"
    }
  });
};
