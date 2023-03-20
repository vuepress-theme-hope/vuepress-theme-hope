import { createRequire } from "node:module";

import { type App } from "@vuepress/core";
import { colors, fs, path } from "@vuepress/utils";
import { keys } from "vuepress-shared/node";

interface PackageJSON extends Record<string, unknown> {
  version: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

export const checkVuePressVersion = (app: App): boolean => {
  const sourceFolderPath = app.dir.source();
  const mainPackages: string[] = [];
  const subPackages: string[] = [];

  const require = createRequire(`${sourceFolderPath}/`);

  let dir = sourceFolderPath;

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
          mainPackages.push(name);
        else if (name.startsWith("@vuepress/")) subPackages.push(name);
      };

      keys(content.dependencies || {}).forEach((name) => collectName(name));
      keys(content.devDependencies || {}).forEach((name) => collectName(name));
    }

    if (mainPackages.length || dir === path.dirname(dir)) break;
  } while ((dir = path.dirname(dir)));

  const mainPackagesVersions: string[] = [];

  mainPackages.forEach((pkg) => {
    const { version } = <PackageJSON>require(`${pkg}/package.json`);

    mainPackagesVersions.push(version);
  });

  const filteredMainPackagesVersions = new Set(mainPackagesVersions);

  if (filteredMainPackagesVersions.size > 1) {
    console.error(
      `Multiple versions of VuePress are detected in the current project: ${[
        ...filteredMainPackagesVersions,
      ]
        .map((version) => colors.yellow(version))
        .join(", ")}`
    );

    return false;
  }

  if (filteredMainPackagesVersions.size === 0) {
    console.error("No VuePress version is detected in the current project");

    return false;
  }

  const mainVersion = mainPackagesVersions[0];

  return subPackages.every((pkg) => {
    const { version } = <PackageJSON>require(`${pkg}/package.json`);

    if (version !== mainVersion) {
      console.error(
        `VuePress version mismatch: ${colors.cyan(
          pkg
        )} is using ${colors.magenta(
          version
        )} while the main VuePress is using ${colors.magenta(mainVersion)}`
      );

      return false;
    }

    return true;
  });
};
