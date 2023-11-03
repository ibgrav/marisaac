/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SPACE_ID: string;
  readonly VITE_PREVIEW_TOKEN: string;
  readonly VITE_DELIVERY_TOKEN: string;
  readonly VITE_RECAPTCHA_SITE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
