/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PREVIEW: string;
  readonly SPACE_ID: string;
  readonly PREVIEW_TOKEN: string;
  readonly DELIVERY_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
