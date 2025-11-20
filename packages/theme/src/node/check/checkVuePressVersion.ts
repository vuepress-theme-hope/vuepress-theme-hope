/* eslint-disable no-console */
import { createRequire } from "node:module";

import { keys } from "@vuepress/helper";
import { colors, fs, path } from "vuepress/utils";

interface PackageJSON extends Record<string, unknown> {
  version: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

const BUNDLERS = ["vite", "webpack"] as const;
const BUNDLER_PREFIX = "@vuepress/bundler-";
const VUEPRESS_BUNDLERS = new Set(
  BUNDLERS.map((bundler) => `${BUNDLER_PREFIX}${bundler}`),
);
const VUEPRESS_CORE_PACKAGES = new Set(
  ["core", "client", "cli", "markdown", "shared", "utils"].map(
    (item) => `@vuepress/${item}`,
  ),
);
const DEPRECATED_PACKAGES = new Set(BUNDLERS.map((item) => `vuepress-${item}`));

export const checkVuePressVersion = (): boolean => {
  const sourceFolderPath = path.join(process.cwd(), process.argv[3]);
  const bundlerNames: string[] = [];
  const corePackageNames: string[] = [];

  const require = createRequire(`${sourceFolderPath}/`);

  let dir = sourceFolderPath;
  let foundVuePress = false;

  const checkPackage = (pkgName: string): void => {
    if (pkgName === "vuepress") foundVuePress = true;
    else if (DEPRECATED_PACKAGES.has(pkgName))
      console.error(
        colors.red(
          `❌ ${pkgName} is deprecated and you must remove it from deps!`,
        ),
      );
    else if (VUEPRESS_CORE_PACKAGES.has(pkgName))
      corePackageNames.push(pkgName);
    else if (VUEPRESS_BUNDLERS.has(pkgName)) bundlerNames.push(pkgName);
  };

  do {
    if (fs.existsSync(path.resolve(dir, "package.json"))) {
      const content = JSON.parse(
        fs.readFileSync(path.resolve(dir, "package.json"), "utf8"),
      ) as PackageJSON;

      keys({ ...content.dependencies, ...content.devDependencies }).forEach(
        (name) => {
          checkPackage(name);
        },
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (foundVuePress || dir === path.dirname(dir)) break;
  } while ((dir = path.dirname(dir)));

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!foundVuePress) {
    console.error(
      `❌ ${colors.cyan("VuePress")} ${colors.red("package is not found in current project!")} You must manually install it!`,
    );

    return false;
  }

  if (bundlerNames.length === 0) {
    console.error(
      `${colors.red("❌ No VuePress bundler is detected in the current project!")} You should install one of ${[
        ...VUEPRESS_BUNDLERS,
      ]
        .map((str) => colors.cyan(str))
        .join(", ")}`,
    );

    return false;
  }

  let isVersionMatch = true;

  const { version: vuePressVersion } =
    require("vuepress/package.json") as PackageJSON;

  bundlerNames.forEach((pkgName) => {
    const { version } = require(`${pkgName}/package.json`) as PackageJSON;

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
    const { version } = require(`${pkgName}/package.json`) as PackageJSON;

    if (version === vuePressVersion) {
      console.warn(
        `${colors.cyan(pkgName)} is no longer needed, you should remove it from deps and change all ${colors.cyan(pkgName)} imports to ${colors.cyan(pkgName.slice(1))}`,
      );
    } else {
      console.error(
        `Package version mismatch: ${colors.cyan(pkgName)} is using ${colors.magenta(
          version,
        )} while ${colors.cyan("vuepress")} is using ${colors.magenta(vuePressVersion)}`,
      );

      isVersionMatch = false;
    }
  });

  return isVersionMatch;
};
