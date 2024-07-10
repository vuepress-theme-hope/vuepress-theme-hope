#!/usr/bin/env node
import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

import { confirm, select } from "@inquirer/prompts";
import { cac } from "cac";
import { execaCommand, execaCommandSync } from "execa";

import type {
  PackageManager,
  SupportedBundler,
  SupportedPreset,
} from "./config/index.js";
import {
  availablePackageManagers,
  generateTemplate,
  supportedBundlers,
  supportedPresets,
  version,
} from "./config/index.js";
import type { CreateLocale, SupportedLang } from "./i18n/index.js";
import { getLanguage } from "./i18n/index.js";
import { createPackageJson } from "./packageJson.js";
import { createTsConfig } from "./tsconfig.js";
import { ensureDirExistSync, getRegistry } from "./utils/index.js";

interface CreateOptions {
  bundler?: SupportedBundler | null;
  preset?: SupportedPreset | null;
}

const preAction = async (
  targetDir: string,
  { bundler, preset }: CreateOptions,
): Promise<{
  lang: SupportedLang;
  locale: CreateLocale;
  packageManager: PackageManager;
} | void> => {
  // Ensure targetDir is specified by user
  if (!targetDir) return cli.outputHelp();

  // Get language
  const { lang, locale } = await getLanguage();

  // Check bundler
  if (bundler && !supportedBundlers.includes(bundler))
    return console.log(locale.error.bundler);

  // Check presets
  if (preset && !supportedPresets.includes(preset))
    return console.log(locale.error.preset);

  const targetDirPath = resolve(process.cwd(), targetDir);

  // Check if the user is trying to cover his files
  if (existsSync(targetDirPath) && readdirSync(targetDirPath).length)
    return console.error(locale.error.dirNotEmpty(targetDir));

  // Get packageManager
  const packageManager = await select({
    message: locale.question.packageManager,
    choices: availablePackageManagers.map((manager) => ({
      name: manager,
      value: manager,
    })),
  });

  // Check if the user is a noob and warn him 🤪
  if (targetDir.startsWith("[") && targetDir.endsWith("]"))
    return console.log(locale.error.updateDirMissing(packageManager));

  ensureDirExistSync(targetDirPath);

  // Return choice
  return { lang, locale, packageManager };
};

interface PostActionOptions {
  lang: SupportedLang;
  cwd?: string;
  locale: CreateLocale;
  packageManager: PackageManager;
}

const postAction = async ({
  cwd = process.cwd(),
  lang,
  locale,
  packageManager,
}: PostActionOptions): Promise<void> => {
  /*
   * Install deps
   */
  const registry =
    packageManager === "pnpm" ? "" : await getRegistry(packageManager, lang);

  console.log(locale.flow.install);
  console.warn(locale.hint.install);

  execaCommandSync(
    `${packageManager} install ${registry ? `--registry ${registry}` : ""}`,
    { cwd, stdout: "inherit" },
  );

  console.log(locale.hint.finish);

  /*
   * Open dev server
   */

  if (
    await confirm({
      message: locale.question.devServer,
      default: true,
    })
  ) {
    console.log(locale.flow.devServer);

    await execaCommand(`${packageManager} run docs:dev`, {
      cwd,
      stdout: "inherit",
    });
  } else {
    console.log(locale.hint.devServer(packageManager));
  }
};

const cli = cac("vuepress-theme-hope");

cli
  .command("[dir]", "Generate a new vuepress-theme-hope project")
  .option("-p, --preset <preset>", "Choose preset to use")
  .usage(
    "pnpm create vuepress-theme-hope [dir] / npm init vuepress-theme-hope@latest [dir] / yarn create vuepress-theme-hope [dir]",
  )
  .example("docs")
  .action(
    async (
      targetDir: string,
      { bundler = null, preset = null }: CreateOptions,
    ) => {
      const workingCWD = resolve(process.cwd(), targetDir);
      const result = await preAction(targetDir, { bundler, preset });

      if (result) {
        const { lang, locale, packageManager } = result;

        await createPackageJson({
          bundler,
          locale,
          packageManager,
          cwd: targetDir,
          source: "src",
        });
        createTsConfig({ cwd: targetDir, source: "src", locale });
        await generateTemplate({
          preset,
          lang,
          locale,
          packageManager,
          cwd: workingCWD,
          targetDir: "src",
        });
        await postAction({
          lang,
          locale,
          packageManager,
          cwd: workingCWD,
        });
      }
    },
  );

cli
  .command("add [dir]", "Add vuepress template to dir")
  .alias("inject")
  .option("-p, --preset <preset>", "Choose preset to use")
  .usage(
    "pnpm create vuepress-theme-hope add [dir] / npm init vuepress-theme-hope@latest add [dir] / yarn create vuepress-theme-hope add [dir]",
  )
  .example("docs")
  .action(
    async (
      targetDir: string,
      { bundler = null, preset = null }: CreateOptions,
    ) => {
      const result = await preAction(targetDir, { bundler, preset });

      if (result) {
        const { lang, locale, packageManager } = result;

        await createPackageJson({
          bundler,
          packageManager,
          locale,
          source: targetDir,
        });

        createTsConfig({ source: targetDir, locale });

        await generateTemplate({
          packageManager,
          lang,
          locale,
          preset,
          targetDir,
        });

        await postAction({ lang, locale, packageManager });
      }
    },
  );

cli.help(() => [
  {
    title:
      "pnpm create vuepress-theme-hope [dir] / npm init vuepress-theme-hope@latest [dir] / yarn create vuepress-theme-hope [dir]",
    body: "Create a vuepress-theme-hope template in [dir]",
  },
  {
    title:
      "pnpm create vuepress-theme-hope inject [dir] / npm init vuepress-theme-hope@latest inject [dir] / yarn create vuepress-theme-hope add [dir]",
    body: "Add vuepress-theme-hope template in [dir] under current project",
  },
]);

cli.version(version);

cli.parse();
