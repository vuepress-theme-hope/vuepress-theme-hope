import { createRequire } from "node:module";

import type { Page, PluginFunction } from "@vuepress/core";
import type { GitPluginPageData } from "@vuepress/plugin-git";
import { fs } from "@vuepress/utils";
import {
  checkVersion,
  getDateString,
  getFullDateString,
  getTimeString,
  startsWith,
} from "vuepress-shared/node";

import type { AppendDateOptions } from "./options.js";
import { PLUGIN_NAME, logger } from "./utils.js";

const require = createRequire(import.meta.url);

export const appendDatePlugin =
  ({ key = "date", format = "date" }: AppendDateOptions = {}): PluginFunction =>
  (app) => {
    checkVersion(app, PLUGIN_NAME, "2.0.0-rc.0");

    return {
      name: PLUGIN_NAME,

      onInitialized: async (app): Promise<void> => {
        if (
          app.pluginApi.plugins.every(
            (plugin) => plugin.name !== "@vuepress/plugin-git",
          )
        ) {
          try {
            require.resolve("@vuepress/plugin-git");

            logger.info(`@vuepress/plugin-git is not enabled.`);
          } catch (err) {
            logger.error(
              `@vuepress/plugin-git is required for this plugin, please install it.`,
            );
          }

          return;
        }

        await Promise.all(
          (<Page<GitPluginPageData>[]>app.pages).map(
            async ({ data, filePath, frontmatter }) => {
              if (frontmatter[key] || !filePath) return;

              const { createdTime } = data.git;

              if (!createdTime) return;

              const date = new Date(createdTime);

              const text =
                format === "time"
                  ? getTimeString(date)
                  : format === "full"
                    ? getFullDateString(date)
                    : getDateString(date);

              frontmatter[key] = new Date(createdTime);

              const markdownContent = await fs.readFile(filePath, "utf-8");

              await fs.writeFile(
                filePath,
                startsWith(markdownContent, "---\n")
                  ? `---\n${key}: ${text}\n${markdownContent.substring(4)}`
                  : `---\n${key}: ${text}\n---\n\n`,
                "utf-8",
              );
            },
          ),
        );
      },
    };
  };
