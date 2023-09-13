import type { Asset, Entry, Includes, Link } from "$lib/types";

export function resolveEntry<T extends Entry>(includes: Includes, link: Link): T | undefined {
  return includes.Entries.find((e) => e.sys.id === link.sys.id) as T;
}

export function resolveAsset(includes: Includes, link: Link): Asset | undefined {
  return includes.Asset.find((e) => e.sys.id === link.sys.id);
}
