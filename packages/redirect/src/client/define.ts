import { type RedirectLocaleConfig } from "../shared/index.js";

declare const REDIRECT_LOCALE_CONFIG: RedirectLocaleConfig;
declare const REDIRECT_LOCALE_SWITCH: "direct" | "modal" | false;

export const redirectLocaleConfig = REDIRECT_LOCALE_CONFIG;

export const redirectLocaleSwitch = REDIRECT_LOCALE_SWITCH;
