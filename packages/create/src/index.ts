#!/usr/bin/env node
import { existsSync, mkdirSync, writeFileSync, readFileSync } from "fs";
import { resolve } from "path";
import { deepAssign } from "@mr-hope/vuepress-shared";
import { cac } from "cac";
import { prompt } from "inquirer";
import execa = require("execa");
import { copy } from "./copy";
import { detectYarn } from "./hasYarn";
const cli = cac("vuepress-theme-hope");

const hasYarn = detectYarn();

cli
  .command("[dir]", "Generate a new vuepress-theme-hope project")
  .action(async (dir: string) => {
    if (!dir) return cli.outputHelp();

    const targetFolder = resolve(process.cwd(), dir);
    const packageJsonPath = resolve(process.cwd(), "package.json");
    const scripts = {
      "docs:build": `vuepress build ${dir}`,
      "dev:clean-dev": `vuepress dev ${dir} --no-cache`,
      "docs:dev": `vuepress dev ${dir}`,
      "docs:eject-theme": `vuepress eject-hope ${dir}`,
    };

    const devDependencies = {
      vuepress: "^1.8.2",
      "vuepress-theme-hope": "^1.12.3",
    };

    if (!existsSync(targetFolder)) mkdirSync(targetFolder);

    console.log("Generating package.json...");

    if (existsSync(packageJsonPath)) {
      // eslint-disable-next-line
      const packageContent: any = JSON.parse(
        readFileSync(packageJsonPath, { encoding: "utf-8" })
      );

      deepAssign(packageContent, { scripts, devDependencies });

      writeFileSync(
        packageJsonPath,
        `${JSON.stringify(packageContent, null, 2)}\n`,
        { encoding: "utf-8" }
      );
    } else {
      interface PromtAnswer {
        name: string;
        version: string;
        description: string;
      }

      const result = await prompt<PromtAnswer>([
        {
          name: "name",
          type: "input",
          default: "vuepress-theme-hope-project",
          validate: (input: string): true | string =>
            /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/u.exec(
              input
            )
              ? true
              : 'String does not match the pattern of "^(?:@[a-z0-9-*~][a-z0-9-*._~]*/)?[a-z0-9-~][a-z0-9-._~]*$".',
        },
        {
          name: "version",
          type: "input",
          default: "1.0.0",
          validate: (input: string): true | string =>
            /^[0-9]+\.[0-9]+\.(?:[0=9]+|[0-9]+-[a-z]+\.[0-9])$/u.exec(input)
              ? true
              : "Version must be parseable by node-semver, which is bundled with npm as a dependency.",
        },
        {
          name: "description",
          type: "input",
          default: "A project of vuepress-theme-hope",
        },
      ]);

      const packageContent = { ...result, scripts, devDependencies };

      writeFileSync(
        packageJsonPath,
        `${JSON.stringify(packageContent, null, 2)}\n`,
        { encoding: "utf-8" }
      );
    }

    console.log("Generating Template...");

    copy(resolve(__dirname, "../template"), resolve(process.cwd(), dir));

    console.log("Installing Deps...");

    console.warn("This may take a few minutes, please be patient.");

    execa.sync(hasYarn ? "yarn" : "npm", ["install"], { stdout: "inherit" });

    console.log("Successful Generated!");

    console.log("Staring dev server...");

    await execa(hasYarn ? "yarn" : "npm", ["run", "docs:dev"], {
      stdout: "inherit",
    });
  });

cli.help(() => [
  {
    title:
      "yarn create vuepress-theme-hope <dir> / npx create-vuepress-theme-hope <dir>",
    body: "Create a vuepress-theme-hope template in <dir>",
  },
]);

cli.parse();
