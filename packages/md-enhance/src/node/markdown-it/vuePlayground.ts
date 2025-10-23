import { entries, fromEntries } from "@vuepress/helper";
import type { PluginSimple } from "markdown-it";

import type { PlaygroundData } from "../typings/index.js";
import { playground } from "./playground/index.js";

const VUE_SUPPORTED_EXTENSIONS = new Set([
  "html",
  "js",
  "ts",
  "vue",
  "jsx",
  "tsx",
  "json",
]);

const encodeFiles = (files: PlaygroundData["files"]): string =>
  Buffer.from(
    JSON.stringify(
      fromEntries(
        entries(files)
          .filter(([, { ext }]) => VUE_SUPPORTED_EXTENSIONS.has(ext))
          .map(([key, { content }]) => [key, content]),
      ),
    ),
  ).toString("base64");

export const vuePlayground: PluginSimple = (md) => {
  md.use(playground, {
    name: "vue-playground",
    component: "VuePlayground",
    propsGetter: ({ title = "", key, files, settings }: PlaygroundData) => ({
      title,
      key,
      settings: encodeURIComponent(JSON.stringify(settings)),
      files: encodeURIComponent(encodeFiles(files)),
    }),
  });
};
