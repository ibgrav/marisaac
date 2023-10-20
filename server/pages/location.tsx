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
          box-shadow: 0px 5px 10px -8px black;
        }
      `}

      <div id="container">
        <h2>{location.fields.title}</h2>

        <section>
          {images.map((asset, i) => {
            const data = image(asset, { width: 1000 });
            if (!data) return null;

            const imageElement = (
              <img
                key={i}
                loading="lazy"
                src={data.src}
                width={data.width + "px"}
                height={data.height + "px"}
                className={asset.fields.description ? "caption" : ""}
                alt={asset.fields.description || location.fields.title}
                style={{ backgroundImage: `url(${data.placeholder})` }}
              />
            );

            if (asset.fields.description) {
              return (
                <figure>
                  {imageElement}
                  <figcaption>{asset.fields.description}</figcaption>
                </figure>
              );
            }

            return imageElement;
          })}
        </section>
      </div>
    </Document>
  );
}
