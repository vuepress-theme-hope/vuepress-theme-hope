import type { Plugin } from "@vuepress/core";
import { LocaleOptions } from "../client/core/types";
import { path } from "@vuepress/utils";
import * as chokidar from "chokidar";
import { prepareSearchIndex } from "../client/core/prepareSearchIndex";
// import { useSassPalettePlugin } from 'vuepress-plugin-sass-palette'
import { fileURLToPath } from "url";

const nextSearchPlugin: (options: LocaleOptions) => Plugin = (options) => {
  const nextSearchOptions: LocaleOptions = {
    fullText: options.fullText ?? true,
    placeholder: options.placeholder ?? "搜索",
    frontmatter: {
      category: options.frontmatter?.category ?? "分类",
      tag: options.frontmatter?.tag ?? "标签",
    },
    locales: options.locales,
  };
  const __filenameNew = fileURLToPath(import.meta.url);
  const __dirnameNew = path.dirname(__filenameNew);

  return {
    name: "vuepress-plugin-next-search",
    clientConfigFile: path.resolve(
      __dirnameNew,
      "../../src/client/core/clientConfig.ts"
    ),
    define: {
      __NEXT_SEARCH_OPTIONS__: nextSearchOptions,
    },
    onPrepared(app) {
      prepareSearchIndex({ app }).then(() => {});
    },
    onWatched: (app, watchers) => {
      const searchIndexWatcher = chokidar.watch("internal/pageData/*", {
        cwd: app.dir.temp(),
        ignoreInitial: true,
      });
      searchIndexWatcher.on("add", () => {
        prepareSearchIndex({ app }).then(() => {});
      });
      searchIndexWatcher.on("change", () => {
        prepareSearchIndex({ app }).then(() => {});
      });
      searchIndexWatcher.on("unlink", () => {
        prepareSearchIndex({ app }).then(() => {});
      });
      watchers.push(searchIndexWatcher);
    },
  };
};

export { nextSearchPlugin };
