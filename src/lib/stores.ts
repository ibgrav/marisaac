import type { Includes, PostEntry } from "$lib/types";
import { writable } from "svelte/store";

export const includes = writable<Includes>({ Asset: [], Entries: [] });
export const posts = writable<Array<PostEntry>>([]);
