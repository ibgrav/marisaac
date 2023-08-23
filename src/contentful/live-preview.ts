import type { ContentfulLivePreview as ContentfulLivePreviewType } from "@contentful/live-preview";
import type { PostEntry } from "../types";
import { store } from "../store";

declare global {
  interface Window {
    contentfulPreviewMode: boolean;
  }
}

interface ContentfulLivePreviewMessage<T> {
  action?: "ENTRY_UPDATED";
  entity?: T;
}

let ContentfulLivePreview: typeof ContentfulLivePreviewType;

export async function initializeLivePreview() {
  if (window.self !== window.top && !ContentfulLivePreview) {
    window.contentfulPreviewMode = true;

    await import("@contentful/live-preview/style.css");

    const livePreviewModules = await import("@contentful/live-preview");

    ContentfulLivePreview = livePreviewModules.ContentfulLivePreview;
    ContentfulLivePreview.init({ locale: "en-US", debugMode: true, enableLiveUpdates: true, enableInspectorMode: true });

    window.addEventListener("message", (event: MessageEvent) => {
      const data = event.data as ContentfulLivePreviewMessage<PostEntry>;

      if (data.action === "ENTRY_UPDATED" && data?.entity) {
        store.update((p) => ({ ...p, post: data.entity }));
      }
    });
  }
}
