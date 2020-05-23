const execa = require("execa");
const semver = require("semver");
const inquirer = require("inquirer");
const versions = {};
const curVersion = require("../lerna.json").version;

const getVersion = (answers) => answers.customVersion || versions[answers.bump];

const isPreRelease = (version) => Boolean(semver.prerelease(version));

const getNpmTags = (version) => {
  if (isPreRelease(version)) return ["next", "alpha", "beta", "latest"];

  return ["latest", "beta", "alpha", "next"];
};

const release = async () => {
  await execa("yarn", ["run", "tsc"]);

  console.log(`Current version: ${curVersion}`);

  const bumps = ["patch", "minor", "major", "prerelease", "premajor"];

  bumps.forEach((bump) => {
    versions[bump] = semver.inc(curVersion, bump);
  });

  const bumpChoices = bumps.map((bump) => ({
    name: `${bump} (${versions[bump]})`,
    value: bump,
  }));

  const { bump, customVersion, npmTag } = await inquirer.prompt([
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
      when: (answers) => answers.bump === "custom",
    },
    {
      name: "npmTag",
      message: "Input npm tag:",
      type: "list",
      default: (answers) => getNpmTags(getVersion(answers))[0],
      choices: (answers) => getNpmTags(getVersion(answers)),
    },
  ]);

  const version = customVersion || versions[bump];

  const { yes } = await inquirer.prompt([
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
