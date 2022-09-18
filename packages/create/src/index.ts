#!/usr/bin/env node
import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { cac } from "cac";
import { execaCommand, execaCommandSync } from "execa";
import inquirer from "inquirer";

import { getLanguage, generateTemplate, version } from "./config/index.js";
import { createPackageJson } from "./packageJson.js";
import { getRegistry } from "./registry.js";
import { getPackageManager } from "./utils/index.js";

const cli = cac("vuepress-theme-hope");

cli
  .command("[dir]", "Generate a new vuepress-theme-hope project")
  .option("-p, --preset <preset>", "Choose preset to use")
  .usage(
    "pnpm create vuepress-theme-hope@next [dir] / npm init vuepress-theme-hope@next [dir]"
  )
  .example("docs")
  .action(
    async (
      targetDir: string,
      {
        preset = null,
      }: {
        preset?: "docs" | "blog" | null;
      }
    ) => {
      if (!targetDir) return cli.outputHelp();

      // get language
      const { lang, message } = await getLanguage();

      if (preset && !["doc", "blog"].includes(preset))
        return console.log(message.error.preset);

      // get packageManager
      const packageManager = await getPackageManager(
        message.question.packageManager
      );

      // check if the user is a noob and warn him 🤪
      if (targetDir.startsWith("[") && targetDir.endsWith("]"))
        return console.log(message.error.dir(packageManager));

      const targetDirPath = resolve(process.cwd(), targetDir);

      // check if the user is trying to cover his files
      if (existsSync(targetDirPath) && readdirSync(targetDirPath).length)
        return console.error(message.error.empty(targetDir));

      await createPackageJson(targetDir, message);

      await generateTemplate(targetDir, {
        packageManager,
        lang,
        message,
        preset,
      });

      /*
       * Install deps
       */

      const registry =
        packageManager === "pnpm"
          ? ""
          : await getRegistry(packageManager, lang);

      console.log(message.flow.install);
      console.warn(message.hint.install);

      execaCommandSync(
        `${packageManager} install ${registry ? "" : `--registry ${registry}`}`,
        { stdout: "inherit" }
      );

      console.log(message.hint.finish);

      /*
       * Open dev server
       */

      const { choice } = await inquirer.prompt<{ choice: boolean }>([
        {
          name: "choice",
          type: "confirm",
          message: message.question.devServer,
          default: true,
        },
      ]);

      if (choice) {
        console.log(message.flow.devServer);

        await execaCommand(`${packageManager} run docs:dev`, {
          stdout: "inherit",
        });
      } else console.log(message.hint.devServer(packageManager));
    }
  );

cli.help(() => [
  {
    title:
      "pnpm create vuepress-theme-hope@next [dir] / npm init vuepress-theme-hope@next [dir]",
    body: "Create a vuepress-theme-hope template in [dir]",
  },
]);

cli.version(version);

cli.parse();
