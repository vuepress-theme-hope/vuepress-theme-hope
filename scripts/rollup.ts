import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import copy from "rollup-plugin-copy";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";
import { shebangPlugin } from "./shebang.js";

import type { RollupOptions, RollupWarning } from "rollup";

const isProduction = process.env["NODE_ENV"] === "production";

export interface RollupTypescriptOptions {
  dts?: boolean;
  external?: (RegExp | string)[];
  dtsExternal?: (RegExp | string)[];
  resolve?: boolean;
  copy?: (string | [string, string])[];
  output?: Record<string, unknown>;
  inlineDynamicImports?: boolean;
  preserveShebang?: boolean;
}

export const rollupTypescript = (
  filePath: string,
  {
    dts: enableDts = true,
    external = [],
    dtsExternal = [],
    resolve = false,
    copy: copyOptions = [],
    output = {},
    inlineDynamicImports = true,
    preserveShebang = false,
  }: RollupTypescriptOptions = {}
): RollupOptions[] => [
  {
    input: `./src/${filePath}.ts`,
    output: [
      {
        file: `./lib/${filePath}.js`,
        format: "esm",
        sourcemap: true,
        exports: "named",
        inlineDynamicImports,
        ...output,
      },
    ],
    plugins: [
      ...(preserveShebang ? [shebangPlugin()] : []),
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
      ...(copyOptions.length
        ? [
            // FIXME: This is an issue of ts NodeNext
            (copy as unknown as typeof copy.default)({
              targets: copyOptions.map((item) =>
                typeof item === "string"
                  ? { src: `./src/${item}`, dest: `./lib/${item}` }
                  : { src: `./src/${item[0]}`, dest: `./lib/${item[1]}` }
              ),
            }),
          ]
        : []),
    ],
    external,
    treeshake: {
      unknownGlobalSideEffects: false,
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
          input: `./src/${filePath}.ts`,
          output: [{ file: `./lib/${filePath}.d.ts`, format: "esm" }],
          plugins: [
            dts({
              compilerOptions: {
                preserveSymlinks: false,
              },
            }),
          ],
          external: dtsExternal,
        } satisfies RollupOptions,
      ]
    : []),
];
