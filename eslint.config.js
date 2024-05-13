import hopeConfig, {
  config,
  globals,
  tsParser,
} from "eslint-config-mister-hope";
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
      "import/internal-regex": "^@(?:internal|temp|theme-hope)/",
    },
    rules: {
      "import/no-restricted-paths": [
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
      "import/dynamic-import-chunkname": "error",
    },
  },

  {
    files: ["scripts/**.ts", "**/gulpfile.js"],
    languageOptions: {
      globals: globals.node,
    },
  },
);
