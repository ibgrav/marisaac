import { getImages } from "../contentful/get-images.ts";
import { image } from "../contentful/image.ts";
import { query } from "../contentful/query.ts";
import { Document } from "../templates/document.tsx";
import { Location } from "../types.ts";
import { css } from "../utils.tsx";
import { error404 } from "./404.tsx";

export async function location(preview: boolean, slug: string) {
  const locations = await query<Location>(preview, {
    content_type: "location",
    "fields.slug": slug
  });

  const location = locations.items[0];
  if (!location) return error404();

  const images = await getImages(preview, location);

  return (
    <Document title={location.fields.title}>
      {css`
        h2 {
          font-size: 1.3em;
          margin: 1em 0.25em 0.5em 0.25em;
          border-bottom: 1px solid rgb(var(--c-vanilla));
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
        <h2>{location.fields.title}</h2>

        <section>
          {images.map((asset, i) => {
            const data = image(asset, { ratio: "3:4", width: 800 });
            if (!data) return null;

            return (
              <div>
                <img
                  key={i}
                  loading="lazy"
                  src={data.src}
                  width={data.width + "px"}
                  height={data.height + "px"}
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
