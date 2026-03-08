const { defineConfig } = require("npm-check-updates");

module.exports = defineConfig({
  workspaces: true,
  upgrade: true,
  timeout: 60000,
  target: (name) => {
    if (name.startsWith("@vuepress/") || name.startsWith("vuepress-") || name === "vuepress")
      return "@next";

    if (["dashjs"].includes(name)) return "minor";
    if (["vite"].includes(name)) return "patch";

    return "latest";
  },
  reject: (name) => {
    if (name === "@types/node") return true;

    return false;
  },
});
