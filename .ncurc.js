export default {
  cooldown: (pkg) => {
    if (
      ["@mdit/", "@mr-hope/", "@oxfmt/", "@oxlint/", "@vuepress/", "@waline/", "vuepress-"].some(
        (prefix) => pkg.startsWith(prefix),
      ) ||
      [
        "bcrypt-ts",
        "oxc-config-hope",
        "oxfmt",
        "oxlint",
        "stylelint-config-hope",
        "vuepress",
      ].includes(pkg)
    )
      return 0;

    return 1;
  },
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
