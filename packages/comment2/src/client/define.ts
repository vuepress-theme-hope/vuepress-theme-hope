import type {
  CommentOptions,
  WalineOptions,
  WalineLocaleConfig,
} from "../shared";

declare const COMMENT_OPTIONS: CommentOptions;

declare const WALINE_LOCALES: WalineLocaleConfig;

export const commentOptions = COMMENT_OPTIONS;

export const walineOption = commentOptions as WalineOptions;

export const enableWaline = Boolean(
  walineOption && walineOption.type === "waline" && walineOption.serverURL
);

export const walineLocales = WALINE_LOCALES;
