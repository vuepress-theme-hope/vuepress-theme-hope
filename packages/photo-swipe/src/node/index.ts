import { resolve } from "path";
import { getRootLangPath } from "@mr-hope/vuepress-shared";
import { i18n } from "./i18n";

import type { PluginI18nConvert } from "@mr-hope/vuepress-shared";
import type { Plugin } from "@mr-hope/vuepress-types";
import type { PhotoSwipeOptions } from "../types";
import type PhotoSwipeDefaultUI from "photoswipe/dist/photoswipe-ui-default";

const photoSwipePlugin: Plugin<PhotoSwipeOptions> = (options, context) => {
  const option =
    Object.keys(options).length > 0
      ? options
      : context.themeConfig.photoSwipe || {};

  const photoSwipeI18nConfig = i18n as PluginI18nConvert<
    PhotoSwipeDefaultUI.ShareButtonData[]
  >;

  photoSwipeI18nConfig["/"] = photoSwipeI18nConfig[getRootLangPath(context)];

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

export = photoSwipePlugin;
