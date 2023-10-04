import { getImages } from "../contentful/get-images.ts";
import { image } from "../contentful/image.ts";
import { query } from "../contentful/query.ts";
import { resolveAsset } from "../contentful/resolve.ts";
import { Document } from "../templates/document.tsx";
import { Album, ContentfulAsset, Location } from "../types.ts";
import { css } from "../utils.tsx";

export async function home() {
  const locations = await query<Location>({
    content_type: "location"
  });

  let imageCount = 0;

  const children = await Promise.all(
    locations.items.map(async (location) => {
      const images = await getImages(location);

      return (
        <section>
          <div className="title">
            <a href={`/location/${location.fields.slug}`}>
              <h2>{location.fields.title}</h2>
            </a>
          </div>

          <div className="album">
            {images.slice(0, 9).map((asset, i) => {
              const data = image(asset, { ratio: "1:1", width: 200 });
              if (!data) return null;

              imageCount++;

              return (
                <a href={`/location/${location.fields.slug}`}>
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
          </div>
        </section>
      );
    })
  );

  return (
    <Document>
      <script src="/scripts/home.js" type="module" />

      {css`
        main {
          gap: 1em;
          display: grid;
          margin: 0 1em;
          grid-template-columns: 1fr;
          padding-bottom: 4em;
        }

        section {
          padding: 1em 0;
          max-width: 300px;
          margin: auto;
        }

        .title {
          text-align: center;
          font-size: 1.2em;
          margin: 0 8px 8px 8px;
          padding-bottom: 4px;
          border-bottom: 1px solid rgb(var(--c-vanilla));
        }

        .title.stick {
          margin-top: 26px;
        }

        .album {
          gap: 0.25em;
          display: grid;
          overflow: hidden;
          border-radius: 0.5em;
          grid-template-columns: repeat(3, 1fr);
        }

        img {
          user-select: none;
          grid-column: span 1;
          border-radius: 0.25em;
        }

        @media (min-width: 800px) {
          main {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}

      <main>{children}</main>
    </Document>
  );
}
