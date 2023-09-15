import type { PostEntry, Includes } from "src/types";
import { signal } from "@preact/signals";

export const includes = signal<Includes>({ Asset: [], Entries: [] });

export const posts = signal<PostEntry[]>([]);
