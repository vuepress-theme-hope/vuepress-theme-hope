#!/usr/bin/env node
import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

import { confirm, select } from "@inquirer/prompts";
import { createCommand } from "commander";
import { execaCommand, execaCommandSync } from "execa";

import type {
  PackageManager,
  SupportedBundler,
  SupportedPreset,
} from "./config/index.js";
import {
  availablePackageManagers,
  generateTemplate,
  packageJSON,
  supportedBundlers,
  supportedPresets,
} from "./config/index.js";
import type { CreateLocale, SupportedLang } from "./i18n/index.js";
import { getLanguage } from "./i18n/index.js";
import { createPackageJson } from "./packageJson.js";
import { createTsConfig } from "./tsconfig.js";
import { ensureDirExistSync, getRegistry } from "./utils/index.js";

const program = createCommand("create-vuepress-theme-hope");

interface CreateOptions {
  bundler: SupportedBundler | null;
  preset: SupportedPreset | null;
}

const preAction = async (
  targetDir: string,
  { bundler, preset, add }: CreateOptions & { add: boolean },
): Promise<{
  lang: SupportedLang;
  locale: CreateLocale;
  packageManager: PackageManager;
}> => {
  // Get language
  const { lang, locale } = await getLanguage();

  // Check bundler
  if (bundler && !supportedBundlers.includes(bundler)) {
    program.error(locale.error.bundler);
  }

  // Check presets
  if (preset && !supportedPresets.includes(preset)) {
    program.error(locale.error.preset);
  }

  const targetDirPath = resolve(process.cwd(), targetDir);

  // Check if the user is trying to cover his files
  if (existsSync(targetDirPath) && readdirSync(targetDirPath).length) {
    program.error(locale.error.dirNotEmpty(targetDir));
  }

  // Get packageManager
  const packageManager = await select({
    message: locale.question.packageManager,
    choices: availablePackageManagers.map((manager) => ({
      name: manager,
      value: manager,
    })),
  });

  // Check if the user is a noob and warn him 🤪
  if (targetDir.startsWith("<") && targetDir.endsWith(">")) {
    program.error(
      locale.error[add ? "addDirHint" : "outputDirHint"](packageManager),
    );
  }

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
    console.info(locale.hint.devServer(packageManager));
  }
};

program
  .description(
    `\
Generate a new vuepress-theme-hope template

· pnpm create vuepress-theme-hope <dir>
· npm init vuepress-theme-hope@latest <dir>
· yarn create vuepress-theme-hope <dir>
`,
  )
  .option("-b, --bundler [bundler]", "Bundler to use, vite or webpack only")
  .option("-p, --preset [preset]", "Preset to use, docs or blog only")
  .argument("<dir>", "Dir to create the template in")
  .action(async (targetDir: string, { bundler, preset }: CreateOptions) => {
    const workingCWD = resolve(process.cwd(), targetDir);

    const { lang, locale, packageManager } = await preAction(targetDir, {
      bundler,
      preset,
      add: false,
    });

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
  });

program
  .command("add")
  .alias("inject")
  .summary("Add template to <dir> inside project")
  .description(
    `\
Add vuepress-theme-hope template in <dir> under current project

· pnpm create vuepress-theme-hope add <dir>
· npm init vuepress-theme-hope@latest add <dir>
· yarn create vuepress-theme-hope add <dir>
`,
  )
  .usage("")
  .option("-b, --bundler [bundler]", "Choose bundler to use")
  .option("-p, --preset [preset]", "Choose preset to use")

  .argument("<dir>", "Dir to create the template in")
  .action(async (targetDir: string, { bundler, preset }: CreateOptions) => {
    const { lang, locale, packageManager } = await preAction(targetDir, {
      bundler,
      preset,
      add: true,
    });

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
  });

program.version(packageJSON.version);
program.showHelpAfterError("add --help for additional information");

await program.parseAsync();
