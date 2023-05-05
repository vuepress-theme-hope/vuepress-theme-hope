import { type PluginSimple } from "markdown-it";
import { entries, fromEntries } from "vuepress-shared/node";

import { playground } from "./playground/index.js";
import { type PlaygroundData } from "../typings/index.js";

const VUE_SUPPORTED_EXTENSIONS = [
  "html",
  "js",
  "ts",
  "vue",
  "jsx",
  "tsx",
  "json",
];

const encodeFiles = (files: PlaygroundData["files"]): string =>
  Buffer.from(
    JSON.stringify(
      fromEntries(
        entries(files)
          .filter(([, { ext }]) => VUE_SUPPORTED_EXTENSIONS.includes(ext))
          .map(([key, config]) => [key, config.content])
      )
    )
  ).toString("base64");

export const vuePlayground: PluginSimple = (md) => {
  md.use(playground, {
    name: "vue-playground",
    component: "VuePlayground",
    propsGetter: ({ title = "", key, files, settings }: PlaygroundData) => ({
      title,
      key,
      settings: encodeURIComponent(JSON.stringify(settings || {})),
      files: encodeURIComponent(encodeFiles(files)),
    }),
  });
};
