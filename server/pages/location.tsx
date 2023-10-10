import { getImages } from "../contentful/get-images.ts";
import { image } from "../contentful/image.ts";
import { query } from "../contentful/query.ts";
import { Document } from "../templates/document.tsx";
import { Location, Post } from "../types.ts";
import { css } from "../utils.tsx";
import { error404 } from "./404.tsx";

export async function location(preview: boolean, slug: string) {
  const locations = await query<Location>(preview, {
    content_type: "location",
    "fields.slug": slug,
    limit: 1
  });

  const location = locations.items[0];
  if (!location) return error404();

  const posts = await query<Post>(preview, {
    content_type: "post",
    "fields.location.sys.id": location.sys.id
  });

  const images = await getImages(preview, location);

  return (
    <Document title={location.fields.title}>
      {css`
        .text {
          margin: 1em 0.25em 1em 0.25em;
        }

        .text a {
          margin-bottom: 0.5em;
        }

        h2 {
          font-size: 1.3em;
          margin-bottom: 1.5em;
        }

        section {
          display: flex;
          flex-flow: column;
          gap: 0.5em;
        }

        img {
          border-radius: 0.5em;
        }

        p {
          margin: 0.25em;
        }
      `}

      <div id="container">
        <div className="text">
          <h2>{location.fields.title}</h2>

          {posts.items.map((post) => {
            return <a href={`/post/${post.fields.slug}`}>{post.fields.title}</a>;
          })}
        </div>

        <section>
          {images.map((asset, i) => {
            const data = image(asset, { width: 1000 });
            if (!data) return null;

            return (
              <div>
                <img
                  key={i}
                  loading="lazy"
                  src={data.src}
                  width={data.width + "px"}
                  height={data.height + "px"}
                  alt={asset.fields.description || location.fields.title}
                  style={{ backgroundImage: `url(${data.placeholder})` }}
                />

                {asset.fields.description && <p>{asset.fields.description}</p>}
              </div>
            );
          })}
        </section>
      </div>
    </Document>
  );
}
