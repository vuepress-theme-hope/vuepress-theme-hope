import execa = require("execa");
import ora = require("ora");
import { green, red } from "chalk";
import { prompt } from "inquirer";
import { ReleaseType, inc } from "semver";
import { version as currentVersion } from "../../lerna.json";
import { getNpmTags, getVersion, versions } from "./version";
import { sync } from "./sync";
import type { Answers } from "./version";

export const release = async (): Promise<void> => {
  const buildSpinner = ora("Building project").start();

  await execa("pnpm", ["exec", "clean"]);
  await execa("pnpm", ["exec", "build"]);

  buildSpinner.succeed();

  ora(`Current version: ${green(currentVersion)}`).info();

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
    ora(red("Release canceled.")).fail();
    return;
  }

  const releaseArguments = [
    "publish",
    version,
    "--dist-tag",
    npmTag,
    "--registry",
    "https://registry.npmjs.org/",
  ];

  await execa(require.resolve("lerna/cli"), releaseArguments, {
    stdio: "inherit",
  });

  const npmmirrorSpinner = ora("Syncing npmmirror.com").start();

  await sync();

  npmmirrorSpinner.succeed();

  ora("Release complete").succeed();
};
