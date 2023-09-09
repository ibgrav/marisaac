/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_CONTENTFUL_SPACE_ID: string;
  readonly PUBLIC_CONTENTFUL_PREVIEW_TOKEN: string;
  readonly PUBLIC_CONTENTFUL_DELIVERY_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
