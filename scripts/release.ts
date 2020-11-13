import * as execa from "execa";
import * as inquirer from "inquirer";
import { ReleaseType, inc, prerelease } from "semver";
import { version as currentVersion } from "../lerna.json";

interface Answers {
  bump: string;
  customVersion: string;
  npmTag: string;
}

const versions: Record<string, string> = {};

const getVersion = (answers: Answers): string =>
  answers.customVersion || versions[answers.bump];

const isPreRelease = (version: string): boolean => Boolean(prerelease(version));

const getNpmTags = (version: string): string[] => {
  if (isPreRelease(version)) return ["next", "alpha", "beta", "latest"];

  return ["latest", "beta", "alpha", "next"];
};

const release = async (): Promise<void> => {
  await execa("yarn", ["run", "typescript:compile"]);

  console.log(`Current version: ${currentVersion}`);

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

  const { bump, customVersion, npmTag } = await inquirer.prompt<Answers>([
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

  const { yes } = await inquirer.prompt<{ yes: "Y" | "N" }>([
    {
      name: "yes",
      message: `Confirm releasing ${version} (${npmTag})?`,
      type: "list",
      choices: ["N", "Y"],
    },
  ]);

  if (yes === "N") {
    console.log("[release] cancelled.");
    return;
  }

  const releaseArguments = [
    "publish",
    version,
    "--force-publish",
    "--dist-tag",
    npmTag,
    "--registry",
    "https://registry.npmjs.org/",
  ];

  console.log(`lerna ${releaseArguments.join(" ")}`);

  await execa(require.resolve("lerna/cli"), releaseArguments, {
    stdio: "inherit",
  });

  await execa("yarn", ["run", "changelog"]);
};

release().catch((err) => {
  console.error(err);
  process.exit(1);
});
