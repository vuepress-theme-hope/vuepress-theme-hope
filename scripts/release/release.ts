import chalk from "chalk";
import { execaCommand } from "execa";
import ora from "ora";
import inquirer from "inquirer";
import pkg from "../../package.json";
import { getNpmTags, getVersion } from "./version.js";
import { sync } from "./sync.js";

import type { Answers } from "./version.js";

const { version: currentVersion } = pkg;
const { prompt } = inquirer;

export const release = async (): Promise<void> => {
  const buildSpinner = ora("Building project").start();

  await execaCommand("pnpm clean");
  await execaCommand("pnpm build");

  buildSpinner.succeed();

  ora(`Current version: ${chalk.green(currentVersion)}`).info();

  const { npmTag } = await prompt<Answers>([
    {
      name: "npmTag",
      message: "Input npm tag:",
      type: "list",
      default: (answers: Answers): string => getNpmTags(getVersion(answers))[0],
      choices: (answers: Answers): string[] => getNpmTags(getVersion(answers)),
    },
  ]);

  // bump version, generate changelog, commit and push tags
  await execaCommand(
    `pnpm bumpp package.json demo/*/package.json docs/*/package.json packages/*/package.json --execute="pnpm standard-version --skip.bump --skip.commit --skip.tag && git add CHANGELOG.md" --commit "chore(release): publish v%s" --all --tag --push`,
    {
      stdio: "inherit",
    }
  );

  // release
  await execaCommand(`pnpm -r publish --tag ${npmTag}`, { stdio: "inherit" });

  const npmmirrorSpinner = ora("Syncing npmmirror.com").start();

  await sync();

  npmmirrorSpinner.succeed();

  ora("Release complete").succeed();
};
