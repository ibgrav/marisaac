/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SPACE_ID: string;
  readonly PREVIEW_TOKEN: string;
  readonly DELIVERY_TOKEN: string;
  readonly PUBLIC_VENMO_LINK: string;
  readonly PUBLIC_PAYPAL_LINK: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
