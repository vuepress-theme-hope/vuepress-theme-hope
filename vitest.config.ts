import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      provider: "istanbul",
      reporter: ["text", "clover", "json"],
    },
  },
});
