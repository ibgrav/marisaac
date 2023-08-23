import type { ContentfulEntry } from "../types";

export function editAttributes(entry: ContentfulEntry, field: string) {
  return {
    "data-contentful-entry-id": entry.sys.id,
    "data-contentful-field-id": field
  };
}
