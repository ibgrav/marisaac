import { $ } from "zx";
import { writeFile } from "fs/promises";

import type { PostEntry, ServerContext } from "../src/types.ts";
import { getEntries } from "../functions/lib/contentful.ts";

const url = "http://127.0.0.1:8788";

await $`pnpm build`;

const dev = $`pnpm run dev`;

await ping();

const entries = await getEntries<PostEntry>(mockCtx(), {
  include: 0,
  content_type: "post",
  order: "fields.publishDate",
  select: ["fields.slug", "fields.title", "fields.image"]
});

console.log(entries);

for (const post of entries?.items) {
  const res = await fetch(`${url}/post/${post.fields.slug}`);
  await writeFile(`./${post.fields.slug}/index.html`, await res.text());
}

dev.kill();

function mockCtx() {
  return {
    env: process.env,
    request: { headers: new Map() }
  } as unknown as ServerContext;
}

async function ping(count = 0) {
  try {
    const res = await fetch(url, { method: "HEAD" });
    if (res.ok) return true;
    else throw new Error();
  } catch (e) {
    console.log("dev server not ready, waiting 1s...");

    if (count > 10) throw new Error("Server failed to start");

    return new Promise((resolve) => {
      setTimeout(async () => {
        count += 1;
        await ping(count);
        resolve(true);
      }, 1000);
    });
  }
}
