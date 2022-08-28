import { existsSync, writeFileSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import inquirer from "inquirer";

import { getNextVersion, PackageManager } from "./utils/index.js";
import { deepAssign } from "./utils/deepAssign.js";

import type { CreateI18n } from "./config/index.js";

const getScript = (dir: string): Record<string, string> => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "docs:build": `vuepress build ${dir}`,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "docs:clean-dev": `vuepress dev ${dir} --clean-cache`,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "docs:dev": `vuepress dev ${dir}`,
});

const getDevDependencies = async (
  packageManager: PackageManager,
  deps: string[]
): Promise<Record<string, string>> =>
  Object.fromEntries(
    await Promise.all(
      deps.map<Promise<[string, string]>>(async (dep) => [
        dep,
        `^${await getNextVersion(packageManager, dep)}`,
      ])
    )
  );

export const createPackageJson = async (
  packageManager: PackageManager,
  dir: string,
  message: CreateI18n
): Promise<void> => {
  /**
   * generate package.json
   */

  const packageJsonPath = resolve(process.cwd(), "package.json");
  const scripts = getScript(dir);
  const devDependencies = await getDevDependencies(packageManager, [
    "@vuepress/client",
    "vue",
    "vuepress",
    "vuepress-theme-hope",
  ]);

  if (existsSync(packageJsonPath)) {
    console.log(message.updatePackage);

    // eslint-disable-next-line
    const packageContent: any = JSON.parse(
      readFileSync(packageJsonPath, { encoding: "utf-8" })
    );

    deepAssign(packageContent, { scripts, devDependencies });

    writeFileSync(
      packageJsonPath,
      `${JSON.stringify(packageContent, null, 2)}\n`,
      { encoding: "utf-8" }
    );
  } else {
    console.log(message.createPackage);

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
        message: message.nameMessage,
        default: "vuepress-theme-hope-template",
        validate: (input: string): true | string =>
          /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/u.exec(
            input
          )
            ? true
            : message.nameError,
      },
      {
        name: "version",
        type: "input",
        message: message.versionMessage,
        default: "2.0.0",
        validate: (input: string): true | string =>
          /^[0-9]+\.[0-9]+\.(?:[0=9]+|[0-9]+-[a-z]+\.[0-9])$/u.exec(input)
            ? true
            : message.versionError,
      },
      {
        name: "description",
        type: "input",
        message: message.descriptionMessage,
        default: "A project of vuepress-theme-hope",
      },
      {
        name: "license",
        type: "input",
        message: message.licenseMessage,
        default: "MIT",
      },
    ]);

    const packageContent = { ...result, scripts, devDependencies };

    writeFileSync(
      packageJsonPath,
      `${JSON.stringify(packageContent, null, 2)}\n`,
      { encoding: "utf-8" }
    );
  }
};
