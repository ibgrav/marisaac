import { type ContentfulClientApi, createClient } from "contentful";

export type ContentfulClient = ContentfulClientApi<"WITHOUT_UNRESOLVABLE_LINKS">;

export function createContentfulClient(preview?: boolean): ContentfulClient {
  return createClient({
    space: import.meta.env.PUBLIC_CONTENTFUL_SPACE_ID,
    environment: "master",
    accessToken: preview ? import.meta.env.PUBLIC_CONTENTFUL_PREVIEW_TOKEN : import.meta.env.PUBLIC_CONTENTFUL_DELIVERY_TOKEN,
    host: `${preview ? "preview" : "cdn"}.contentful.com`
  }).withoutUnresolvableLinks;
}
