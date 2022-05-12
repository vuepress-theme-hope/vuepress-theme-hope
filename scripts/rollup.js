import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import copy from "rollup-plugin-copy";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
import shebang from "./shebang";

const isProduction = process.env.mode === "production";

export const rollupTypescript = (
  filePath,
  {
    dts: enableDts = true,
    external = [],
    dtsExternal = [],
    resolve = false,
    copy: copyOptions = [],
    tsconfig = {},
    output = {},
    inlineDynamicImports = true,
    preserveShebang = false,
  } = {}
) => [
  {
    input: `./src/${filePath}.ts`,
    output: [
      {
        file: `./lib/${filePath}.js`,
        format: filePath.startsWith("client/") ? "esm" : "cjs",
        sourcemap: true,
        exports: "named",
        ...output,
      },
    ],
    plugins: [
      ...(preserveShebang ? [shebang()] : []),
      typescript(tsconfig),
      json(),
      ...(resolve ? [nodeResolve({ preferBuiltins: true }), commonjs()] : []),
      ...(isProduction ? [terser()] : []),
      ...(copyOptions.length
        ? [
            copy({
              targets: copyOptions.map((item) =>
                typeof item === "string"
                  ? { src: `./src/${item}`, dest: `./lib/${item}` }
                  : { src: `./src/${item[0]}`, dest: `./lib/${item[1]}` }
              ),
            }),
          ]
        : []),
    ],
    inlineDynamicImports,
    external,
    treeshake: {
      unknownGlobalSideEffects: false,
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
        },
      ]
    : []),
];
