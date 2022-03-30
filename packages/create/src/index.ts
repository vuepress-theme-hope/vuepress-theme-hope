#!/usr/bin/env node
import { existsSync, mkdirSync, writeFileSync, readFileSync } from "fs";
import { resolve } from "path";
import { deepAssign } from "./deepAssign";
import { cac } from "cac";
import { prompt } from "inquirer";
import execa from "execa";
import { copy } from "./copy";
import { checkForNextVersion } from "./checkVersion";
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
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "docs:build": `vuepress build ${dir}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "docs:clean-dev": `vuepress dev ${dir} --clean-cache`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "docs:dev": `vuepress dev ${dir}`,
    };

    console.log(message.getVersion);

    const vuepressVersion = await checkForNextVersion("vuepress", bin);
    const themeVersion = await checkForNextVersion("vuepress-theme-hope", bin);

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

    const { i18n, workflow } = await prompt<{
      i18n: boolean;
      workflow: boolean;
    }>([
      {
        name: "i18n",
        type: "confirm",
        message: message.i18nMessage,
      },
      {
        name: "workflow",
        type: "confirm",
        message: message.workflowMessage,
        default: true,
      },
    ]);

    console.log(message.template);

    const templateFolder = i18n ? "i18n" : lang;

    copy(
      resolve(__dirname, "../template", templateFolder),
      resolve(process.cwd(), dir)
    );

    if (workflow)
      copy(
        resolve(__dirname, "../workflows", lang),
        resolve(process.cwd(), ".github/workflows")
      );

    console.log(message.install);
    console.warn(message.wait);

    const registry = await getRegistry(lang, bin);

    execa.sync(bin, ["install", "--registry", registry], {
      stdout: "inherit",
    });

    console.log(message.success);

    const { choise } = await prompt<{ choise: boolean }>([
      {
        name: "choise",
        type: "confirm",
        message: message.devServerAsk,
        default: true,
      },
    ]);

    if (choise) {
      console.log(message.devServer);

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
