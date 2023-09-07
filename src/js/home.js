import { createContentfulQuery } from "./contentful/create-query.js";
import { html } from "./html.js";

export async function home() {
  const query = createContentfulQuery(true);

  const entries = await query({
    include: 1,
    content_type: "post",
    select: "sys.id,fields.title,fields.slug"
  });

  entries.items.forEach((/** @type {import('./types').PostEntry } */ entry) => {
    document.body.innerHTML += html`
      <section>
        <h2>
          <a href="/post/${entry.fields.slug}">${entry.fields.title}</a>
        </h2>
      </section>
    `;
  });
}
