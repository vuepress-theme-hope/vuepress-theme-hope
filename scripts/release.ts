import { execaCommand } from "execa";
import inquirer from "inquirer";
import ora from "ora";
import pc from "picocolors";

import pkg from "../package.json" assert { type: "json" };

const { version } = pkg;
const { prompt } = inquirer;

const tags = ["latest", "alpha", "beta", "next", "test"];

const release = async (): Promise<void> => {
  ora(`Current version: ${pc.green(version)}`).info();

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
};

await release();
