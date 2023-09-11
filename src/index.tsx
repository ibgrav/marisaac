import "styles/index.css";

import type { PostEntry } from "./types.ts";
import { render } from "preact";
import { getEntries } from "./lib/contentful.ts";
import { posts } from "./signals.ts";
import { Home } from "./components/home.tsx";

// const url = new URL(location.href);
const root = document.getElementById("app")!;

main();

async function main() {
  const postEntries = await getEntries<PostEntry>({
    content_type: "post",
    order: "-fields.publishDate",
    select: ["sys.id", "fields.title", "fields.slug", "fields.publishDate"]
  });

  posts.value = postEntries.items;

  render(<Home />, root);
}
