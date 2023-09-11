/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly VITE_SPACE_ID: string;
  readonly VITE_PREVIEW_TOKEN: string;
  readonly VITE_DELIVERY_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
