import type { PWALocaleConfig } from "../shared";

declare const PWA_LOCALES: PWALocaleConfig;
declare const SW_PATH: string;

export const serviceWorkerPath = SW_PATH;
export const locales = PWA_LOCALES;
