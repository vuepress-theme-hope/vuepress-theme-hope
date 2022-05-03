import chalk from "chalk";
import { execaCommand } from "execa";
import ora from "ora";
import inquirer from "inquirer";
import semver from "semver";
import pkg from "../../package.json";
import { getNpmTags, getVersion, versions } from "./version.js";
import { sync } from "./sync.js";

import type { ReleaseType } from "semver";
import type { Answers } from "./version.js";

const { version: currentVersion } = pkg;
const { prompt } = inquirer;
const { inc } = semver;

export const release = async (): Promise<void> => {
  const buildSpinner = ora("Building project").start();

  await execaCommand("pnpm clean");
  await execaCommand("pnpm build");

  buildSpinner.succeed();

  ora(`Current version: ${chalk.green(currentVersion)}`).info();

  const bumps: ReleaseType[] = [
    "prerelease",
    "patch",
    "minor",
    "major",
    "premajor",
  ];

  bumps.forEach((bump) => {
    versions[bump] = inc(currentVersion, bump) as string;
  });

  const bumpChoices = bumps.map((bump) => ({
    name: `${bump} (${versions[bump]})`,
    value: bump,
  }));

  const { bump, customVersion, npmTag } = await prompt<Answers>([
    {
      name: "bump",
      message: "Select release type:",
      type: "list",
      choices: [...bumpChoices, { name: "custom", value: "custom" }],
    },
    {
      name: "customVersion",
      message: "Input version:",
      type: "input",
      when: (answers): boolean => answers.bump === "custom",
    },
    {
      name: "npmTag",
      message: "Input npm tag:",
      type: "list",
      default: (answers: Answers): string => getNpmTags(getVersion(answers))[0],
      choices: (answers: Answers): string[] => getNpmTags(getVersion(answers)),
    },
  ]);

  const version = customVersion || versions[bump];

  const { confirm } = await prompt<{ confirm: "Y" | "N" }>([
    {
      name: "confirm",
      message: `Confirm releasing ${version} (${npmTag})?`,
      type: "list",
      choices: ["N", "Y"],
    },
  ]);

  if (confirm === "N") {
    ora(chalk.red("Release canceled.")).fail();

    return;
  }

  // bump version
  await execaCommand(`pnpm standard-version --release-as ${version}`, {
    stdio: "inherit",
  });

  // release
  await execaCommand("pnpm -r publish --tag next", { stdio: "inherit" });

  const npmmirrorSpinner = ora("Syncing npmmirror.com").start();

  await sync();

  npmmirrorSpinner.succeed();

  ora("Release complete").succeed();
};
