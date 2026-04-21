export default {
  workspaces: true,
  peer: true,
  upgrade: true,
  timeout: 360000,
  target: (name) => {
    if (name.startsWith("@vuepress/") || name.startsWith("vuepress-") || name === "vuepress")
      return "@next";

    if (["dashjs"].includes(name)) return "minor";
    if (["vite"].includes(name)) return "patch";
    if (name === "@types/node") return "minor";

    return "latest";
  },
};
