import { createRequire } from "node:module";

import { type App } from "@vuepress/core";
import { colors, fs, path } from "@vuepress/utils";
import semver from "semver";

import { Logger } from "./logger.js";
import { keys } from "../../shared/index.js";

interface PackageJSON extends Record<string, unknown> {
  version: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

/**
 * Check if the version of VuePress is satisfied with the given range
 *
 * @param app VuePress app
 * @param name current package name
 * @param range version range
 */
export const checkVersion = (app: App, name: string, range = "v2"): boolean => {
  const sourceFolderPath = app.dir.source();
  const logger = new Logger(name);
  const require = createRequire(`${sourceFolderPath}/`);

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

  if (packageName) {
    const { version } = <PackageJSON>require(`${packageName}/package.json`);

    if (semver.satisfies(version, range)) return true;

    logger.error(
      `Package ${colors.magenta(name)} requires ${colors.cyan(
        `vuepress@${range}`
      )}, but found ${colors.cyan(version)}.`
    );

    return false;
  }

  logger.error("No VuePress package is found.");

  return false;
};
