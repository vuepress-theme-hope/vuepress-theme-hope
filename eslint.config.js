// @ts-check
import js from "@eslint/js";
import eslintImport from "eslint-plugin-import";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import vitest from "eslint-plugin-vitest";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  // @ts-expect-error: The type does not fit
  ...pluginVue.configs["flat/recommended"],
  {
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "coverage/**",
      "docs-shared/lib/**",
      "packages/*/assets/**",
      "packages/*/lib/**",
      "packages/create/template/**",
      "**/.vuepress/.cache/",
      "**/.vuepress/.temp/",
      "gulpfile.js",
    ],
  },
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        tsconfigDirName: import.meta.dirname,
        project: ["./tsconfig.json"],
        extraFileExtensions: [".vue"],
      },
    },
  },
  {
    files: ["**/*.{cjs,js}"],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    plugins: {
      import: eslintImport,
    },
    settings: {
      "import/internal-regex": "^@(?:internal|temp|theme-hope)/",
    },
    rules: {
      curly: ["error", "multi", "consistent"],
      "no-duplicate-imports": "off",
      "no-unmodified-loop-condition": "error",
      "padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          prev: ["const", "let"],
          next: ["*"],
        },
        {
          blankLine: "any",
          prev: ["const", "let"],
          next: ["const", "let"],
        },
        {
          blankLine: "always",
          prev: ["*"],
          next: ["return"],
        },
      ],
      "sort-imports": [
        "error",
        {
          allowSeparatedGroups: false,
          ignoreDeclarationSort: true,
        },
      ],

      "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-commonjs": "error",
      "import/no-cycle": "error",
      "import/no-duplicates": ["error", { considerQueryString: true }],
      "import/no-named-default": "error",
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
      "import/order": [
        "error",
        {
          alphabetize: {
            order: "asc",
            orderImportKind: "asc",
          },
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "index",
            "object",
          ],
          "newlines-between": "always",
        },
      ],
    },
  },
  {
    files: ["**/*.{ts,vue}"],
    rules: {
      "@typescript-eslint/consistent-type-imports": "warn",
      "@typescript-eslint/explicit-function-return-type": [
        "warn",
        {
          allowHigherOrderFunctions: true,
          allowDirectConstAssertionInArrowFunctions: true,
          allowTypedFunctionExpressions: true,
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
      "@typescript-eslint/no-explicit-any": ["warn", { ignoreRestArgs: true }],
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unsafe-member-access": "warn",
    },
  },
  {
    files: ["packages/*/src/client/**/*.ts"],
    rules: {
      "import/dynamic-import-chunkname": "error",
    },
  },
  {
    files: ["scripts/**.js"],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ["**/__tests__/**/*.spec.{j,t}s"],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
    },
  },

  eslintPluginPrettierRecommended,
);
