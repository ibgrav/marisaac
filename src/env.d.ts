/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly NOTION_TOKEN: string;
  readonly NOTION_BLOG_DB_ID: string;
  readonly NOTION_GALLERIES_DB_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
