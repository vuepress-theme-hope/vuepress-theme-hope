import { path } from "@vuepress/utils";
import { getRootLangPath } from "@mr-hope/vuepress-shared";
import { i18n } from "./i18n";

import type { PluginI18nConvert } from "@mr-hope/vuepress-shared";
import type { Plugin } from "@vuepress/core";
import type { PhowoSwipeI18n, PhotoSwipeOptions } from "../shared";

export type { PhotoSwipeOptions } from "../shared";

const photoSwipePlugin: Plugin<PhotoSwipeOptions> = (options, app) => {
  const option =
    Object.keys(options).length > 0
      ? options
      : (app.options.themeConfig.photoSwipe as PhotoSwipeOptions) || {};

  const photoSwipeI18nConfig = i18n as PluginI18nConvert<PhowoSwipeI18n>;

  photoSwipeI18nConfig["/"] = photoSwipeI18nConfig[getRootLangPath(app)];

  return {
    name: "photo-swipe",

    define: (): Record<string, unknown> => ({
      IMAGE_CONTAINER: option.container || ".theme-default-content",
      IMAGE_SELECTOR: option.selector || ".theme-default-content :not(a) > img",
      PHOTOSWIPE_OPTIONS: option.options || {},
      PHOTOSWIPE_I18N: photoSwipeI18nConfig,
    }),

    clientAppRootComponentFiles: path.resolve(
      __dirname,
      "../client/root-components/PhotoSwipe.js"
    ),

    plugins: [["@mr-hope/palette"]],
  };
};

export default photoSwipePlugin;
