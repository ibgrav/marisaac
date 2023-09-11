import { signal } from "@preact/signals";
import { PostEntry } from "./types";

export const posts = signal<PostEntry[]>([]);
