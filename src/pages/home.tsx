import "./home.css";

import { formatAlbumDate } from "../contentful/format-date.ts";
import { image } from "../contentful/image.ts";
import { useAlbums } from "../contentful/use-albums.ts";
import { Link } from "wouter";

export function PageHome() {
  const albums = useAlbums();

  return (
    <div className="home container">
      {albums?.map((album, i) => {
        const images = album.images?.items ?? [];

        if (images.length < 8) return null;

        return (
          <Link key={i} href={`/${album.slug}`}>
            <a>
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
                <h2>{album.title}</h2>
                <time dateTime={album.startDate}>{formatAlbumDate(album)}</time>
              </div>
            </a>
          </Link>
        );
      })}
    </div>
  );
}
