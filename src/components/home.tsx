import { image } from "src/lib/image";
import { resolveAsset } from "src/lib/resolve-link";
import type { Includes, PostEntry } from "src/types";

interface HomeProps {
  posts: PostEntry[];
  includes: Includes;
}

export function Home({ posts, includes }: HomeProps) {
  return (
    <main className="flex flex-row flex-wrap gap-8 justify-around">
      {posts.map((post) => {
        const asset = resolveAsset(includes, post.fields.image);
        const src = image(asset?.fields.file.url, { width: 300, height: 480, fit: "fill", focus: "faces" });

        return (
          <a
            className="block relative rounded transition-all duration-1000 overflow-hidden shadow-sm hover:shadow-lg hover:shaddow-inner"
            href={`/post/${post.fields.slug}`}
            target="_self"
          >
            <img src={src} className="w-full hover:scale-105 transition-transform duration-1000" />
            <span className="bg-gradient-to-t font-bold from-gray-500 absolute bottom-0 p-4 w-full text-3xl text-white">
              {post.fields.title}
            </span>
          </a>
        );
      })}
    </main>
  );
}
