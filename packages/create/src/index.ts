#!/usr/bin/env node
import { cac } from "cac";
import execa from "execa";
import { prompt } from "inquirer";

import { bin } from "./bin";
import { getLanguage } from "./i18n";
import { createPackageJson } from "./packageJson";
import { getRegistry } from "./registry";
import { generateTemplate } from "./template";

const cli = cac("vuepress-theme-hope");
// eslint-disable-next-line
const version = require("../package.json").version as string;

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

    // check if the user is a noob and warn him 🤪
    if (dir.startsWith("[") && dir.endsWith("]"))
      return console.log(message.dirError);

    console.log(message.getVersion);

    await createPackageJson(dir, message);

    await generateTemplate(dir, lang, message);

    /**
     * Install deps
     */

    const registry = await getRegistry(lang);

    console.log(message.install);
    console.warn(message.wait);

    execa.sync(
      bin,
      ["install", ...(bin === "pnpm" ? [] : ["--registry", registry])],
      { stdout: "inherit" }
    );

    console.log(message.success);

    /**
     * Open dev server
     */

    const { choice } = await prompt<{ choice: boolean }>([
      {
        name: "choice",
        type: "confirm",
        message: message.devServerAsk,
        default: true,
      },
    ]);

    if (choice) {
      console.log(message.devServer);

      await execa(bin, ["run", "docs:dev"], {
        stdout: "inherit",
      });
    } else console.log(message.hint);
  });

cli.help(() => [
  {
    title:
      "pnpm create vuepress-theme-hope@next [dir] / npm init vuepress-theme-hope@next [dir]",
    body: "Create a vuepress-theme-hope template in [dir]",
  },
]);

cli.version(version);

cli.parse();
