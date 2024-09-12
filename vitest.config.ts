import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      provider: "istanbul",
      all: false,
      reporter: ["text", "clover", "json"],
    },
  },
});
