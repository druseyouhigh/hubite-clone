/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly STRAPI_URL: string;
  readonly STRAPI_TOKEN: string;
  readonly SITE_URL: string;
  readonly ENABLE_ANALYTICS: string;
  readonly ENABLE_CACHE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 