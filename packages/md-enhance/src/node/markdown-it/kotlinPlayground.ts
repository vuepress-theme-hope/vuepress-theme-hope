import { encodeData, entries } from "@vuepress/helper";
import type { PluginSimple } from "markdown-it";

import type { PlaygroundData } from "../typings/index.js";
import { playground } from "./playground/index.js";

export const kotlinPlayground: PluginSimple = (md) => {
  md.use(playground, {
    name: "kotlin-playground",
    component: "KotlinPlayground",
    propsGetter: ({ title = "", key, files, settings }: PlaygroundData) => ({
      title,
      key,
      settings: encodeURIComponent(JSON.stringify(settings)),
      files: encodeData(
        JSON.stringify(entries(files).map(([, { content }]) => content)),
      ),
    }),
  });
};
