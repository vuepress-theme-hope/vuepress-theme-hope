import { resolve } from "path";
import type { Plugin } from "@mr-hope/vuepress-types";

import type { ActiveHashOptions } from "../types";

const activeHashPlugin: Plugin<ActiveHashOptions> = (options) => ({
  name: "active-hash",

  define: (): Record<string, unknown> => ({
    ACTIVE_HASH_ACTIVE_SELECTOR: options.activeSelecter || ".sidebar-link",
    ACTIVE_HASH_CONTAINER_SELECTOR:
      options.containerSelecter || ".theme-default-content",
    ACTIVE_HASH_HEADER_SELECTOR: options.headerSelector || ".header-anchor",
    ACTIVE_HASH_OFFSET: options.offset || 0,
  }),

  clientRootMixin: resolve(__dirname, "../client/rootMixin.js"),
});

export = activeHashPlugin;
