import { createClient } from "contentful";

export function createContentfulClient() {
  return createClient({
    space: import.meta.env.SPACE_ID,
    host: `${import.meta.env.DEV ? "preview" : "cdn"}.contentful.com`,
    accessToken: import.meta.env.DEV
      ? import.meta.env.PREVIEW_TOKEN
      : import.meta.env.DELIVERY_TOKEN,
  }).withoutUnresolvableLinks;
}
