<script lang="ts">
  import { onDestroy } from "svelte";
  import { store } from "../store";
  import type { PostEntry } from "../types";

  let posts: Array<PostEntry> = [];

  const unsub = store.subscribe((props) => {
    posts = props.posts;
  });

  onDestroy(unsub);
</script>

<h1>hello, world</h1>

{#each posts as post}
  <section>
    <h2><a href={post.fields.slug}>{post.fields.title}</a></h2>
  </section>
{/each}
