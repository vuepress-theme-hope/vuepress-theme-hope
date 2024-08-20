import hopeConfig, {
  config,
  globals,
  tsParser,
  // eslint-disable-next-line import-x/no-unresolved
} from "eslint-config-mister-hope";
// eslint-disable-next-line import-x/no-unresolved
import { vue, vueParser } from "eslint-config-mister-hope/vue";

export default config(
  ...vue,
  ...hopeConfig,

  {
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "coverage/**",
      "docs-shared/lib/**",
      "packages/*/assets/**",
      "packages/*/lib/**",
      "**/.vuepress/.cache/",
      "**/.vuepress/.temp/",
    ],
  },

  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        tsconfigDirName: import.meta.dirname,
        project: "./tsconfig.eslint.json",
        extraFileExtensions: [".vue"],
      },
    },
  },

  {
    files: ["**/*.ts"],
    settings: {
      "import-x/internal-regex": "^@(?:internal|temp|theme-hope)/",
      "import-x/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "tsconfig.json",
        },
      },
    },
    rules: {
      "import-x/no-restricted-paths": [
        "error",
        {
          zones: [
            {
              target: "packages/*/src/client/**",
              from: "packages/*/src/node/**",
            },
            {
              target: "packages/*/src/node/**",
              from: "packages/*/src/client/**",
            },
          ],
        },
      ],
    },
  },

  {
    files: ["**/*.{ts,vue}"],
    rules: {
      "@typescript-eslint/prefer-nullish-coalescing": [
        "warn",
        {
          ignoreConditionalTests: true,
        },
      ],
      "@typescript-eslint/naming-convention": [
        "warn",
        {
          selector: "default",
          format: ["camelCase"],
          leadingUnderscore: "allowSingleOrDouble",
          trailingUnderscore: "allow",
        },
        {
          selector: ["variable"],
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
          leadingUnderscore: "allowSingleOrDouble",
          trailingUnderscore: "allowSingleOrDouble",
        },
        {
          selector: ["parameter"],
          format: ["camelCase", "PascalCase"],
          leadingUnderscore: "allow",
          trailingUnderscore: "allow",
        },
        // allow locales path like `/zh/`, alias starting with `@` and css property like `line-width`
        {
          selector: ["property"],
          format: null,
          custom: {
            regex: "(^/$|^/.*/$|^@|^[a-z]+(?:-[a-z]+)*?$)",
            match: true,
          },
          filter: "(^/$|^/.*/$|^@|^[a-z]+(?:-[a-z]+)*?$)",
        },
        {
          selector: ["property"],
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
          leadingUnderscore: "allow",
          trailingUnderscore: "allow",
        },
        {
          selector: "import",
          format: ["PascalCase", "camelCase"],
        },
        {
          selector: "typeLike",
          format: ["PascalCase"],
        },
      ],
      "import-x/no-unresolved": [
        "error",
        {
          ignore: [
            "^@temp\\/",
            "^@theme-hope\\/",
            "^vuepress/client",
            "^vuepress-theme-hope\\/blog\\/",
            "^vuepress-theme-hope\\/client\\/",
            "^vuepress-theme-hope\\/presets\\/",
          ],
        },
      ],
    },
  },

  {
    files: ["packages/create/template/**/*.ts"],
    rules: {
      "@typescript-eslint/naming-convention": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
    },
  },

  {
    files: ["packages/*/src/client/**/*.ts"],
    rules: {
      // FIXME: Should be error
      "import-x/dynamic-import-chunkname": "off",
    },
  },

  {
    files: ["scripts/**.ts", "**/gulpfile.js"],
    languageOptions: {
      globals: globals.node,
    },
  },
);
