import { ContentfulEntry, ContentfulAsset, Includes, Link } from "../types.ts";

export function resolveEntry<T extends ContentfulEntry>(includes?: Includes, link?: Link) {
  return includes?.Entry?.find((entry) => entry?.sys?.id === link?.sys?.id) as T | undefined;
}

export function resolveAsset(includes?: Includes, link?: Link) {
  return includes?.Asset?.find((asset) => asset?.sys?.id === link?.sys?.id) as ContentfulAsset | undefined;
}
