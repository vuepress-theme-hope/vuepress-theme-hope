import pkg from "../../package.json" with { type: "json" };

export const vuepressVersion = pkg.devDependencies.vuepress;
export const version = pkg.version;
