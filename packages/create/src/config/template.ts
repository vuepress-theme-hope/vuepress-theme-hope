import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { confirm, select } from "@inquirer/prompts";

import type { CreateLocale, SupportedLang } from "../i18n/index.js";
import { checkGitInstalled, checkGitRepo, copy, ensureDirExistSync } from "../utils/index.js";
import type { PackageManager, SupportedPreset } from "./config.js";
import { supportedPresets } from "./config.js";
import { updateGitIgnore } from "./gitignore.js";
import { getWorkflowContent } from "./workflow.js";

const __dirname = import.meta.dirname;

interface TemplateOptions {
  packageManager: PackageManager;
  lang: SupportedLang;
  locale: CreateLocale;
  cwd?: string;
  targetDir: string;
  preset?: SupportedPreset | null;
}

export const generateTemplate = async ({
  cwd = process.cwd(),
  targetDir,
  lang,
  locale,
  preset,
  packageManager,
}: TemplateOptions): Promise<void> => {
  // oxlint-disable-next-line no-param-reassign
  preset ??= await select<SupportedPreset>({
    message: locale.question.preset,
    choices: supportedPresets.map((item) => ({
      name: item,
      value: item,
    })),
  });

  const enableI18n = await confirm({
    message: locale.question.i18n,
    default: false,
  });

  console.log(locale.flow.generateTemplate);

  const templateFolder = preset;

  // Copy public assets
  copy(resolve(__dirname, "../template/public"), resolve(cwd, targetDir, "./.vuepress/public"));
  copy(
    resolve(__dirname, "../template", templateFolder, "config/base"),
    resolve(cwd, targetDir, ".vuepress"),
  );

  if (enableI18n) {
    copy(resolve(__dirname, "../template", templateFolder, "en"), resolve(cwd, targetDir));
    copy(resolve(__dirname, "../template", templateFolder, "zh"), resolve(cwd, targetDir, "zh"));
    copy(
      resolve(__dirname, "../template", templateFolder, "config/multi"),
      resolve(cwd, targetDir, ".vuepress"),
    );
  } else if (lang === "zh") {
    copy(resolve(__dirname, "../template", templateFolder, "zh"), resolve(cwd, targetDir));
    copy(
      resolve(__dirname, "../template", templateFolder, "config/zh"),
      resolve(cwd, targetDir, ".vuepress"),
    );
  } else {
    copy(resolve(__dirname, "../template", templateFolder, "en"), resolve(cwd, targetDir));
    copy(
      resolve(__dirname, "../template", templateFolder, "config/en"),
      resolve(cwd, targetDir, ".vuepress"),
    );
  }

  // Git related
  let isGitRepo = checkGitRepo(cwd);

  if (isGitRepo) {
    updateGitIgnore(targetDir, cwd);
  } else if (
    checkGitInstalled() &&
    // enable git
    (await confirm({
      message: locale.question.git,
      default: true,
    }))
  ) {
    execSync("git init -b main", {
      cwd,
      stdio: "ignore",
    });
    updateGitIgnore(targetDir, cwd);
    isGitRepo = true;
  }

  if (
    isGitRepo &&
    // enable workflow
    (await confirm({
      message: locale.question.workflow,
      default: true,
    }))
  ) {
    const workflowDir = resolve(cwd, ".github/workflows");

    ensureDirExistSync(workflowDir);

    writeFileSync(
      resolve(workflowDir, "deploy-docs.yml"),
      getWorkflowContent(packageManager, cwd, targetDir, locale),
      { encoding: "utf-8" },
    );
  }
};
