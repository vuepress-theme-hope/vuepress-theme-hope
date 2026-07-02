import { defineHopeConfig } from "oxc-config-hope/oxlint";

export default defineHopeConfig(
  {
    ignore: ["packages/*/assets/**", "**/vendors/lzstring.ts"],

    rules: {
      // the following rules are still not supported by oxlint yet
      // "import-x/no-restricted-paths": [
      //   "error",
      //   {
      //     "zones": [
      //       {
      //         "target": "packages/*/src/client/**",
      //         "from": "packages/*/src/node/**",
      //       },
      //       {
      //         "target": "packages/*/src/node/**",
      //         "from": "packages/*/src/client/**",
      //       },
      //     ],
      //   },
      // ],
      // "vue/multi-word-component-names": [
      //   "error",
      //   { "ignores": ["Blog", "Layout", "Slides"] },
      // ],
      "id-length": [
        "warn",
        {
          min: 2,
          exceptions: [
            // sorting
            "a",
            "b",
            // svg path
            "d",
            // loops
            "i",
            "j",
            "k",
            // position
            "x",
            "y",
            "z",
            // Type parameter
            "T",
            // parameter name for unused variables
            "_",
          ],
        },
      ],
      "no-underscore-dangle": [
        "warn",
        {
          allow: [
            "__dirname",
            "__filename",
            "__LG_SELECTOR__",
            "__VUEPRESS_DEV__",
            "__VUEPRESS_SSR__",
            "__VP_BLOG_TYPES__",
            "__VP_CUSTOM__",
            "__VP_I18N__",
            "__VP_READING_TIME__",
          ],
        },
      ],
      "no-warning-comments": "off",
      "prefer-object-spread": "off",

      // a lot of time we are just want to check existence
      "typescript/strict-boolean-expressions": "off",
      // FIXME: https://github.com/oxc-project/tsgolint/issues/1046
      // we need deprecated option converting
      "typescript/no-deprecated": [
        "warn",
        {
          allow: [{ from: "file", name: ["convertOptions"] }],
        },
      ],
    },
    node: ["**/node/**/*.ts", "**/create/src/**/*.ts"],
    vue: true,
    vitest: true,
    playwright: true,
  },
  {
    files: ["**/node/**/*.ts"],
    rules: {
      "no-restricted-imports": ["error", "@vuepress/helper/client", "vuepress/client"],
    },
  },
  {
    files: ["**/client/**/*.ts", "docs/shared/src/components/**/*.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        "@vuepress/helper",
        "@vuepress/helper/node",
        "vuepress/core",
        "vuepress/markdown",
        "vuepress/utils",
      ],
      "typescript/prefer-nullish-coalescing": ["warn", { ignoreConditionalTests: true }],
    },
  },
  {
    files: ["**/create/src/**/*.ts"],
    rules: {
      "no-console": "off",
    },
  },
  {
    files: ["**/create/template/**/*.ts"],
    rules: {
      "typescript/explicit-function-return-type": "off",
    },
  },
  {
    files: ["**/node/**/locales/*.ts", "**/node/**/locales.ts"],
    rules: {
      "max-lines": "off",
    },
  },
  {
    files: ["**/components/**/*.ts", "**/layouts/**/*.ts", "**/presets/**/*.ts"],
    rules: {
      "max-nested-calls": "off",
      "vue/require-default-prop": "off",
    },
  },
  {
    files: ["**/theme/src/presets/**/*.{ts,vue}"],
    rules: {
      // loose max lines for components setup blocks
      "max-lines-per-function": ["warn", { max: 300, skipBlankLines: true, skipComments: true }],
    },
  },
  {
    files: ["**/*.d.ts"],
    rules: {
      "unicorn/prefer-export-from": "off",
    },
  },
);
