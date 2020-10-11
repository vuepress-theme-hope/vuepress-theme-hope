import { PluginOptionAPI } from "@mr-hope/vuepress-types";
import { AddThisOptions } from "../types";
import { resolve } from "path";

export = (options: AddThisOptions): PluginOptionAPI => {
  if (!options.pubid) console.error("[add-this]: pubid options must be set");

  return {
    name: "add-this",

    // eslint-disable-next-line @typescript-eslint/naming-convention
    define: { PUB_ID: options.pubid || "" },

    globalUIComponents: "AddThis",

    enhanceAppFiles: resolve(__dirname, "../src/enhanceAppFile.js"),
  };
};
