import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { execaCommandSync } from "execa";
import inquirer from "inquirer";

import { updateGitIgnore } from "./gitignore.js";
import { type CreateI18n, type Lang } from "./i18n.js";
import { getWorkflowContent } from "./workflow.js";
import {
  type PackageManager,
  checkGitInstalled,
  checkGitRepo,
  copy,
  ensureDirExistSync,
} from "../utils/index.js";

// eslint-disable-next-line @typescript-eslint/naming-convention
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = dirname(__filename);

export const generateTemplate = async (
  targetDir: string,
  {
    cwd = process.cwd(),
    packageManager,
    lang,
    message,
    preset,
  }: {
    cwd?: string;
    packageManager: PackageManager;
    lang: Lang;
    message: CreateI18n;
    preset?: "blog" | "docs" | null;
  }
): Promise<void> => {
  const { workflow } = await inquirer.prompt<{
    // i18n: boolean;
    workflow: boolean;
  }>([
    // TODO: Support it
    // {
    //   name: "i18n",
    //   type: "confirm",
    //   message: message.question.i18n,
    //   default: false,
    // },
    {
      name: "workflow",
      type: "confirm",
      message: message.question.workflow,
      default: true,
    },
  ]);

  if (!preset)
    preset = (
      await inquirer.prompt<{ preset: "blog" | "docs" }>([
        {
          name: "preset",
          type: "list",
          message: message.question.preset,
          choices: ["blog", "docs"],
        },
      ])
    ).preset;

  console.log(message.flow.generateTemplate);

  // copy public assets
  copy(
    resolve(__dirname, "../template/public"),
    resolve(cwd, targetDir, "./.vuepress/public")
  );

  const templateFolder = preset;

  copy(
    resolve(__dirname, "../template", templateFolder),
    resolve(cwd, targetDir)
  );

  if (workflow) {
    const workflowDir = resolve(cwd, ".github/workflows");

    ensureDirExistSync(workflowDir);

    writeFileSync(
      resolve(workflowDir, "deploy-docs.yml"),
      getWorkflowContent(packageManager, targetDir, lang),
      { encoding: "utf-8" }
    );
  }

  // git related
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
        message: message.question.git,
        default: true,
      },
    ]);

    if (git) {
      execaCommandSync("git init", { cwd });
      updateGitIgnore(targetDir, cwd);
    }
  }
};
