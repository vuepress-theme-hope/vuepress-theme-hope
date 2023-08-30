import type { PluginSimple } from "markdown-it";

import { sandpack } from "./plugin.js";
import { encodeFiles } from "./utils.js";
import type { SandpackData } from "../../typings/index.js";

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
