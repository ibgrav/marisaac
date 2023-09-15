import { ComponentChild } from "preact";
import { Map } from "src/components/map";
import { includes, posts } from "src/signals";
import { BlogApi } from "src/types";

export async function renderBlog(): Promise<ComponentChild> {
  const res = await fetch("/api/pages/home");
  const data = (await res.json()) as BlogApi;

  posts.value = data.posts;
  includes.value = data.includes;

  return <Blog />;
}

function Blog() {
  return <Map />;
}
