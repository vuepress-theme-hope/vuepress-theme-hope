import { createRequire } from "node:module";

import { type App } from "@vuepress/core";
import { fs, path } from "@vuepress/utils";
import semver from "semver";

import { keys } from "../../shared/index.js";

interface PackageJSON extends Record<string, unknown> {
  version: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

export const checkVersion = (app: App, range = "v2"): boolean => {
  const sourceFolderPath = app.dir.source();

  const require = createRequire(sourceFolderPath);

  let dir = sourceFolderPath;
  let packageName = "";

  do {
    if (fs.existsSync(path.resolve(dir, "package.json"))) {
      const content = <PackageJSON>(
        JSON.parse(fs.readFileSync(path.resolve(dir, "package.json"), "utf-8"))
      );

      const collectName = (name: string): void => {
        if (
          name === "vuepress" ||
          name === "vuepress-vite" ||
          name === "vuepress-webpack"
        )
          packageName = name;
      };

      keys(content.dependencies || {}).forEach((name) => collectName(name));
      keys(content.devDependencies || {}).forEach((name) => collectName(name));
    }

    if (packageName || dir === path.dirname(dir)) break;
  } while ((dir = path.dirname(dir)));

  const { version } = <PackageJSON>require(`${packageName}/package.json`);

  return semver.satisfies(version, range);
};
