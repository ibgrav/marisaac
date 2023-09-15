import type { GetEntriesResponse } from "functions/lib/contentful";
import { includes, posts } from "../signals";
import { PostEntry } from "src/types";
import { ComponentChild } from "preact";

export async function renderHome(): Promise<ComponentChild> {
  const res = await fetch("/api/pages/home");
  const data = (await res.json()) as GetEntriesResponse<PostEntry>;

  posts.value = data.items;
  includes.value = data.includes;

  return <Home />;
}

export function Home() {
  return (
    <main>
      {posts.value.map((post, i) => (
        <a key={i} href={`/post/${post.fields.slug}`}>
          <h2>{post.fields.title}</h2>
        </a>
      ))}
    </main>
  );
}
