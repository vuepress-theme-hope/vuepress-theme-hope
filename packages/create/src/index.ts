#!/usr/bin/env node
import { cac } from "cac";
import { existsSync, writeFileSync, readFileSync } from "fs";
import execa from "execa";
import { prompt } from "inquirer";
import { resolve } from "path";

import { bin } from "./bin";
import {
  getDevDependencies,
  getGitIgnorePath,
  getScript,
  getWorkflowContent,
} from "./content";
import { deepAssign } from "./deepAssign";
import { copy, ensureDirExistSync } from "./file";
import { getLanguage } from "./i18n";
import { getRegistry } from "./registry";

const cli = cac("vuepress-theme-hope");
// eslint-disable-next-line
const version = require("../package.json").version as string;

cli
  .command("[dir]", "Generate a new vuepress-theme-hope project")
  .usage(
    "yarn create vuepress-theme-hope [dir] / npm init vuepress-theme-hope [dir]"
  )
  .example("docs")
  .action(async (dir: string) => {
    if (!dir) return cli.outputHelp();

    // get language
    const { lang, message } = await getLanguage();

    // check if the user is a noob and warn him 🤪
    if (dir.startsWith("[") && dir.endsWith("]"))
      return console.log(message.dirError);

    console.log(message.getVersion);

    /**
     * generate package.json
     */

    const packageJsonPath = resolve(process.cwd(), "package.json");
    const scripts = getScript(dir);
    const devDependencies = await getDevDependencies();

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

    /**
     * generate template and workflow
     */

    const { i18n, workflow } = await prompt<{
      i18n: boolean;
      workflow: boolean;
    }>([
      {
        name: "i18n",
        type: "confirm",
        message: message.i18nMessage,
        default: false,
      },
      {
        name: "workflow",
        type: "confirm",
        message: message.workflowMessage,
        default: true,
      },
    ]);

    console.log(message.template);

    const templateFolder = i18n
      ? "i18n"
      : lang === "简体中文"
      ? "zh-CN"
      : "en-US";

    copy(
      resolve(__dirname, "../template", templateFolder),
      resolve(process.cwd(), dir)
    );

    if (workflow) {
      const workflowDir = resolve(process.cwd(), ".github/workflows");

      ensureDirExistSync(workflowDir);

      writeFileSync(
        resolve(workflowDir, "deploy-docs.yml"),
        getWorkflowContent(dir, lang),
        { encoding: "utf-8" }
      );
    }

    // update .gitignore
    const gitignorePath = resolve(process.cwd(), ".gitignore");

    const gitignoreContent = existsSync(gitignorePath)
      ? readFileSync(gitignorePath, {
          encoding: "utf-8",
        })
      : "";

    writeFileSync(
      gitignorePath,
      `${gitignoreContent}${getGitIgnorePath(dir)}`,
      { encoding: "utf-8" }
    );

    /**
     * Install deps
     */

    const registry = await getRegistry(lang);

    console.log(message.install);
    console.warn(message.wait);

    execa.sync(bin, ["install", "--registry", registry], {
      stdout: "inherit",
    });

    console.log(message.success);

    /**
     * Open dev server
     */

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
      "yarn create vuepress-theme-hope [dir] / npm init vuepress-theme-hope [dir]",
    body: "Create a vuepress-theme-hope template in [dir]",
  },
]);

cli.version(version);

cli.parse();
