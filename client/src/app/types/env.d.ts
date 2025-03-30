/// <reference types="vite/client" />
/* eslint-disable @typescript-eslint/consistent-type-definitions */

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_API_URL: string; 
  readonly VITE_API_PROD_URL: string;
  readonly VITE_MODE: 'development' | 'production';
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
