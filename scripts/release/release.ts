import chalk from "chalk";
import { execaCommand } from "execa";
import ora from "ora";
import inquirer from "inquirer";
import pkg from "../../package.json";
import { sync } from "./sync.js";

const { version: currentVersion } = pkg;
const { prompt } = inquirer;

const tags = ["next", "test", "alpha", "beta", "latest"];

export const release = async (): Promise<void> => {
  ora(`Current version: ${chalk.green(currentVersion)}`).info();

  const { npmTag } = await prompt<{ npmTag: string }>([
    {
      name: "npmTag",
      message: "Input npm tag:",
      type: "list",
      default: tags[0],
      choices: tags,
    },
  ]);

  // release
  await execaCommand(`pnpm -r publish --tag ${npmTag}`, { stdio: "inherit" });

  const npmmirrorSpinner = ora("Syncing npmmirror.com").start();

  await sync();

  npmmirrorSpinner.succeed();

  ora("Release complete").succeed();
};
