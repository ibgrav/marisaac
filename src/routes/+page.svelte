<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<main>
  {#each data.items as post}
    <a href={`/post/${post.fields.slug}`}>
      <h2>{post.fields.title}</h2>
    </a>
  {/each}
</main>

<style>
  main {
    margin: 0 auto;
    padding: 0.5em;
  }
</style>
