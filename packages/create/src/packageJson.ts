import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import inquirer from "inquirer";

import type { CreateI18n } from "./config/index.js";
import { version } from "./config/index.js";
import type { PackageManager } from "./utils/index.js";
import { PACKAGE_NAME_REG, VERSION_REG, deepAssign } from "./utils/index.js";

const getScript = (
  packageManager: PackageManager,
  dir: string,
): Record<string, string> => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "docs:build": `vuepress build ${dir}`,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "docs:clean-dev": `vuepress dev ${dir} --clean-cache`,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "docs:dev": `vuepress dev ${dir}`,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "docs:update-package": `${
    packageManager === "npm" ? "npx" : `${packageManager} dlx`
  } vp-update`,
});

export const createPackageJson = async (
  packageManager: PackageManager,
  message: CreateI18n,
  source: string,
  cwd = process.cwd(),
): Promise<void> => {
  /**
   * generate package.json
   */

  const packageJsonPath = resolve(cwd, "package.json");
  const scripts = getScript(packageManager, source);
  const devDependencies = {
    "@vuepress/client": "2.0.0-rc.0",
    vue: "^3.3.12",
    vuepress: "2.0.0-rc.0",
    "vuepress-theme-hope": version,
  };

  if (existsSync(packageJsonPath)) {
    console.log(message.flow.updatePackage);

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
    console.log(message.flow.createPackage);

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
        message: message.question.name,
        default: "vuepress-theme-hope-template",
        validate: (input: string): true | string =>
          PACKAGE_NAME_REG.exec(input) ? true : message.error.name,
      },
      {
        name: "version",
        type: "input",
        message: message.question.version,
        default: "2.0.0",
        validate: (input: string): true | string =>
          VERSION_REG.exec(input) ? true : message.error.version,
      },
      {
        name: "description",
        type: "input",
        message: message.question.description,
        default: "A project of vuepress-theme-hope",
      },
      {
        name: "license",
        type: "input",
        message: message.question.license,
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
