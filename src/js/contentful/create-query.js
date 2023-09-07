import { CONTENTFUL_DELIVERY_TOKEN, CONTENTFUL_PREVIEW_TOKEN, CONTENTFUL_SPACE_ID } from "../constants.js";

export function createContentfulQuery(preview = false) {
  /**
   * @param {Record<string, number | string | string[] | undefined>} query
   * @returns {Promise<import('../types.js').ContentfulQueryResult>}
   */
  return async (query) => {
    try {
      const url = new URL(
        `/spaces/${CONTENTFUL_SPACE_ID}/environments/master/entries`,
        `https://${preview ? "preview" : "cdn"}.contentful.com`
      );

      for (let [key, value] of Object.entries(query)) {
        if (value) url.searchParams.set(key, String(value));
      }

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${preview ? CONTENTFUL_PREVIEW_TOKEN : CONTENTFUL_DELIVERY_TOKEN}` }
      });

      return await res.json();
    } catch (e) {
      console.error(e);

      return { items: [] };
    }
  };
}
