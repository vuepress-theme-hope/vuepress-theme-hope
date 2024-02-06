import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { execaCommandSync } from "execa";
import inquirer from "inquirer";

import type { Preset } from "./config.js";
import { presets } from "./config.js";
import { updateGitIgnore } from "./gitignore.js";
import type { CreateLocale, Lang } from "./i18n.js";
import { getWorkflowContent } from "./workflow.js";
import type { PackageManager } from "../utils/index.js";
import {
  checkGitInstalled,
  checkGitRepo,
  copy,
  ensureDirExistSync,
} from "../utils/index.js";

// eslint-disable-next-line @typescript-eslint/naming-convention
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = dirname(__filename);

interface TemplateOptions {
  packageManager: PackageManager;
  lang: Lang;
  locale: CreateLocale;
  cwd?: string;
  targetDir: string;
  preset?: Preset | null;
}

export const generateTemplate = async ({
  cwd = process.cwd(),
  targetDir,
  lang,
  locale,
  preset,
  packageManager,
}: TemplateOptions): Promise<void> => {
  const { i18n, workflow } = await inquirer.prompt<{
    i18n: boolean;
    workflow: boolean;
  }>([
    // TODO: Support it
    {
      name: "i18n",
      type: "confirm",
      message: locale.question.i18n,
      default: false,
    },
    {
      name: "workflow",
      type: "confirm",
      message: locale.question.workflow,
      default: true,
    },
  ]);

  if (!preset)
    ({ preset } = await inquirer.prompt<{ preset: Preset }>([
      {
        name: "preset",
        type: "list",
        message: locale.question.preset,
        choices: presets,
      },
    ]));

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

  if (i18n) {
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
  } else if (lang === "简体中文") {
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

  if (workflow) {
    const workflowDir = resolve(cwd, ".github/workflows");

    ensureDirExistSync(workflowDir);

    writeFileSync(
      resolve(workflowDir, "deploy-docs.yml"),
      getWorkflowContent(packageManager, targetDir, lang),
      { encoding: "utf-8" },
    );
  }

  // Git related
  const isGitRepo = checkGitRepo(cwd);

  if (isGitRepo) {
    updateGitIgnore(targetDir, cwd);
  } else if (checkGitInstalled()) {
    const { git } = await inquirer.prompt<{
      git: boolean;
    }>([
      {
        name: "git",
        type: "confirm",
        message: locale.question.git,
        default: true,
      },
    ]);

    if (git) {
      execaCommandSync("git init", { cwd });
      updateGitIgnore(targetDir, cwd);
    }
  }
};
