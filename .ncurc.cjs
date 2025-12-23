const { defineConfig } = require("npm-check-updates");

module.exports = defineConfig({
  upgrade: true,
  target: (name) => {
    if (
      name.startsWith("@vuepress/") ||
      name.startsWith("vuepress-") ||
      name === "vuepress"
    )
      return "@next";

    if (["dashjs"].includes(name)) return "minor";
    if (["vite"].includes(name)) return "patch";

    return "latest";
  },
});
