import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@internal/pagesData": "@test/pagesData",
    },
  },
  test: {
    include: ["**/__tests__/unit/client/**/*.spec.ts"],
    environment: "happy-dom",
  },
});
