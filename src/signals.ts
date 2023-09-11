import { signal } from "@preact/signals";
import type { PostEntry } from "./types";

export const posts = signal<PostEntry[]>([]);
