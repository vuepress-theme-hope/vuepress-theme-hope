#!/usr/bin/env node
import { existsSync, mkdirSync, writeFileSync, readFileSync } from "fs";
import { resolve } from "path";
import { deepAssign } from "@mr-hope/vuepress-shared";
import { cac } from "cac";
import { prompt } from "inquirer";
import execa = require("execa");
import { copy } from "./copy";
import { checkForLatestVersion } from "./checkVersion";
import { detectYarn } from "./hasYarn";
import { getLanguage } from "./i18n";
import { getRegistry } from "./registry";
const cli = cac("vuepress-theme-hope");

const bin = detectYarn() ? "yarn" : "npm";

cli
  .command("[dir]", "Generate a new vuepress-theme-hope project")
  .action(async (dir: string) => {
    if (!dir) return cli.outputHelp();

    const { lang, message } = await getLanguage();

    const targetFolder = resolve(process.cwd(), dir);
    const packageJsonPath = resolve(process.cwd(), "package.json");
    const scripts = {
      "docs:build": `vuepress build ${dir}`,
      "docs:clean-dev": `vuepress dev ${dir} --no-cache`,
      "docs:dev": `vuepress dev ${dir}`,
      "docs:eject-theme": `vuepress eject-hope ${dir}`,
    };

    console.log(message.getVersion);

    const vuepressVersion = await checkForLatestVersion("vuepress");
    const themeVersion = await checkForLatestVersion("vuepress-theme-hope");

    const devDependencies = {
      vuepress: `^${vuepressVersion}`,
      "vuepress-theme-hope": `^${themeVersion}`,
    };

    if (!existsSync(targetFolder)) mkdirSync(targetFolder);

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

      const result = await prompt<PackageJsonAnswer>([
        {
          name: "name",
          type: "input",
          message: message.nameMessage,
          default: "vuepress-theme-hope-project",
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
          default: "1.0.0",
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

    console.log(message.template);

    copy(resolve(__dirname, "../template"), resolve(process.cwd(), dir));

    console.log(message.install);
    console.warn(message.wait);

    const registry = await getRegistry(lang, bin);

    execa.sync(bin, ["install", "--registry", registry], {
      stdout: "inherit",
    });

    console.log(message.success);

    const { choise } = await prompt<{ choise: "Yes" | "No" }>([
      {
        name: "choise",
        type: "list",
        message: message.devServerAsk,
        choices: ["Yes", "No"],
      },
    ]);

    if (choise === "Yes") {
      console.log(message.devServer);
      console.log(message.wait);

      await execa(bin, ["run", "docs:dev"], {
        stdout: "inherit",
      });
    } else console.log(message.hint);
  });

cli.help(() => [
  {
    title:
      "yarn create vuepress-theme-hope <dir> / npm init vuepress-theme-hope <dir>",
    body: "Create a vuepress-theme-hope template in <dir>",
  },
]);

cli.parse();
