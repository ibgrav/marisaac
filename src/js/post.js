import { createContentfulQuery } from "./contentful/create-query.js";
import { renderRichText } from "./contentful/render-rich-text.js";
import { html } from "./html.js";

/**
 * @param {string} slug
 */
export async function post(slug) {
  const query = createContentfulQuery(true);

  const entries = await query({
    content_type: "post",
    "fields.slug": slug,
    limit: 1
  });

  /** @type {import('./types').PostEntry | undefined} */
  const post = entries?.items?.[0];

  if (post?.fields) {
    const main = document.createElement("main");

    main.innerHTML = html`
      <h1>${post.fields.title}</h1>
      <article>${renderRichText(post.fields.content)}</article>
    `;

    document.body.append(main);
  }
}
