import {
  addViteSsrNoExternal,
  addViteOptimizeDepsExclude,
} from "@mr-hope/vuepress-shared";
import { path } from "@vuepress/utils";

import type { PluginObject } from "@vuepress/core";
import type { AddThisOptions } from "../shared";

/**
 * `vuepress-plugin-add-this` Plugin
 */
export const addThisPlugin = ({ pubid }: AddThisOptions): PluginObject => {
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
  };
};
