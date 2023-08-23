export function createContentfulUrl(params: Record<string, string | undefined> = {}) {
  const preview = window.contentfulPreviewMode;

  const url = new URL(
    `/spaces/${import.meta.env.VITE_SPACE_ID}/environments/master/entries`,
    `https://${preview ? "preview" : "cdn"}.contentful.com`
  );

  const token = preview ? import.meta.env.VITE_PREVIEW_TOKEN : import.meta.env.VITE_DELIVERY_TOKEN;
  url.searchParams.set("access_token", token);

  for (const [key, value] of Object.entries(params)) {
    if (value) url.searchParams.set(key, value);
  }

  return url;
}
