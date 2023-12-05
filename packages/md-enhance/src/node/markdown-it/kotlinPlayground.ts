import type { PluginSimple } from "markdown-it";
import { entries, utoa } from "vuepress-shared/node";

import { playground } from "./playground/index.js";
import type { PlaygroundData } from "../typings/index.js";

export const kotlinPlayground: PluginSimple = (md) => {
  md.use(playground, {
    name: "kotlin-playground",
    component: "KotlinPlayground",
    propsGetter: ({ title = "", key, files, settings }: PlaygroundData) => ({
      title,
      key,
      settings: encodeURIComponent(JSON.stringify(settings || {})),
      files: utoa(
        JSON.stringify(entries(files).map(([, { content }]) => content)),
      ),
    }),
  });
};
