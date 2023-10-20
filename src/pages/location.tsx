import "./location.css";

import { formatAlbumDate } from "../contentful/format-date.ts";
import { image } from "../contentful/image.ts";
import { Page404 } from "./404.tsx";
import { useAlbums } from "../contentful/use-albums.ts";
import { useLocation } from "wouter";

export function PageLocation() {
  const [location] = useLocation();

  const albums = useAlbums();

  // loading
  if (albums === null) return null;

  const album = albums?.find((album) => album.slug === location.slice(1));

  if (!album) return <Page404 />;

  const displayDate = formatAlbumDate(album);

  return (
    <div className="location" id="container">
      <h2>
        <span>{album.title}</span>
        <time dateTime={album.startDate}>{displayDate}</time>
      </h2>

      <section>
        {album.images?.items?.map((asset, i) => {
          const data = image(asset, { width: 1000 });
          if (!data) return null;

          const imageElement = (
            <img
              key={i}
              loading={i === 0 ? "eager" : "lazy"}
              src={data.src}
              width={data.width + "px"}
              height={data.height + "px"}
              className={asset.description ? "caption" : ""}
              alt={asset.description || album.title}
              style={{ backgroundImage: `url(${data.placeholder})` }}
            />
          );

          if (asset.description) {
            return (
              <figure key={i}>
                {imageElement}
                <figcaption>{asset.description}</figcaption>
              </figure>
            );
          }

          return imageElement;
        })}
      </section>
    </div>
  );
}
