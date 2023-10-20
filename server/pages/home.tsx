import { formatLocationDate } from "../contentful/format-date.ts";
import { getImages } from "../contentful/get-images.ts";
import { image } from "../contentful/image.ts";
import { query } from "../contentful/query.ts";
import { Document } from "../templates/document.tsx";
import { Location } from "../types.ts";
import { css } from "../utils.tsx";

export async function home(preview: boolean) {
  const locations = await query<Location>(preview, {
    content_type: "location",
    order: "-fields.startDate"
  });

  const children = await Promise.all(
    locations.items.map(async (location) => {
      const displayDate = formatLocationDate(location);
      const images = await getImages(preview, location);

      return (
        <a href={`/location/${location.fields.slug}`}>
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

          <div className="title">
            <h2>{location.fields.title}</h2>
            <time dateTime={location.fields.startDate}>{displayDate}</time>
          </div>
        </a>
      );
    })
  );

  return (
    <Document>
      {css`
        .container {
          display: flex;
          flex-flow: column;
          margin-bottom: 2em;
        }

        a {
          display: flex;
          flex-flow: column;
          justify-content: space-between;
        }

        .title {
          z-index: 10;
          margin-top: -20%;
          margin-bottom: 10vw;
          text-align: center;
        }

        .title h2 {
          font-size: 1.5em;
          text-decoration: underline;
          text-underline-offset: 0.25em;
        }

        .title time {
          margin-top: 0.5em;
          display: block;
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

        @media (min-width: 740px) {
          h2 {
            margin-top: -145px;
            margin-bottom: 75px;
          }
        }
      `}

      <div className="container">{children}</div>
    </Document>
  );
}
