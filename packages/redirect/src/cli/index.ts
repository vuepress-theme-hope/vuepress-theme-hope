#!/usr/bin/env node
import { createRequire } from "node:module";

import {
  loadUserConfig,
  resolveAppConfig,
  resolveCliAppConfig,
  resolveUserConfigConventionalPath,
  transformUserConfigToPlugin,
} from "@vuepress/cli";
import { createBuildApp } from "@vuepress/core";
import { fs, logger, path } from "@vuepress/utils";
import { cac } from "cac";
import { removeEndingSlash, removeLeadingSlash } from "vuepress-shared/node";

import { getRedirectHTML } from "../node/utils.js";

const require = createRequire(import.meta.url);

const cli = cac("vp-redirect");
const version = <
  string // eslint-disable-next-line
>require("vuepress-plugin-redirect/package.json").version;

cli
  .command(
    "generate [source-dir]",
    "Generate redirect site using VuePress project under source folder"
  )
  .option(
    "--hostname <hostname>",
    "Hostname to redirect to (E.g.: https://new.example.com/)",
    {
      default: "/",
    }
  )
  .option("-c, --config <config>", "Set path to config file")
  .option(
    "-o, --output <output>",
    "Set the output directory (default: .vuepress/redirect)"
  )
  .option("--cache <cache>", "Set the directory of the cache files")
  .option("-t, --temp <temp>", "Set the directory of the temporary files")
  .option("--clean-cache", "Clean the cache files before generation")
  .option("--clean-temp", "Clean the temporary files before generation")
  .action(
    async (
      sourceDir: string,
      commandOptions: {
        hostname: string;
        output?: string;
        config?: string;
        cache: string;
        temp?: string;
        cleanCache?: boolean;
        cleanTemp?: boolean;
      }
    ) => {
      if (!sourceDir) return cli.outputHelp();

      if (process.env["NODE_ENV"] === undefined)
        process.env["NODE_ENV"] = "production";

      // resolve app config from cli options
      const cliAppConfig = resolveCliAppConfig(sourceDir, {});

      // resolve user config file
      const userConfigPath = resolveUserConfigConventionalPath(
        cliAppConfig.source
      );

      const { userConfig } = await loadUserConfig(userConfigPath);

      // resolve the final app config to use
      const appConfig = resolveAppConfig({
        defaultAppConfig: {},
        cliAppConfig,
        userConfig,
      });

      if (appConfig === null) return;

      // create vuepress app
      const app = createBuildApp(appConfig);

      // use user-config plugin
      app.use(transformUserConfigToPlugin(userConfig, cliAppConfig.source));

      // clean temp and cache
      if (commandOptions.cleanTemp === true) {
        logger.info("Cleaning temp...");
        await fs.remove(app.dir.temp());
      }
      if (commandOptions.cleanCache === true) {
        logger.info("Cleaning cache...");
        await fs.remove(app.dir.cache());
      }

      const outputFolder = commandOptions.output
        ? path.join(process.cwd(), commandOptions.output)
        : path.join(app.dir.source(), ".vuepress", "redirect");

      // empty output directory
      await fs.emptyDir(outputFolder);

      // initialize vuepress app to get pages
      logger.info("Initializing VuePress and preparing data...");

      await app.init();

      // redirect all pages

      // initialize vuepress app to get pages
      logger.info("Generating redirect pages...");

      await Promise.all(
        app.pages.map((page) => {
          const redirectUrl = `${removeEndingSlash(commandOptions.hostname)}${
            app.options.base
          }${removeLeadingSlash(page.path)}`;
          const destLocation = path.join(
            outputFolder,
            removeLeadingSlash(page.path.replace(/\/$/, "/index.html"))
          );

          return fs
            .ensureDir(path.dirname(destLocation))
            .then(() =>
              fs.writeFile(destLocation, getRedirectHTML(redirectUrl))
            );
        })
      );
    }
  );

cli.command("").action(() => cli.outputHelp());

cli.help();
cli.version(version);

cli.parse();
