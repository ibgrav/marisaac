import type { Includes, PostEntry } from "src/types";
import { resolveAsset } from "src/lib/resolve-link";
import { image } from "src/lib/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export interface PostProps {
  post: PostEntry;
  includes: Includes;
}

export function Post({ post, includes }: PostProps) {
  const asset = resolveAsset(includes, post.fields.image);
  const src = image(asset?.fields.file.url, { width: 2560, height: 600, fit: "fill", focus: "faces" });

  return (
    <>
      <img src={src} />
      <h1 class="text-4xl font-bold">{post.fields.title}</h1>
      <article>{documentToReactComponents(post.fields.content)}</article>
    </>
  );
}
