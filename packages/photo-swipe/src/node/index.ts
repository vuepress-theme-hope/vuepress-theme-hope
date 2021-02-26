import { resolve } from "path";
import { lang2Path } from "@mr-hope/vuepress-shared";
import { i18n } from "./i18n";

import type { PluginI18nConvert } from "@mr-hope/vuepress-shared";
import type { Context, PluginOptionAPI } from "@mr-hope/vuepress-types";
import type { PhotoSwipeOptions } from "../types";
import type PhotoSwipeDefaultUI from "photoswipe/dist/photoswipe-ui-default";

export = (
  options: PhotoSwipeOptions,
  { themeConfig }: Context
): PluginOptionAPI => {
  const option =
    Object.keys(options).length > 0
      ? options
      : (themeConfig.photoSwipe as PhotoSwipeOptions) || {};

  const baseLang = options.baseLang || themeConfig.baseLang || "en-US";
  const baseLangPath = lang2Path(baseLang);
  const photoSwipeI18nConfig = i18n as PluginI18nConvert<
    PhotoSwipeDefaultUI.ShareButtonData[]
  >;

  photoSwipeI18nConfig["/"] = photoSwipeI18nConfig[baseLangPath];

  return {
    name: "photo-swipe",

    define: (): Record<string, unknown> => ({
      IMAGE_CONTAINER: option.container || ".theme-default-content",
      IMAGE_SELECTOR: option.selector || ".theme-default-content :not(a) > img",
      PHOTOSWIPE_OPTIONS: option.options || {},
      PHOTOSWIPE_I18N: photoSwipeI18nConfig,
    }),

    enhanceAppFiles: resolve(__dirname, "../client/enhanceAppFile.js"),

    globalUIComponents: "PhotoSwipeUI",
  };
};
