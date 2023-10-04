import { Album, ContentfulAsset, Location } from "../types.ts";
import { query } from "./query.ts";
import { resolveAsset } from "./resolve.ts";

export async function getImages(location: Location) {
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

  return images;
}
