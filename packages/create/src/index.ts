#!/usr/bin/env node
import { createRequire } from "node:module";
import { cac } from "cac";
import { execaCommand, execaCommandSync } from "execa";
import inquirer from "inquirer";

import { getLanguage, generateTemplate } from "./config/index.js";
import { createPackageJson } from "./packageJson.js";
import { getRegistry } from "./registry.js";
import { getPackageManager } from "./utils/index.js";

const { version } = <Record<string, unknown>>(
  createRequire(import.meta.url)("create-vuepress-theme-hope/package.json")
);

const cli = cac("vuepress-theme-hope");

cli
  .command("[dir]", "Generate a new vuepress-theme-hope project")
  .usage(
    "pnpm create vuepress-theme-hope@next [dir] / npm init vuepress-theme-hope@next [dir]"
  )
  .example("docs")
  .action(async (dir: string) => {
    if (!dir) return cli.outputHelp();

    // get language
    const { lang, message } = await getLanguage();

    // get packageManager
    const packageManager = await getPackageManager(message.packageManager);

    // check if the user is a noob and warn him 🤪
    if (dir.startsWith("[") && dir.endsWith("]"))
      return console.log(message.dirError(packageManager));

    console.log(message.getVersion);

    await createPackageJson(packageManager, dir, message);

    await generateTemplate(packageManager, dir, lang, message);

    /*
     * Install deps
     */

    const registry =
      packageManager === "pnpm" ? "" : await getRegistry(packageManager, lang);

    console.log(message.install);
    console.warn(message.wait);

    execaCommandSync(
      `${packageManager} install ${registry ? "" : `--registry ${registry}`}`,
      { stdout: "inherit" }
    );

    console.log(message.success);

    /*
     * Open dev server
     */

    const { choice } = await inquirer.prompt<{ choice: boolean }>([
      {
        name: "choice",
        type: "confirm",
        message: message.devServerAsk,
        default: true,
      },
    ]);

    if (choice) {
      console.log(message.devServer);

      await execaCommand(`${packageManager} run docs:dev`, {
        stdout: "inherit",
      });
    } else console.log(message.hint(packageManager));
  });

cli.help(() => [
  {
    title:
      "pnpm create vuepress-theme-hope@next [dir] / npm init vuepress-theme-hope@next [dir]",
    body: "Create a vuepress-theme-hope template in [dir]",
  },
]);

cli.version(<string>version);

cli.parse();
