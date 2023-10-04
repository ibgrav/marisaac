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
      const albums = await query<Album>({
        content_type: "album",
        "fields.location.sys.id": location.sys.id
      });

      const images: ContentfulAsset[] = [];

      albums.items.forEach((album) => {
        album.fields.images?.forEach((image) => {
          const asset = resolveAsset(albums.includes, image);
          if (asset) images.push(asset);
        });
      });

      return (
        <section>
          <h2>{location.fields.title}</h2>

          <div className="album">
            {images.slice(0, 9).map((asset, i) => {
              const data = image(asset, { ratio: "1:1", width: 200 });
              if (!data) return null;

              imageCount++;

              return (
                <img
                  key={i}
                  loading="lazy"
                  src={data.src}
                  width={data.width + "px"}
                  height={data.height + "px"}
                  style={{
                    animationDelay: `${imageCount * 50}ms`,
                    backgroundImage: `url(${data.placeholder})`
                  }}
                />
              );
            })}
          </div>
        </section>
      );
    })
  );

  return (
    <Document>
      {css`
        section {
          padding: 1em 2em;
        }

        a {
          display: block;
          text-decoration: none;
          color: inherit;
          position: relative;
        }

        h2 {
          text-align: center;
          font-size: 1.2em;
          margin: 0 8px 8px 8px;
          padding-bottom: 4px;
          border-bottom: 1px solid rgb(var(--c-vanilla));
        }

        .album {
          display: grid;
          overflow: hidden;
          border-radius: 0.5em;
          grid-template-columns: repeat(3, 1fr);
        }

        img {
          user-select: none;
          grid-column: span 1;
        }
      `}

      <main>{children}</main>
    </Document>
  );
}
