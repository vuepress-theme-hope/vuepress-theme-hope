#!/usr/bin/env node
import { existsSync, mkdirSync } from "fs";
import { resolve } from "path";
import { cac } from "cac";
import execa = require("execa");
import { copy } from "./copy";

const cli = cac("vuepress-theme-hope");

cli
  .command("[dir]", "Generate a new vuepress-theme-hope project")
  .action(async (dir: string) => {
    if (!dir) cli.outputHelp();

    const targetFolder = resolve(process.cwd(), dir);

    if (!existsSync(targetFolder)) mkdirSync(targetFolder);

    console.log("Generating Template...");

    copy(resolve(__dirname, "../template"), resolve(process.cwd(), dir));

    console.log("Installing Deps...");

    await execa("yarn", ["install"], {
      cwd: targetFolder,
    });

    console.log("Successful Generated!");

    console.log("Staring dev server...");

    await execa("yarn", ["run", "dev"], {
      cwd: targetFolder,
    });
  });

cli.help(() => [
  {
    title: "yarn create vuepress-theme-hope <dir>",
    body: "Create a vuepress-theme-hope template in <dir>",
  },
]);

cli.parse();
