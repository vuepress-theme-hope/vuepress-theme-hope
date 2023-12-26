import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      exclude: ["demo/**", "docs/**", "docs-shared/**", "scripts/**"],
    },
    include: ["**/*.spec.ts"],
  },
});
