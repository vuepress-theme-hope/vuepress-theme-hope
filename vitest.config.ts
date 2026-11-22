import { fileURLToPath } from "node:url";

import { vuepressTestPlugin } from "@vuepress/test-utils";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [vuepressTestPlugin()],
  resolve: {
    alias: {
      // theme client alias, keep in sync with the `paths` of the root `tsconfig.json`
      "@theme-hope": fileURLToPath(new URL("packages/theme/src/client", import.meta.url)),
    },
  },
  test: {
    server: {
      deps: {
        // `@vuepress/test-utils` and `@vuepress/helper` are externalized by default, but their
        // client entries import `vuepress/client`, i.e. `@vuepress/client`, which imports the
        // plugin-provided `@internal/*` virtual modules. Node cannot load those modules, so Vite
        // has to process both packages and apply the aliases of the plugin.
        inline: [/@vuepress[+/]test-utils(?:@|[\\/])/u, /@vuepress[+/]helper(?:@|[\\/])/u],
      },
    },
    coverage: {
      enabled: true,
      provider: "istanbul",
      reporter: ["text", "clover", "json"],
    },
    testTimeout: 3000,
  },
});
