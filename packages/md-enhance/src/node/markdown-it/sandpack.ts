import type { PluginSimple } from "markdown-it";
import { entries, fromEntries } from "vuepress-shared/node";

import { sandpack } from "./sandpack/index.js";
import type { SandpackData } from "../typings/index.js";

const encodeFiles = (files: SandpackData["files"]): string =>
  Buffer.from(
    JSON.stringify(
      fromEntries(
        entries(files).map(([key, file]) => [key, file.code || file]),
      ),
    ),
  ).toString("base64");

export const mdSandpack: PluginSimple = (md) => {
  md.use(sandpack, {
    name: "sandpack",
    component: "MdSandpack",
    propsGetter: ({
      title = "",
      key,
      template,
      files,
      options,
      customSetup,
    }: SandpackData) => ({
      title,
      key,
      template,
      files: encodeURIComponent(encodeFiles(files)),
      options: encodeURIComponent(JSON.stringify(options || {})),
      customSetup: encodeURIComponent(JSON.stringify(customSetup || {})),
    }),
  });
};
