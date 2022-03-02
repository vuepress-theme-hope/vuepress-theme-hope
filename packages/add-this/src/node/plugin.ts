import {
  addViteSsrNoExternal,
  addViteOptimizeDepsExclude,
} from "@mr-hope/vuepress-shared";
import { path } from "@vuepress/utils";

import type { Plugin, PluginConfig } from "@vuepress/core";
import type { AddThisOptions } from "../shared";

/**
 * `vuepress-plugin-add-this` Plugin
 */
export const addThisPlugin: Plugin<AddThisOptions> = ({ pubid }) => {
  if (!pubid) {
    console.error("[AddThis]: Please provide a pubid to let plugin work");

    return {
      name: "vuepress-plugin-add-this",
    };
  }

  return {
    name: "vuepress-plugin-add-this",

    define: () => ({ PUB_ID: pubid }),

    onInitialized: (app): void => {
      addViteSsrNoExternal(app, "vuepress-plugin-add-this");
      addViteOptimizeDepsExclude(app, "vuepress-plugin-add-this");
    },

    clientAppRootComponentFiles: path.resolve(
      __dirname,
      "../client/root-components/AddThis.js"
    ),

    globalUIComponents: "AddThis",
  };
};

export const addThis = (
  options: AddThisOptions | false
): PluginConfig<AddThisOptions> => ["add-this", options];
