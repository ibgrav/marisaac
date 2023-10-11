import { image } from "../contentful/image.ts";
import { query } from "../contentful/query.ts";
import { resolveAsset, resolveEntry } from "../contentful/resolve.ts";
import { Document } from "../templates/document.tsx";
import { InlineImage, Post } from "../types.ts";
import { css } from "../utils.tsx";
import { error404 } from "./404.tsx";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

export async function post(preview: boolean, slug: string) {
  const posts = await query<Post>(preview, {
    content_type: "post",
    "fields.slug": slug,
    include: 10,
    limit: 1
  });

  const post = posts.items[0];
  if (!post) return error404();

  return (
    <Document title={post.fields.title}>
      {css`
        h2 {
          font-size: 1.25em;
          margin-bottom: 1em;
        }

        p {
          line-height: 1.1;
          margin-bottom: 1em;
        }

        figure {
          margin-bottom: 0.75em;
        }

        figure.left {
          width: 50%;
          float: left;
          margin-right: 0.75em;
        }

        figure.right {
          width: 50%;
          float: right;
          margin-bottom: 0.75em;
        }

        figure.left figcaption,
        figure.right figcaption {
          padding: 1em 0.5em 0.5em 0.5em;
        }
      `}

      <h2>{post.fields.title}</h2>

      {post.fields.content && (
        <div
          dangerouslySetInnerHTML={{
            __html: documentToHtmlString(post.fields.content, {
              renderNode: {
                ["embedded-entry-block"]: (node) => {
                  const entry = resolveEntry<InlineImage>(posts.includes, node.data.target);
                  const asset = resolveAsset(posts.includes, entry?.fields.asset);
                  const img = image(asset, { width: 1000 });

                  const caption = asset?.fields.description || "";
                  const className = (entry?.fields.align || "").toLowerCase();

                  let html = `<figure class="${className}">`;

                  if (img) {
                    html += `<img src="${img.src}" width="${img.width}" height="${img.height}" alt="${caption}" />`;
                  }

                  if (caption) {
                    html += `<figcaption>${caption}</figcaption>`;
                  }

                  return html + "</figure>";
                }
              }
            })
          }}
        />
      )}
    </Document>
  );
}
