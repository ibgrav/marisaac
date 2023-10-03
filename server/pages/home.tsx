import { Fragment } from "preact";
import { query } from "../contentful/query.ts";
import { Document } from "../templates/document.tsx";
import { Album } from "../types.ts";
import { resolveAsset } from "../contentful/resolve.ts";
import { image } from "../contentful/image.ts";

export async function home() {
  const { items: albums, includes } = await query<Album>({
    content_type: "album",
    include: 10
  });

  let count = 0;

  return (
    <Document>
      <main className="album">
        <script dangerouslySetInnerHTML={{ __html: `window._ALBUMS=${JSON.stringify(albums.map((a) => a.fields.title))};` }} />

        {albums.map((album, i) => {
          return (
            <Fragment key={i}>
              <section data-gallery={album.fields.title}>
                <h2>{album.fields.title}</h2>
              </section>

              {album.fields.images.map((link) => {
                count++;

                const asset = resolveAsset(includes, link);
                const featured = count % 3 === 0;

                const data = image(asset, { ratio: "3:4" });
                if (!data) return null;

                return (
                  <img
                    key={count}
                    data-gallery={album.fields.title}
                    loading="lazy"
                    src={data.src}
                    width={data.width + "px"}
                    height={data.height + "px"}
                    className={featured ? "featured" : ""}
                    style={{ animationDelay: `${count * 50}ms`, backgroundImage: `url(${data.placeholder})` }}
                  />
                );
              })}
            </Fragment>
          );
        })}
      </main>
    </Document>
  );
}
