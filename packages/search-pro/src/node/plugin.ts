import { getDirname, path } from "@vuepress/utils";
import { watch } from "chokidar";
import { prepareSearchIndex } from "./prepare.js";

import type { Plugin } from "@vuepress/core";
import type { SearchProOptions } from "../shared/index.js";

const __dirname = getDirname(import.meta.url);

export const searchProPlugin: (options: SearchProOptions) => Plugin = (
  options
) => {
  const pluginOptions: SearchProOptions = {
    fullText: true,
    placeholder: "搜索",
    ...options,
    frontmatter: {
      category: options.frontmatter?.category ?? "分类",
      tag: options.frontmatter?.tag ?? "标签",
    },
  };

  return {
    name: "vuepress-plugin-search-pro",

    define: {
      __NEXT_SEARCH_OPTIONS__: pluginOptions,
    },

    clientConfigFile: path.resolve(
      __dirname,
      "../../src/client/core/clientConfig.ts"
    ),

    onPrepared: (app) => prepareSearchIndex(app),

    onWatched: (app, watchers) => {
      const searchIndexWatcher = watch("internal/pageData/*", {
        cwd: app.dir.temp(),
        ignoreInitial: true,
      });

      searchIndexWatcher.on("add", () => prepareSearchIndex(app));
      searchIndexWatcher.on("change", () => prepareSearchIndex(app));
      searchIndexWatcher.on("unlink", () => prepareSearchIndex(app));

      watchers.push(searchIndexWatcher);
    },
  };
};
