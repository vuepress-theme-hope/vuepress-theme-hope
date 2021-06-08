import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import typescript2 from "rollup-plugin-typescript2";
import rollupCopy from "rollup-plugin-copy";
import dts from "rollup-plugin-dts";
import vue from "rollup-plugin-vue";
import { terser } from "rollup-plugin-terser";
import styles from "rollup-plugin-styles";

const isProduction = process.env.mode === "production";

export const rollupTypescript = (
  filePath,
  {
    external = [],
    dtsExternal = [],
    useStyle = false,
    resolve = false,
    copy = [],
    tsconfig = {},
    output = {},
    inlineDynamicImports = true,
  } = {}
) => [
  {
    input: `./src/${filePath}.ts`,
    output: [
      {
        file: `./${filePath}.js`,
        format: filePath.startsWith("node/") ? "cjs" : "esm",
        sourcemap: true,
        exports: "named",
        ...output,
      },
    ],
    plugins: [
      typescript(tsconfig),
      ...(useStyle ? [styles()] : []),
      ...(resolve ? [nodeResolve(), commonjs()] : []),
      ...(isProduction ? [terser()] : []),
      ...(copy.length
        ? [
            rollupCopy({
              targets: copy.map((item) =>
                typeof item === "string"
                  ? { src: `./src/${item}`, dest: item }
                  : { src: `./src/${item[0]}`, dest: item[1] }
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
  {
    input: `./src/${filePath}.ts`,
    output: [{ file: `./${filePath}.d.ts`, format: "esm" }],
    plugins: [dts()],
    external: dtsExternal,
  },
];

export const rollupVue = (
  filePath,
  {
    external = [],
    dtsExternal = [],
    useStyle = false,
    resolve = false,
    copy = [],
    output = {},
    inlineDynamicImports = true,
  } = {}
) => {
  const temp = filePath.split(".");
  const ext = temp.pop();
  const filename = temp.join(".");

  return [
    {
      input: `./src/${filePath}`,
      output: [
        {
          file: `./${filename}.js`,
          format: filePath.includes("/node/") ? "cjs" : "esm",
          sourcemap: true,
          exports: "named",
          ...output,
        },
      ],
      plugins: [
        vue(),
        typescript2({
          tsconfigOverride: {
            compilerOptions: {
              declaration: false,
              declarationMap: false,
            },
          },
        }),
        ...(useStyle ? [styles()] : []),
        ...(resolve ? [nodeResolve(), commonjs()] : []),
        ...(isProduction ? [terser()] : []),
        ...(copy.length
          ? [
              rollupCopy({
                targets: copy.map((item) =>
                  typeof item === "string"
                    ? { src: `./src/${item}`, dest: item }
                    : { src: `./src/${item[0]}`, dest: item[1] }
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
    ...(ext === "ts"
      ? [
          {
            input: `./src/${filePath}`,
            output: [{ file: `./${filename}.d.ts`, format: "esm" }],
            plugins: [dts()],
            external: dtsExternal,
          },
        ]
      : []),
  ];
};
