const cooldownExclude = ["@oxfmt/*", "@oxlint/*", "@vitest/*", "oxfmt", "oxlint", "vite", "vitest"];

const matchesPattern = (packageName, pattern) => {
  if (pattern.endsWith("/*")) return packageName.startsWith(pattern.slice(0, -1));

  return packageName === pattern;
};

export default {
  cooldown: (packageName) =>
    cooldownExclude.some((pattern) => matchesPattern(packageName, pattern)) ? 0 : 1,
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
