import { addViteOptimizeDeps, getLocales } from "@mr-hope/vuepress-shared";
import { path } from "@vuepress/utils";
import { useReadingTimePlugin } from "vuepress-plugin-reading-time2";
import { usePalettePlugin } from "vuepress-plugin-sass-palette";
import { pageInfoLocales, walineLocales } from "./locales";

import type { CommentOptions } from "../shared";
import type { Plugin, PluginObject } from "@vuepress/core";

export * from "../shared";

/** Comment Plugin */
const commentPlugin: Plugin<CommentOptions> = (options, app) => {
  const { themeConfig } = app.options;
  const commentOptions: CommentOptions =
    Object.keys(options).length > 0
      ? (options as CommentOptions)
      : (themeConfig.comment as CommentOptions) || { type: "disable" };

  const userPageInfoLocales = getLocales(
    app,
    pageInfoLocales,
    commentOptions.pageInfoLocales
  );
  const userWalineLocales =
    commentOptions.type === "waline"
      ? getLocales(app, walineLocales, commentOptions.walineLocales)
      : {};

  // remove locales so that they won't be injected in client twice
  delete commentOptions.pageInfoLocales;
  if ("walineLocales" in commentOptions) delete commentOptions.walineLocales;

  addViteOptimizeDeps(app, "@waline/client");

  useReadingTimePlugin(app, { wordPerminute: options.wordPerminute });
  usePalettePlugin(app, { id: "hope" });

  const config: PluginObject = {
    name: "vuepress-plugin-comment2",

    alias: {
      "@Waline":
        commentOptions.type === "waline"
          ? path.resolve(__dirname, "../client/components/Waline.js")
          : "@mr-hope/vuepress-shared/lib/client/noopModule.js",
    },

    define: () => ({
      COMMENT_OPTIONS: {
        hint: !themeConfig.pure,
        ...commentOptions,
      },
      PAGE_INFO_LOCALES: userPageInfoLocales,
      WALINE_LOCALES: userWalineLocales,
    }),

    clientAppEnhanceFiles: path.resolve(__dirname, "../client/appEnhance.js"),
  };

  // TODO: Wait for Vssue to support `v2`
  // if (commentOptions.type === "vssue")
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  // config.plugins!.push(["@vssue/vuepress-plugin-vssue", commentOptions]);

  return config;
};

export default commentPlugin;
