import {
  addViteSsrNoExternal,
  excludeViteOptimizeDeps,
} from "@mr-hope/vuepress-shared";
import { path } from "@vuepress/utils";

import type { Plugin, PluginConfig } from "@vuepress/core";
import type { AddThisOptions } from "../shared";

/**
 * `vuepress-plugin-add-this` Plugin
 */
export const addThisPlugin: Plugin<AddThisOptions> = (options, app) => {
  if (!options.pubid) {
    console.error("[AddThis]: Please provide a pubid to let plugin work");

    return {
      name: "vuepress-plugin-add-this",
    };
  }

  addViteSsrNoExternal(app, "vuepress-plugin-add-this");
  excludeViteOptimizeDeps(app, "vuepress-plugin-add-this");

  return {
    name: "vuepress-plugin-add-this",

    define: {
      PUB_ID: options.pubid,
    },

    globalUIComponents: "AddThis",

    clientAppRootComponentFiles: path.resolve(
      __dirname,
      "../client/root-components/AddThis.js"
    ),
  };
};

export const addThis = (
  options: AddThisOptions | false
): PluginConfig<AddThisOptions> => ["add-this", options];
