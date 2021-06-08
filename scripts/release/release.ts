import execa = require("execa");
import { black, cyan, green, red } from "chalk";
import { prompt } from "inquirer";
import { ReleaseType, inc } from "semver";
import { version as currentVersion } from "../../lerna.json";
import { getNpmTags, getVersion, versions } from "./version";
import { sync } from "./sync";
import type { Answers } from "./version";

export const release = async (): Promise<void> => {
  console.log(black.bgYellow("wait"), "Building project...");
  await execa("yarn", ["run", "clean"]);
  await execa("yarn", ["run", "build"]);

  console.log(`Current version: ${green(currentVersion)}`);

  const bumps: ReleaseType[] = [
    "patch",
    "minor",
    "major",
    "prerelease",
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

  if (confirm === "N") return console.log(red("Release canceled."));

  const releaseArguments = [
    "publish",
    version,
    "--dist-tag",
    npmTag,
    "--registry",
    "https://registry.npmjs.org/",
  ];

  console.log(cyan(`lerna ${releaseArguments.join(" ")}`));

  await execa(require.resolve("lerna/cli"), releaseArguments, {
    stdio: "inherit",
  });

  console.log(black.bgYellow("wait"), "Syncing npm.taobao.org...");

  await sync();

  console.log(black.bgYellow("wait"), "Generating changelog...");

  await execa("yarn", ["run", "changelog"]);

  console.log(green("Release complete"));
};
