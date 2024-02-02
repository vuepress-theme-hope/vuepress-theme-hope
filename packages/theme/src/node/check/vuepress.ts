import { createRequire } from "node:module";

import { keys } from "@vuepress/helper";
import { colors, fs, path } from "vuepress/utils";

interface PackageJSON extends Record<string, unknown> {
  version: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

const VUEPRESS_BUNDLER = ["vite", "webpack"].map(
  (item) => `@vuepress/bundler-${item}`,
);
const VUEPRESS_CORE_PACKAGES = [
  "core",
  "client",
  "cli",
  "markdown",
  "shared",
  "utils",
].map((item) => `@vuepress/${item}`);
const DEPRECATED_PACKAGES = ["vite", "-webpack"].map(
  (item) => `vuepress-${item}`,
);

export const checkVuePressVersion = (): boolean => {
  const sourceFolderPath = path.join(process.cwd(), process.argv[3]);
  const bundlerNames: string[] = [];
  const corePackageNames: string[] = [];

  const require = createRequire(`${sourceFolderPath}/`);

  let dir = sourceFolderPath;
  let foundVuePress = false;

  do {
    if (fs.existsSync(path.resolve(dir, "package.json"))) {
      const content = <PackageJSON>(
        JSON.parse(fs.readFileSync(path.resolve(dir, "package.json"), "utf-8"))
      );

      const checkPackage = (pkgName: string): void => {
        if (pkgName === "vuepress") foundVuePress = true;
        else if (DEPRECATED_PACKAGES.includes(pkgName))
          console.error(
            colors.red(
              `❌ ${pkgName} is deprecated and you must remove it from deps!`,
            ),
          );
        else if (VUEPRESS_CORE_PACKAGES.includes(pkgName))
          corePackageNames.push(pkgName);
        else if (VUEPRESS_BUNDLER.includes(pkgName)) bundlerNames.push(pkgName);
      };

      keys({ ...content.dependencies, ...content.devDependencies }).forEach(
        (name) => checkPackage(name),
      );
    }

    if (foundVuePress || dir === path.dirname(dir)) break;
  } while ((dir = path.dirname(dir)));

  if (!foundVuePress) {
    console.error(
      `❌ ${colors.cyan("VuePress")} ${colors.red("package is not found in current project!")} You must manually install it!`,
    );

    return false;
  }

  if (!bundlerNames.length) {
    console.error(
      `${colors.red("❌ No VuePress bundler is detected in the current project!")} You should install one of ${VUEPRESS_BUNDLER.map(
        colors.cyan,
      ).join(", ")}`,
    );

    return false;
  }

  let isVersionMatch = true;

  const { version: vuePressVersion } = <PackageJSON>(
    require("vuepress/package.json")
  );

  bundlerNames.forEach((pkgName) => {
    const { version } = <PackageJSON>require(`${pkgName}/package.json`);

    if (version !== vuePressVersion) {
      console.error(
        `❌ Package version mismatch: ${colors.cyan(
          pkgName,
        )} is using ${colors.magenta(
          version,
        )} while ${colors.cyan("vuepress")} is using ${colors.magenta(vuePressVersion)}`,
      );

      isVersionMatch = false;
    }
  });

  corePackageNames.forEach((pkgName) => {
    const { version } = <PackageJSON>require(`${pkgName}/package.json`);

    if (version !== vuePressVersion) {
      console.error(
        `Package version mismatch: ${colors.cyan(pkgName)} is using ${colors.magenta(
          version,
        )} while ${colors.cyan("vuepress")} is using ${colors.magenta(vuePressVersion)}`,
      );

      isVersionMatch = false;
    } else {
      console.warn(
        `${colors.cyan(pkgName)} is no longer needed, you should remove it from deps and change all ${colors.cyan(pkgName)} imports to ${colors.cyan(pkgName.substring(1))}`,
      );
    }
  });

  return isVersionMatch;
};
