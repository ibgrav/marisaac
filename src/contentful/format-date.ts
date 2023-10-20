import { Album } from "./use-albums";

export function formatAlbumDate(album: Album) {
  let displayDate = album.startDate;

  if (album.startDate) {
    const d = new Date(album.startDate);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();
    displayDate = `${month}/${date}/${year}`;
  }

  return displayDate;
}
