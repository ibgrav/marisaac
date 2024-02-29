import type { Album } from "@/types";
import type { Entry } from "contentful";

export function formatAlbumDate(album?: Entry<Album>) {
  if (!album) return "";

  let displayDate = album.fields.startDate as string;

  if (album.fields.startDate) {
    const d = new Date(album.fields.startDate as string);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();
    displayDate = `${month}/${date}/${year}`;
  }

  return displayDate;
}
