import { getImages } from "../contentful/get-images.ts";
import { image } from "../contentful/image.ts";
import { query } from "../contentful/query.ts";
import { resolveAsset } from "../contentful/resolve.ts";
import { Document } from "../templates/document.tsx";
import { Album, ContentfulAsset, Location } from "../types.ts";
import { css } from "../utils.tsx";
import { error404 } from "./404.tsx";

export async function location(slug: string) {
  const locations = await query<Location>({
    content_type: "location",
    "fields.slug": slug
  });

  const location = locations.items[0];

  if (!location) return error404();

  const images = await getImages(location);

  return (
    <Document title={location.fields.title}>
      {css`
        main {
          margin: auto;
          max-width: 700px;
          padding: 0.25em;
        }

        h2 {
          font-size: 1.5em;
          margin-bottom: 0.25em;
          border-bottom: 1px solid rgb(var(--c-vanilla));
        }

        section {
          gap: 0.25em;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }

        img {
          border-radius: 4px;
        }

        button {
          grid-column: span 1;
          grid-row: span 1;
        }
      `}

      <main>
        <h2>{location.fields.title}</h2>

        <section>
          {images.map((asset, i) => {
            const data = image(asset, { ratio: "3:4", width: 800 });
            if (!data) return null;

            const full = image(asset, { width: 1920 });

            return (
              <a href={full?.src}>
                <img
                  key={i}
                  loading="lazy"
                  src={data.src}
                  width={data.width + "px"}
                  height={data.height + "px"}
                  style={{ backgroundImage: `url(${data.placeholder})` }}
                />
              </a>
            );
          })}
        </section>
      </main>
    </Document>
  );
}
