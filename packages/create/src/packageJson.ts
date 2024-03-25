import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import inquirer from "inquirer";

import type { Bundler, CreateLocale } from "./config/index.js";
import { bundlers, version } from "./config/index.js";
import type { PackageManager } from "./utils/index.js";
import { PACKAGE_NAME_REG, VERSION_REG, deepAssign } from "./utils/index.js";

const getScript = (
  packageManager: PackageManager,
  bundler: "webpack" | "vite",
  dir: string,
): Record<string, string> => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "docs:build": `vuepress-${bundler} build ${dir}`,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "docs:clean-dev": `vuepress-${bundler} dev ${dir} --clean-cache`,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "docs:dev": `vuepress-${bundler} dev ${dir}`,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "docs:update-package": `${
    packageManager === "npm" ? "npx" : `${packageManager} dlx`
  } vp-update`,
});

interface CreatePackageJsonOptions {
  source: string;
  cwd?: string;
  packageManager: PackageManager;
  locale: CreateLocale;
  bundler: Bundler | null;
}

export const createPackageJson = async ({
  packageManager,
  locale,
  source,
  bundler,
  cwd = process.cwd(),
}: CreatePackageJsonOptions): Promise<void> => {
  if (!bundler)
    ({ bundler } = await inquirer.prompt<{ bundler: Bundler }>([
      {
        name: "bundler",
        type: "list",
        message: locale.question.bundler,
        choices: bundlers,
      },
    ]));

  /**
   * Generate package.json
   */
  const packageJsonPath = resolve(cwd, "package.json");
  const scripts = getScript(packageManager, bundler, source);
  const devDependencies = {
    [`@vuepress/bundler-${bundler}`]: "2.0.0-rc.9",
    vue: "^3.4.21",
    vuepress: "2.0.0-rc.9",
    "vuepress-theme-hope": version,
  };

  if (bundler === "webpack") devDependencies["sass-loader"] = "^14.1.0";

  if (existsSync(packageJsonPath)) {
    console.log(locale.flow.updatePackage);

    // eslint-disable-next-line
    const packageContent: any = JSON.parse(
      readFileSync(packageJsonPath, { encoding: "utf-8" }),
    );

    deepAssign(packageContent, { scripts, devDependencies });

    writeFileSync(
      packageJsonPath,
      `${JSON.stringify(packageContent, null, 2)}\n`,
      { encoding: "utf-8" },
    );
  } else {
    console.log(locale.flow.createPackage);

    interface PackageJsonAnswer {
      name: string;
      version: string;
      description: string;
      license: string;
    }

    const result = await inquirer.prompt<PackageJsonAnswer>([
      {
        name: "name",
        type: "input",
        message: locale.question.name,
        default: "vuepress-theme-hope-template",
        validate: (input: string): true | string =>
          PACKAGE_NAME_REG.exec(input) ? true : locale.error.name,
      },
      {
        name: "version",
        type: "input",
        message: locale.question.version,
        default: "2.0.0",
        validate: (input: string): true | string =>
          VERSION_REG.exec(input) ? true : locale.error.version,
      },
      {
        name: "description",
        type: "input",
        message: locale.question.description,
        default: "A project of vuepress-theme-hope",
      },
      {
        name: "license",
        type: "input",
        message: locale.question.license,
        default: "MIT",
      },
    ]);

    const packageContent = {
      ...result,
      type: "module",
      scripts,
      devDependencies,
    };

    writeFileSync(
      packageJsonPath,
      `${JSON.stringify(packageContent, null, 2)}\n`,
      { encoding: "utf-8" },
    );
  }
};
