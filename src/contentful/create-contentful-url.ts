export function createContentfulUrl(params: Record<string, string | undefined> = {}) {
  const url = new URL(`/spaces/${import.meta.env.VITE_SPACE_ID}/environments/master/entries`, `https://preview.contentful.com`);

  url.searchParams.set("access_token", import.meta.env.VITE_PREVIEW_TOKEN);

  for (const [key, value] of Object.entries(params)) {
    if (value) url.searchParams.set(key, value);
  }

  return url;
}
