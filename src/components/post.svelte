<script lang="ts">
  import { editAttributes } from "../contentful/edit-attributes";
  import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
  import type { PostEntry } from "../types";

  import { store } from "../store";
  import { onDestroy } from "svelte";

  let post: PostEntry | undefined;

  const unsub = store.subscribe((props) => {
    post = props.post;
  });

  onDestroy(unsub);
</script>

{#if post}
  <h1 {...editAttributes(post, "title")}>
    {post.fields.title}
  </h1>

  <time {...editAttributes(post, "publishDate")} datetime={post.fields.publishDate}>{post.fields.publishDate}</time>

  {@html documentToHtmlString(post.fields.content)}
{:else}
  <pre>Error 404</pre>
{/if}
