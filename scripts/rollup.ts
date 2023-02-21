import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace, { type RollupReplaceOptions } from "@rollup/plugin-replace";
import { type RollupOptions, type RollupWarning } from "rollup";
import copy from "rollup-plugin-copy";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";

import { shebangPlugin } from "./shebang.js";

const isProduction = process.env["NODE_ENV"] === "production";

export interface FileInfo {
  base: string;
  files: string[];
}

export interface BundleOptions {
  dts?: boolean;
  external?: (RegExp | string)[];
  dtsExternal?: (RegExp | string)[];
  resolve?: boolean;
  copy?: (string | [string, string])[];
  output?: Record<string, unknown>;
  inlineDynamicImports?: boolean;
  preserveShebang?: boolean;
  replace?: RollupReplaceOptions;
}

export const bundle = (
  filePath: string | FileInfo,
  {
    dts: enableDts = typeof filePath === "object"
      ? !filePath.base.startsWith("cli/") && filePath.base !== "cli"
      : !filePath.startsWith("cli/"),
    external = [],
    dtsExternal = [],
    resolve = false,
    copy: copyOptions = [],
    output = {},
    inlineDynamicImports = typeof filePath !== "object",
    preserveShebang = typeof filePath === "object"
      ? filePath.base.startsWith("cli")
      : filePath.startsWith("cli/"),
    replace: replaceOptions,
  }: BundleOptions = {}
): RollupOptions[] => [
  {
    input:
      typeof filePath === "object"
        ? Object.fromEntries(
            filePath.files.map((item) => [
              item,
              `./src/${filePath.base}/${item}.ts`,
            ])
          )
        : `./src/${filePath}.ts`,

    output: [
      {
        ...(typeof filePath === "object"
          ? { dir: `./lib/${filePath.base}`, entryFileNames: "[name].js" }
          : { file: `./lib/${filePath}.js` }),
        format: "esm",
        sourcemap: true,
        exports: "named",
        inlineDynamicImports,
        ...output,
      },
    ],

    plugins: [
      typeof replaceOptions === "object"
        ? (replace as unknown as typeof replace.default)({
            preventAssignment: true,
            ...replaceOptions,
          })
        : null,
      preserveShebang ? shebangPlugin() : null,
      ...(resolve
        ? [
            nodeResolve({ preferBuiltins: true }),
            // FIXME: This is an issue of ts NodeNext
            (commonjs as unknown as typeof commonjs.default)(),
          ]
        : []),
      // FIXME: This is an issue of ts NodeNext
      (esbuild as unknown as typeof esbuild.default)({
        charset: "utf8",
        minify: isProduction,
        target: "node14",
      }),
      copyOptions.length
        ? // FIXME: This is an issue of ts NodeNext
          (copy as unknown as typeof copy.default)({
            targets: copyOptions.map((item) =>
              typeof item === "string"
                ? { src: `./src/${item}`, dest: `./lib/${item}` }
                : { src: `./src/${item[0]}`, dest: `./lib/${item[1]}` }
            ),
          })
        : null,
    ],

    external: [
      ...(resolve
        ? []
        : (
            typeof filePath === "object"
              ? filePath.base.startsWith("client")
              : filePath.startsWith("client/")
          )
        ? [
            /^@temp/,
            "@vueuse/core",
            "@vuepress/client",
            "@vuepress/shared",
            "vue",
            "vue-router",
            "vuepress-shared/client",
            /\.s?css$/,
          ]
        : (
            typeof filePath === "object"
              ? filePath.base.startsWith("node") ||
                filePath.base.startsWith("cli")
              : filePath.startsWith("node/") || filePath.startsWith("cli/")
          )
        ? [
            /^node:/,
            "@vuepress/core",
            "@vuepress/shared",
            /^@vuepress\/plugin-/,
            "@vuepress/utils",
            /^vuepress-plugin-/,
            "vuepress-shared/node",
          ]
        : []),
      ...external,
    ],

    treeshake: {
      moduleSideEffects: (id) => id.endsWith(".css") || id.endsWith(".scss"),
      preset: "smallest",
    },

    onwarn(
      warning: RollupWarning,
      warn: (warning: RollupWarning) => void
    ): void {
      if (warning.message.includes("Use of eval")) return;

      warn(warning);
    },
  },
  ...(enableDts
    ? [
        {
          input:
            typeof filePath === "object"
              ? Object.fromEntries(
                  filePath.files.map((item) => [
                    item,
                    `./src/${filePath.base}/${item}.ts`,
                  ])
                )
              : `./src/${filePath}.ts`,
          output: [
            {
              ...(typeof filePath === "object"
                ? {
                    dir: `./lib/${filePath.base}`,
                    entryFileNames: "[name].d.ts",
                  }
                : { file: `./lib/${filePath}.d.ts` }),

              format: "esm",
            },
          ],
          plugins: [
            dts({
              compilerOptions: {
                preserveSymlinks: false,
              },
            }),
          ],
          external: [
            ...(resolve
              ? []
              : (
                  typeof filePath === "object"
                    ? filePath.base.startsWith("client")
                    : filePath.startsWith("client/")
                )
              ? [/^@temp/, "vuepress-shared/client", /\.s?css$/]
              : (
                  typeof filePath === "object"
                    ? filePath.base.startsWith("node")
                    : filePath.startsWith("node/")
                )
              ? [/^node:/, "vuepress-shared/node"]
              : []),
            ...dtsExternal,
          ],
        } as RollupOptions,
      ]
    : []),
];
