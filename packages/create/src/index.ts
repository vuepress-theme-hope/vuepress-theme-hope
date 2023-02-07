#!/usr/bin/env node
import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

import { cac } from "cac";
import { execaCommand, execaCommandSync } from "execa";
import inquirer from "inquirer";

import {
  type CreateI18n,
  type Lang,
  generateTemplate,
  getLanguage,
  version,
} from "./config/index.js";
import { createPackageJson } from "./packageJson.js";
import { getRegistry } from "./registry.js";
import {
  type PackageManager,
  ensureDirExistSync,
  getPackageManager,
} from "./utils/index.js";

const preAction = async (
  targetDir: string,
  preset?: "docs" | "blog" | null
): Promise<{
  lang: Lang;
  message: CreateI18n;
  packageManager: PackageManager;
} | void> => {
  // ensure targetDir is specified by user
  if (!targetDir) return cli.outputHelp();

  // get language
  const { lang, message } = await getLanguage();

  // check presets
  if (preset && !["docs", "blog"].includes(preset))
    return console.log(message.error.preset);

  // get packageManager
  const packageManager = await getPackageManager(
    message.question.packageManager
  );

  // check if the user is a noob and warn him 🤪
  if (targetDir.startsWith("[") && targetDir.endsWith("]"))
    return console.log(message.error.updateDirMissing(packageManager));

  const targetDirPath = resolve(process.cwd(), targetDir);

  // check if the user is trying to cover his files
  if (existsSync(targetDirPath) && readdirSync(targetDirPath).length)
    return console.error(message.error.dirNotEmpty(targetDir));

  ensureDirExistSync(targetDirPath);

  // return choice
  return { lang, message, packageManager };
};

const postAction = async ({
  cwd = process.cwd(),
  lang,
  message,
  packageManager,
}: {
  lang: Lang;
  cwd?: string;
  message: CreateI18n;
  packageManager: PackageManager;
}): Promise<void> => {
  /*
   * Install deps
   */
  const registry =
    packageManager === "pnpm" ? "" : await getRegistry(packageManager, lang);

  console.log(message.flow.install);
  console.warn(message.hint.install);

  execaCommandSync(
    `${packageManager} install ${registry ? `--registry ${registry}` : ""}`,
    { cwd, stdout: "inherit" }
  );

  console.log(message.hint.finish);

  /*
   * Open dev server
   */

  const { choice } = await inquirer.prompt<{ choice: boolean }>([
    {
      name: "choice",
      type: "confirm",
      message: message.question.devServer,
      default: true,
    },
  ]);

  if (choice) {
    console.log(message.flow.devServer);

    await execaCommand(`${packageManager} run docs:dev`, {
      cwd,
      stdout: "inherit",
    });
  } else {
    console.log(message.hint.devServer(packageManager));
  }
};

const cli = cac("vuepress-theme-hope");

cli
  .command("[dir]", "Generate a new vuepress-theme-hope project")
  .option("-p, --preset <preset>", "Choose preset to use")
  .usage(
    "pnpm create vuepress-theme-hope [dir] / yarn create vuepress-theme-hope [dir] / npm init vuepress-theme-hope [dir]"
  )
  .example("docs")
  .action(
    async (
      targetDir: string,
      {
        preset = null,
      }: {
        preset?: "docs" | "blog" | null;
      }
    ) => {
      const workingCWD = resolve(process.cwd(), targetDir);
      const result = await preAction(targetDir, preset);

      if (result) {
        const { lang, message, packageManager } = result;

        await createPackageJson(packageManager, message, "src", targetDir);
        await generateTemplate("src", {
          cwd: workingCWD,
          packageManager,
          lang,
          message,
          preset,
        });

        await postAction({ cwd: workingCWD, lang, message, packageManager });
      }
    }
  );

cli
  .command("add [dir]", "Add vuepress template to dir")
  .alias("inject")
  .option("-p, --preset <preset>", "Choose preset to use")
  .usage(
    "pnpm create vuepress-theme-hope add [dir] / yarn create vuepress-theme-hope add [dir] / npm init vuepress-theme-hope add [dir]"
  )
  .example("docs")
  .action(
    async (
      targetDir: string,
      {
        preset = null,
      }: {
        preset?: "docs" | "blog" | null;
      }
    ) => {
      const result = await preAction(targetDir, preset);

      if (result) {
        const { lang, message, packageManager } = result;

        await createPackageJson(packageManager, message, targetDir);

        await generateTemplate(targetDir, {
          packageManager,
          lang,
          message,
          preset,
        });

        await postAction({ message, lang, packageManager });
      }
    }
  );

cli.help(() => [
  {
    title:
      "pnpm create vuepress-theme-hope [dir] / yarn create vuepress-theme-hope [dir] / npm init vuepress-theme-hope [dir]",
    body: "Create a vuepress-theme-hope template in [dir]",
  },
  {
    title:
      "pnpm create vuepress-theme-hope inject [dir] / yarn create vuepress-theme-hope add [dir] / npm init vuepress-theme-hope inject [dir]",
    body: "Add vuepress-theme-hope template in [dir] under current project",
  },
]);

cli.version(version);

cli.parse();
