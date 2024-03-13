import type { Alias } from "@rollup/plugin-alias";
import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import type { RollupReplaceOptions } from "@rollup/plugin-replace";
import replace from "@rollup/plugin-replace";
import type { ModuleSideEffectsOption, RollupOptions } from "rollup";
import copy from "rollup-plugin-copy";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";
import { shebang } from "rollup-plugin-resolve-shebang";

const isProduction = process.env["NODE_ENV"] === "production";

export interface FileInfo {
  base: string;
  files: string[];
  target?: string;
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
  alias?: Alias[] | { [find: string]: string };
  moduleSideEffects?: ModuleSideEffectsOption;
}

export const rollupBundle = (
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
    alias: entries,
    replace: replaceOptions,
    moduleSideEffects = (id): boolean =>
      id.endsWith(".css") || id.endsWith(".scss"),
  }: BundleOptions = {},
): RollupOptions[] => [
  {
    input:
      typeof filePath === "object"
        ? Object.fromEntries(
            filePath.files.map((item) => [
              item,
              `./src/${filePath.base}/${item}.ts`,
            ]),
          )
        : `./src/${filePath}.ts`,

    output: [
      {
        ...(typeof filePath === "object"
          ? {
              dir: `./lib/${filePath.target || filePath.base}`,
              entryFileNames: "[name].js",
            }
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
        ? replace({
            preventAssignment: true,
            ...replaceOptions,
          })
        : null,
      entries
        ? alias({
            entries,
          })
        : null,
      preserveShebang ? shebang() : null,
      ...(resolve ? [nodeResolve({ preferBuiltins: true }), commonjs()] : []),
      esbuild({
        charset: "utf8",
        minify: isProduction,
        target: "node18",
      }),
      copyOptions.length
        ? copy({
            targets: copyOptions.map((item) =>
              typeof item === "string"
                ? { src: `./src/${item}`, dest: `./lib/${item}` }
                : { src: `./src/${item[0]}`, dest: `./lib/${item[1]}` },
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
              "@vuepress/helper/client",
              "@vueuse/core",
              "vue",
              "vuepress/client",
              "vuepress/shared",
              "vuepress-shared/client",
              /\.s?css(?:\?module)?$/,
            ]
          : (
                typeof filePath === "object"
                  ? filePath.base.startsWith("node") ||
                    filePath.base.startsWith("cli")
                  : filePath.startsWith("node/") || filePath.startsWith("cli/")
              )
            ? [
                /^node:/,
                "@vuepress/helper",
                /^@vuepress\/plugin-/,
                "vuepress/cli",
                "vuepress/core",
                "vuepress/shared",
                "vuepress/utils",
                /^vuepress-plugin-/,
                "vuepress-shared/node",
              ]
            : []),
      ...external,
    ],

    treeshake: {
      moduleSideEffects,
      preset: "smallest",
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
                  ]),
                )
              : `./src/${filePath}.ts`,
          output: [
            {
              ...(typeof filePath === "object"
                ? {
                    dir: `./lib/${filePath.target || filePath.base}`,
                    entryFileNames: "[name].d.ts",
                  }
                : { file: `./lib/${filePath}.d.ts` }),

              format: "esm",
            },
          ],
          plugins: [
            entries
              ? alias({
                  entries,
                })
              : null,
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
                ? [
                    /^@temp/,
                    "vuepress/client",
                    "vuepress/shared",
                    "vuepress-shared/client",
                    /\.s?css$/,
                  ]
                : (
                      typeof filePath === "object"
                        ? filePath.base.startsWith("node")
                        : filePath.startsWith("node/")
                    )
                  ? [
                      /^node:/,
                      "vuepress/cli",
                      "vuepress/core",
                      "vuepress/shared",
                      "vuepress/utils",
                      "vuepress-shared/node",
                    ]
                  : []),
            ...dtsExternal,
          ],
        } as RollupOptions,
      ]
    : []),
];
