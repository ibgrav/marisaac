import "./index.css";

import { contentfulFetch } from "./contentful/contentful-fetch";
import { initializeLivePreview } from "./contentful/live-preview";
import type { PostEntry } from "./types";
import Home from "./components/home.svelte";
import Post from "./components/post.svelte";
import { store } from "./store";

initialize();

async function initialize() {
  await initializeLivePreview();

  const target = document.getElementById("app")!;

  const posts = await contentfulFetch<PostEntry>({
    content_type: "post",
    select: "sys.id,fields.title,fields.slug"
  });

  store.update((p) => ({ ...p, posts: posts.items }));

  if (location.pathname === "/") {
    new Home({ target });
  } else {
    const result = await contentfulFetch<PostEntry>({
      limit: "10",
      content_type: "post",
      "fields.slug": location.pathname.substring(1),
      select: "sys.id,fields.title,fields.slug,fields.publishDate,fields.content"
    });

    store.update((p) => ({ ...p, post: result.items[0] }));

    new Post({ target });
  }
}
