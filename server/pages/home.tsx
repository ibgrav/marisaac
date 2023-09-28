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

  const images = albums.reduce((p, album) => p.concat(album.fields.images), [] as Album["fields"]["images"]);

  return (
    <Document>
      <h1 class="title">Marissa & Isaac's Adventure</h1>

      <main className="gallery">
        {images.map((link, i) => {
          const asset = resolveAsset(includes, link);
          const featured = (i + 1) % 3 === 0;

          const tf = image(asset, featured);
          if (!tf) return null;

          return (
            <img
              key={i}
              loading="lazy"
              src={tf.src}
              width={tf.width + "px"}
              height={tf.height + "px"}
              className={featured ? "featured" : ""}
              style={{ animationDelay: `${i * 100}ms`, backgroundImage: `url(${tf.placeholder})` }}
            />
          );
        })}
      </main>
    </Document>
  );
}
