import { path } from "@vuepress/utils";

import type { Plugin } from "@vuepress/core";
import type { AddThisOptions } from "../shared";

export * from "../shared/types";

const addThisPlugin: Plugin<AddThisOptions> = (options) => ({
  name: "add-this",

  define: {
    PUB_ID: options.pubid || "",
  },

  globalUIComponents: "AddThis",

  clientAppRootComponentFiles: path.resolve(
    __dirname,
    "../client/root-components/AddThis.js"
  ),
});

export default addThisPlugin;
