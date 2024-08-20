import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["**/*.spec.ts"],
    coverage: {
      exclude: ["demo/**", "docs/**", "docs-shared/**", "scripts/**"],
      reporter: ["clover", "json"],
    },
  },
});
