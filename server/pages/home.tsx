import { getImages } from "../contentful/get-images.ts";
import { image } from "../contentful/image.ts";
import { query } from "../contentful/query.ts";
import { Document } from "../templates/document.tsx";
import { Location } from "../types.ts";
import { css } from "../utils.tsx";

export async function home(preview: boolean) {
  const locations = await query<Location>(preview, {
    content_type: "location"
  });

  const children = await Promise.all(
    locations.items.map(async (location) => {
      const images = await getImages(preview, location);

      return (
        <section>
          <div className="album">
            <div className="bg" />

            {images.slice(0, 8).map((asset, i) => {
              const data = image(asset, { ratio: "1:1", width: 200 });
              if (!data) return null;

              return (
                <img
                  key={i}
                  loading="lazy"
                  src={data.src}
                  aria-hidden="true"
                  width={data.width + "px"}
                  height={data.height + "px"}
                  style={{ backgroundImage: `url(${data.placeholder})` }}
                />
              );
            })}
          </div>

          <h2>
            <a href={`/location/${location.fields.slug}`}>{location.fields.title}</a>
          </h2>
        </section>
      );
    })
  );

  return (
    <Document>
      {css`
        .container {
          display: flex;
          flex-flow: column;
          gap: 1.5em;
          margin-bottom: 4em;
        }

        section {
          display: flex;
          flex-flow: column;
          justify-content: space-between;
        }

        h2 {
          margin-top: -20%;
          margin-bottom: 6vw;
          font-size: 1.5em;
          text-align: center;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
        }

        .album {
          position: relative;
          display: grid;
          overflow: hidden;
          border-radius: 0.5em;
          grid-template-columns: repeat(4, 1fr);
          box-shadow: 0px -3px 10px -10px black;
        }

        .bg {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(var(--c-drab), 1) 90%);
        }
      `}

      <div className="container">{children}</div>
    </Document>
  );
}
