import { addViteOptimizeDeps, getLocales } from "@mr-hope/vuepress-shared";
import { path } from "@vuepress/utils";
import { useReadingTimePlugin } from "vuepress-plugin-reading-time2";
import { usePalettePlugin } from "vuepress-plugin-sass-palette";
import { pageInfoI18n, walineI18n } from "./i18n";

import type { CommentOptions } from "../shared";
import type { Plugin, PluginObject } from "@vuepress/core";

export * from "../shared";

const commentPlugin: Plugin<CommentOptions> = (options, app) => {
  const { themeConfig } = app.options;
  const commentOptions: CommentOptions =
    Object.keys(options).length > 0
      ? (options as CommentOptions)
      : (themeConfig.comment as CommentOptions) || { type: "disable" };

  addViteOptimizeDeps(app, "@waline/client");

  useReadingTimePlugin(app, { wordPerminute: options.wordPerminute });
  usePalettePlugin(app, { id: "hope" });

  const config: PluginObject = {
    name: "vuepress-plugin-comment2",

    alias: {
      "@Waline":
        commentOptions.type === "waline"
          ? path.resolve(__dirname, "../client/components/Waline.js")
          : "@mr-hope/vuepress-shared/client/noopModule.js",
    },

    define: () => ({
      COMMENT_OPTIONS: {
        hint: !themeConfig.pure,
        ...commentOptions,
      },
      PAGE_INFO_I18N: getLocales(app, pageInfoI18n, options.pageInfoLocale),
      WALINE_I18N: getLocales(app, walineI18n, options.walineLocale),
    }),

    clientAppEnhanceFiles: path.resolve(__dirname, "../client/appEnhance.js"),
  };

  // if (commentOptions.type === "vssue")
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  // config.plugins!.push(["@vssue/vuepress-plugin-vssue", commentOptions]);

  return config;
};

export default commentPlugin;
