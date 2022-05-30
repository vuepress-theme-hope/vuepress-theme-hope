import { rollupTypescript } from "../../scripts/rollup";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import vue from "@vuejs/plugin-vue";
import copy from "rollup-plugin-copy";
import dts from "rollup-plugin-dts";
import typescript2 from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import shebangPlugin from "../../scripts/shebang";

const isProduction = process.env.mode === "production";

const rollupBundleTypescript = (
  filePath,
  {
    external = [],
    dtsExternal = [],
    resolve = false,
    copy: copyOptions = [],
    tsconfig = {},
    output = {},
    inlineDynamicImports = true,
    shebang = false,
  } = {}
) => [
  {
    input: `./src/client/${filePath}.ts`,
    output: [
      {
        file: `./lib/bundle/${filePath}.js`,
        format: "esm",
        sourcemap: true,
        exports: "named",
        ...output,
      },
    ],
    plugins: [
      ...(shebang ? [shebangPlugin()] : []),
      typescript(tsconfig),
      ...(resolve ? [nodeResolve({ preferBuiltins: true }), commonjs()] : []),
      ...(isProduction ? [terser()] : []),
      ...(copyOptions.length
        ? [
            copy({
              targets: copyOptions.map((item) =>
                typeof item === "string"
                  ? {
                      src: `./src/client/${item}`,
                      dest: `./lib/bundle/${item}`,
                    }
                  : {
                      src: `./src/client/${item[0]}`,
                      dest: `./lib/bundle/${item[1]}`,
                    }
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
    input: `./src/client/${filePath}.ts`,
    output: [{ file: `./lib/bundle/${filePath}.d.ts`, format: "esm" }],
    plugins: [dts()],
    external: dtsExternal,
  },
];

const rollupBundleVue = (
  filePath,
  {
    dts: enableDts = true,
    external = [],
    dtsExternal = [],
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
      input: `./src/client/${filePath}`,
      output: [
        {
          file: `./lib/bundle/${filename}.js`,
          format: "esm",
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
        ...(resolve ? [nodeResolve({ preferBuiltins: true }), commonjs()] : []),
        ...(isProduction ? [terser()] : []),
        ...(copy.length
          ? [
              copy({
                targets: copy.map((item) =>
                  typeof item === "string"
                    ? {
                        src: `./src/client/${item}`,
                        dest: `./lib/bundle/${item}`,
                      }
                    : {
                        src: `./src/client/${item[0]}`,
                        dest: `./lib/bundle/${item[1]}`,
                      }
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
    ...(ext === "ts" && enableDts
      ? [
          {
            input: `./src/client/${filePath}`,
            output: [{ file: `./lib/bundle/${filename}.d.ts`, format: "esm" }],
            plugins: [dts()],
            external: dtsExternal,
          },
        ]
      : []),
  ];
};

export default [
  rollupBundleVue("module/blog/appEnhance.ts", {
    copy: [
      ["module/blog/assets", "module/blog"],
      ["module/blog/styles", "module/blog"],
    ],
    external: [
      "@theme-hope/composables",
      "@theme-hope/utils",
      "@theme-hope/components/transitions/DropTransition.vue",
      "@theme-hope/module/blog/components/icons/EmptyIcon.vue",
      "@vuepress/client",
      "vue",
      "vue-router",
      "vuepress-plugin-blog2/lib/client",
      "vuepress-shared/lib/client",
      /\.jpg$/,
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),

  rollupBundleTypescript("module/blog/appSetup", {
    external: [
      "@theme-hope/composables",
      "@theme-hope/utils",
      "@vuepress/client",
      "vuepress-plugin-blog2/lib/client",
      "vuepress-shared/lib/client",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),

  rollupBundleTypescript("module/navbar/appEnhance", {
    copy: [["module/navbar/styles", "module/navbar"]],
    external: [
      "@theme-hope/composables",
      "@theme-hope/utils",
      "@vuepress/client",
      "@vuepress/plugin-external-link-icon/lib/client",
      "@vuepress/shared",
      "@vueuse/core",
      "vue",
      "vue-router",
      "vuepress-shared/lib/client",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),

  rollupBundleTypescript("module/outlook/appSetup", {
    external: ["@theme-hope/composables", "@theme-hope/utils", /\.scss$/],
    dtsExternal: [/\.scss$/],
  }),

  rollupBundleTypescript("module/sidebar/appEnhance", {
    copy: [["module/sidebar/styles", "module/sidebar"]],
    external: [
      "@theme-hope/components/transitions/DropTransition.vue",
      "@theme-hope/composables",
      "@theme-hope/utils",
      "@vuepress/client",
      "@vuepress/plugin-external-link-icon/lib/client",
      "@vuepress/shared",
      "vue",
      "vue-router",
      "vuepress-shared/lib/client",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),

  rollupBundleTypescript("module/sidebar/appSetup", {
    external: [
      "@theme-hope/composables",
      "@theme-hope/utils",
      "@vuepress/client",
      "@vuepress/plugin-external-link-icon/lib/client",
      "@vuepress/shared",
      "vue",
      "vue-router",
      "vuepress-shared/lib/client",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),

  rollupBundleVue("appEnhance.ts", {
    copy: [
      ["components/transitions/DropTransition.vue", "components/transitions"],
      ["styles", ""],
    ],
    external: [
      "@theme-hope/components/transitions/DropTransition.vue",
      "@theme-hope/composables",
      "@theme-hope/utils",
      "@vuepress/client",
      "@vuepress/plugin-external-link-icon/lib/client",
      "@vuepress/shared",
      "vue",
      "vue-router",
      "vuepress-shared/lib/client",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),

  rollupBundleTypescript("composables/index", {
    external: [
      "@theme-hope/utils",
      "@vuepress/client",
      "@vuepress/plugin-theme-data/lib/client",
      "vue",
      "vue-router",
      "vuepress-shared/lib/client",
    ],
  }),

  rollupBundleTypescript("utils/index", {
    external: ["@vuepress/shared"],
  }),

  rollupBundleVue("layouts/Layout.ts", {
    external: [
      "@theme-hope/composables",
      "@vuepress/client",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),

  rollupBundleVue("layouts/404.ts", {
    external: [
      "@theme-hope/composables",
      "@vuepress/client",
      "vue",
      "vue-router",
      "vuepress-shared/lib/client",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),

  rollupTypescript("node/index", {
    external: [
      "vuepress-shared",
      "@vuepress/cli",
      "@vuepress/utils",
      "bcrypt-ts",
      "vuepress-plugin-blog2",
      "vuepress-plugin-comment2",
      "vuepress-plugin-components",
      "vuepress-plugin-copy-code2",
      "vuepress-plugin-feed2",
      "vuepress-plugin-md-enhance",
      "vuepress-plugin-photo-swipe",
      "vuepress-plugin-pwa2",
      "vuepress-plugin-reading-time2",
      "vuepress-plugin-sass-palette",
      "vuepress-plugin-seo2",
      "vuepress-plugin-sitemap2",
    ],
  }),
].flat();
