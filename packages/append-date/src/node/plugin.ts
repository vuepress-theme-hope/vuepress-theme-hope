import type { Page, PluginFunction } from "@vuepress/core";
import type { GitPluginPageData } from "@vuepress/plugin-git";
import { fs } from "@vuepress/utils";
import { checkVersion, startsWith } from "vuepress-shared/node";

import type { AppendDateOptions } from "./options.js";
import { PLUGIN_NAME, logger } from "./utils.js";

export const appendDatePlugin =
  ({ key = "date", format = "date" }: AppendDateOptions = {}): PluginFunction =>
  (app) => {
    checkVersion(app, PLUGIN_NAME, "2.0.0-beta.67");

    return {
      name: PLUGIN_NAME,

      onInitialized: async (app): Promise<void> => {
        if (
          app.pluginApi.plugins.every(
            (plugin) => plugin.name !== "@vuepress/plugin-git",
          )
        ) {
          logger.error(`[append-date] @vuepress/plugin-git is not installed`);

          return;
        }

        await Promise.all(
          (<Page<GitPluginPageData>[]>app.pages).map(
            async ({ data, filePath, frontmatter }) => {
              if (frontmatter[key] || !filePath) return;

              const { createdTime } = data.git;

              if (!createdTime) return;

              const date = new Date(createdTime);
              const dateText = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
              const timeText = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
              const text =
                format === "date" ? dateText : `${dateText} ${timeText}`;

              frontmatter[key] = new Date(createdTime);

              const content = await fs.readFile(filePath, "utf-8");

              await fs.writeFile(
                filePath,
                startsWith(content, "---\n")
                  ? `---\n${key}: ${text}\n${content.substring(4)}`
                  : `---\n${key}: ${text}\n---\n\n`,
                "utf-8",
              );
            },
          ),
        );
      },
    };
  };
