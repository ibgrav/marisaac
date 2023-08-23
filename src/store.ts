import { writable } from "svelte/store";
import type { PostEntry } from "./types";

interface StoreProps {
  post?: PostEntry;
  posts: Array<PostEntry>;
}

export const store = writable<StoreProps>({ posts: [] });
