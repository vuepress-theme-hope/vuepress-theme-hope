import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import copy from "rollup-plugin-copy";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";
import shebang from "./shebang.js";

const isProduction = process.env.NODE_ENV === "production";

export const rollupTypescript = (
  filePath,
  {
    dts: enableDts = true,
    external = [],
    dtsExternal = [],
    resolve = false,
    copy: copyOptions = [],
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
        format: "esm",
        sourcemap: true,
        exports: "named",
        inlineDynamicImports,
        ...output,
      },
    ],
    plugins: [
      ...(preserveShebang ? [shebang()] : []),
      ...(resolve ? [nodeResolve({ preferBuiltins: true }), commonjs()] : []),
      esbuild({ charset: "utf8", minify: isProduction, target: "node14" }),
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
