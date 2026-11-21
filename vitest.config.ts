import { createRequire } from "node:module";
import path from "node:path";

import type { VuepressTestPluginOptions } from "@vuepress/test-utils";
import type { Plugin } from "vite";
import { defineConfig } from "vitest/config";

interface TestUtilsAlias {
  find: string | RegExp;
  replacement: string;
}

interface VuepressTestUtilsConfig {
  resolve?: { alias?: TestUtilsAlias[] | Record<string, string> };
  test?: { setupFiles?: string[] };
}

// Normalize separators, so the workarounds below also work when paths use `\`.
const toPosix = (file: string): string => file.replaceAll("\\", "/");

// `vuepressTestPlugin` is exported at runtime but missing from the published type declarations.
const { vuepressTestPlugin } = (await import("@vuepress/test-utils")) as unknown as {
  vuepressTestPlugin: (options?: VuepressTestPluginOptions) => Plugin;
};

// `@vuepress/test-utils@2.0.0-rc.139` assumes its code is bundled in `dist/`, so the plugin
// derives paths from `dist/` while the published code lives in `dist/node/`:
//
// - `dist/setup` instead of `dist/node/setup.js` for `test.setupFiles`
// - `dist/virtual/<name>` instead of `dist/node/virtual/<name>.js` for the `@internal/*` aliases
//
// Fix both returned values until the package is fixed upstream.
const testUtilsEntry = createRequire(import.meta.url).resolve("@vuepress/test-utils");
const testUtilsDir = path.dirname(testUtilsEntry);

const testUtilsSetupFile = path.resolve(testUtilsDir, "setup.js");

const fixTestUtilsAliases = (aliases: unknown): unknown => {
  if (!Array.isArray(aliases)) return aliases;

  return aliases.map((alias: unknown) => {
    if (
      typeof alias !== "object" ||
      alias == null ||
      !("replacement" in alias) ||
      typeof alias.replacement !== "string" ||
      !toPosix(alias.replacement).includes("/dist/virtual/")
    )
      return alias;

    return {
      ...alias,
      replacement: path.resolve(testUtilsDir, "virtual", `${path.basename(alias.replacement)}.js`),
    };
  });
};

const fixTestUtilsConfig = (plugin: Plugin): Plugin => {
  const configHook = plugin.config;

  if (typeof configHook !== "function") return plugin;

  return {
    ...plugin,
    async config(config, env) {
      const result = (await configHook.call(this, config, env)) as VuepressTestUtilsConfig | null;

      if (!result) return result;

      if (result.test?.setupFiles?.length) {
        result.test.setupFiles = result.test.setupFiles.map((file) =>
          toPosix(file).endsWith("/setup") ? testUtilsSetupFile : file,
        );
      }

      if (result.resolve?.alias) {
        result.resolve.alias = fixTestUtilsAliases(result.resolve.alias) as
          | TestUtilsAlias[]
          | Record<string, string>;
      }

      return result;
    },
  };
};

export default defineConfig({
  plugins: [fixTestUtilsConfig(vuepressTestPlugin())],
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
