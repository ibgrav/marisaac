import type { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";

export function createStatusFilters(preview?: boolean) {
  const filters: QueryDatabaseParameters["filter"] = {
    or: [{ type: "status", property: "Status", status: { equals: "Done" } }]
  };

  if (preview) {
    filters.or.push({ type: "status", property: "Status", status: { equals: "In Progress" } });
  }

  return filters;
}
