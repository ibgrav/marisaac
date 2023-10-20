import { Location } from "../types.ts";

export function formatLocationDate(location: Location) {
  let displayDate = location.fields.startDate;

  if (location.fields.startDate) {
    const d = new Date(location.fields.startDate);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();
    displayDate = `${month}/${date}/${year}`;
  }

  return displayDate;
}
