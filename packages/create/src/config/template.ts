import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { confirm, select } from "@inquirer/prompts";
import { execaCommandSync } from "execa";

import type { PackageManager, SupportedPreset } from "./config.js";
import { supportedPresets } from "./config.js";
import { updateGitIgnore } from "./gitignore.js";
import { getWorkflowContent } from "./workflow.js";
import type { CreateLocale, SupportedLang } from "../i18n/index.js";
import {
  checkGitInstalled,
  checkGitRepo,
  copy,
  ensureDirExistSync,
} from "../utils/index.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

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
  preset ??= await select<SupportedPreset>({
    message: locale.question.preset,
    choices: supportedPresets.map((preset) => ({
      name: preset,
      value: preset,
    })),
  });

  const enableI18n = await confirm({
    message: locale.question.i18n,
    default: false,
  });

  console.log(locale.flow.generateTemplate);

  const templateFolder = preset;

  // Copy public assets
  copy(
    resolve(__dirname, "../template/public"),
    resolve(cwd, targetDir, "./.vuepress/public"),
  );
  copy(
    resolve(__dirname, "../template", templateFolder, "config/base"),
    resolve(cwd, targetDir, ".vuepress"),
  );

  if (enableI18n) {
    copy(
      resolve(__dirname, "../template", templateFolder, "en"),
      resolve(cwd, targetDir),
    );
    copy(
      resolve(__dirname, "../template", templateFolder, "zh"),
      resolve(cwd, targetDir, "zh"),
    );
    copy(
      resolve(__dirname, "../template", templateFolder, "config/multi"),
      resolve(cwd, targetDir, ".vuepress"),
    );
  } else if (lang === "zh") {
    copy(
      resolve(__dirname, "../template", templateFolder, "zh"),
      resolve(cwd, targetDir),
    );
    copy(
      resolve(__dirname, "../template", templateFolder, "config/zh"),
      resolve(cwd, targetDir, ".vuepress"),
    );
  } else {
    copy(
      resolve(__dirname, "../template", templateFolder, "en"),
      resolve(cwd, targetDir),
    );
    copy(
      resolve(__dirname, "../template", templateFolder, "config/en"),
      resolve(cwd, targetDir, ".vuepress"),
    );
  }

  // Git related
  let isGitRepo = checkGitRepo(cwd);

  if (isGitRepo) {
    updateGitIgnore(targetDir, cwd);
  } else if (checkGitInstalled()) {
    if (
      // enable git
      await confirm({
        message: locale.question.git,
        default: true,
      })
    ) {
      execaCommandSync("git init -b main", { cwd });
      updateGitIgnore(targetDir, cwd);
      isGitRepo = true;
    }
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
