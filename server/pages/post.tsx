import { image } from "../contentful/image.ts";
import { query } from "../contentful/query.ts";
import { resolveAsset } from "../contentful/resolve.ts";
import { Document } from "../templates/document.tsx";
import { Post } from "../types.ts";
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
      `}

      <h2>{post.fields.title}</h2>

      {post.fields.content && (
        <div
          dangerouslySetInnerHTML={{
            __html: documentToHtmlString(post.fields.content, {
              renderNode: {
                ["embedded-asset-block"]: (node) => {
                  const asset = resolveAsset(posts.includes, node.data.target);
                  const img = image(asset, { width: 1000 });

                  if (img) return `<img src="${img.src}" width="${img.width}" height="${img.height}" alt="" />`;
                  return "";
                }
              }
            })
          }}
        />
      )}
    </Document>
  );
}
