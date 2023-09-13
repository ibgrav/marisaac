<script lang="ts">
  import { onMount } from "svelte";
  import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
  import type { PageData } from "./$types";
  import type { PostEntry } from "$lib";

  export let data: PageData;

  const coordinate = data.items[0];

  let map: mapkit.Map;
  let annotationSelected = false;
  let post: PostEntry | undefined = undefined;

  onMount(async () => {
    if (!window.mapkit || (window.mapkit as any).loadedLibraries.length === 0) {
      await new Promise((resolve) => {
        window.initMapKit = resolve;
      });
    }

    const { mapkit } = window;

    mapkit.init({
      authorizationCallback: async (done: (str: string) => void) => {
        const res = await fetch("/map/token");
        const token = await res.text();
        done(token);
      }
    });

    map = new mapkit.Map("map", {
      mapType: mapkit.Map.MapTypes.Standard,
      showsCompass: mapkit.FeatureVisibility.Hidden,
      showsZoomControl: false,
      showsMapTypeControl: false,
      showsScale: mapkit.FeatureVisibility.Hidden,
      colorScheme: mapkit.Map.ColorSchemes.Dark,
      showsUserLocation: false,
      showsUserLocationControl: false,
      tracksUserLocation: false,
      isScrollEnabled: false
    });
    map.cameraDistance = 1500;

    const cord = new mapkit.Coordinate(coordinate.fields.coordinates.lat, coordinate.fields.coordinates.lon);

    map.center = cord;

    map.cameraZoomRange = new mapkit.CameraZoomRange(1500, 1500);

    const annotation = new mapkit.MarkerAnnotation(cord, {
      color: "#c969e0"
    });

    annotation.addEventListener("select", async () => {
      const res = await fetch(`/post?slug=my-first-post`);
      post = await res.json();

      annotationSelected = true;
    });

    map.showItems([annotation]);

    console.log({ map });
  });
</script>

<svelte:head>
  <script
    src="https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.core.js"
    crossorigin="anonymous"
    async
    data-callback="initMapKit"
    data-libraries="map,annotations"
  ></script>
</svelte:head>

{#if annotationSelected}
  <article>
    <button on:click={() => (annotationSelected = false)}>close</button>

    {#if post}
      <h2>{post.fields.title}</h2>
      <div>{@html documentToHtmlString(post.fields.content)}</div>
    {/if}
  </article>
{/if}

<div id="map" />

<style>
  :global(body) {
    margin: 0;
  }

  #map,
  :global(html),
  :global(body) {
    width: 100vw;
    height: 100vh;
  }

  article {
    padding: 1em;
    overflow: scroll;
    z-index: 100;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    color: white;
    background: rgba(0, 0, 0, 0.8);
  }
</style>
