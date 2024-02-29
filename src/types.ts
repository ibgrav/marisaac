import type { EntryFieldTypes, EntrySkeletonType } from "contentful";

export type Album = EntrySkeletonType<
  {
    slug: EntryFieldTypes.Symbol;
    title: EntryFieldTypes.Symbol;
    startDate: EntryFieldTypes.Date;
    images: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  },
  "album"
>;
