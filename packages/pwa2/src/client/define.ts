import type { PWALocaleConfig } from "../shared";

declare const PWA_I18N: PWALocaleConfig;
declare const SW_PATH: string;

export const serviceWorkerPath = SW_PATH;
export const i18n = PWA_I18N;
