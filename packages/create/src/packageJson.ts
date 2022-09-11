import { existsSync, writeFileSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import inquirer from "inquirer";

import { version } from "./config/index.js";
import { deepAssign } from "./utils/index.js";

import type { CreateI18n } from "./config/index.js";

const getScript = (dir: string): Record<string, string> => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "docs:build": `vuepress build ${dir}`,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "docs:clean-dev": `vuepress dev ${dir} --clean-cache`,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "docs:dev": `vuepress dev ${dir}`,
});

export const createPackageJson = async (
  dir: string,
  message: CreateI18n
): Promise<void> => {
  /**
   * generate package.json
   */

  const packageJsonPath = resolve(process.cwd(), "package.json");
  const scripts = getScript(dir);
  const devDependencies = {
    "@vuepress/client": "2.0.0-beta.51",
    vue: "^3.2.27",
    vuepress: "2.0.0-beta.51",
    "vuepress-theme-hope": version,
  };

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

    const packageContent = {
      ...result,
      type: "module",
      scripts,
      devDependencies,
    };

    writeFileSync(
      packageJsonPath,
      `${JSON.stringify(packageContent, null, 2)}\n`,
      { encoding: "utf-8" }
    );
  }
};
