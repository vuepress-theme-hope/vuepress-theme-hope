import type { PWAI18NConfig } from "../shared";

declare const PWA_I18N: Record<string, PWAI18NConfig>;
declare const SW_PATH: string;

export const serviceWorkerPath = SW_PATH;
export const i18n = PWA_I18N;
