import type {
  CommentOptions,
  GiscusOptions,
  WalineOptions,
  WalineLocaleConfig,
} from "../shared";

declare const COMMENT_OPTIONS: CommentOptions;

declare const WALINE_LOCALES: WalineLocaleConfig;

export const commentOptions = COMMENT_OPTIONS;

export const giscusOption = commentOptions as GiscusOptions;

export const enableGiscus = Boolean(
  giscusOption &&
    giscusOption.type === "giscus" &&
    giscusOption.repo &&
    giscusOption.repoId &&
    giscusOption.category &&
    giscusOption.categoryId
);
export const walineOption = commentOptions as WalineOptions;

export const enableWaline = Boolean(
  walineOption && walineOption.type === "waline" && walineOption.serverURL
);

export const walineLocales = WALINE_LOCALES;
