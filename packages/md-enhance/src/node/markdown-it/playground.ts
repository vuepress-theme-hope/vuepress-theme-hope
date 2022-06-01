import { hash } from "@vuepress/utils";
import { container } from "./container";
import { IMPORT_MAP_KEY } from "../../shared";

import type { PluginSimple, PluginWithOptions } from "markdown-it";
import type { default as Token } from "markdown-it/lib/token";
import type { PlaygroundFiles } from "../../shared";

const extensions = ["html", "js", "ts", "vue", "jsx", "tsx", "json"];

export const playground: PluginWithOptions<{ defaultImportMap?: string }> = (
  md,
  { defaultImportMap } = {}
) =>
  container(md, {
    name: "playground",
    openRender: (tokens: Token[], index: number): string => {
      const { info } = tokens[index];
      const title = info
        .trimStart()
        // 'playground' length
        .slice(10)
        .trim();

      const hashKey = `${index}-${title}`;
      const key = `playground-${hash(hashKey)}`;

      const codeConfigs: PlaygroundFiles = {};
      let settings: string | null = null;

      let configKey: string | null = null;
      let isSettings = false;

      for (let i = index; i < tokens.length; i++) {
        // console.log(i, tokens[i])
        const { type, content, info } = tokens[i];

        if (type === "container_playground_close") break;

        if (type === "container_file_open") {
          const fileName = info
            .trimStart()
            // 'file' length
            .slice(4)
            .trim();

          if (!fileName || fileName.length === 0) {
            continue;
          }
          configKey = fileName;
        } else if (type === "container_imports_open") {
          const fileName = info
            .trimStart()
            // 'imports' length
            .slice(7)
            .trim();

          if (fileName && fileName.length > 0) {
            configKey = fileName;
          } else {
            configKey = defaultImportMap || IMPORT_MAP_KEY;
          }
        } else if (type === "container_settings_open") {
          isSettings = true;
        } else if (type === "inline") {
          continue;
        }

        if (!content) continue;

        if (isSettings) {
          if (type === "fence" && info === "json") {
            settings = content.replace(/^\s+|\s+$/g, "").replace(/\/+$/, "");
          }
        } else {
          if (type === "fence" && extensions.includes(info) && configKey) {
            codeConfigs[configKey] = {
              lang: info,
              content: content,
            };
          }
        }

        // set to an unexisit token type
        tokens[i].type = "playground_empty";
        // hide token
        tokens[i].hidden = true;
      }

      const config = encodeURIComponent(JSON.stringify(codeConfigs));
      const settingString = settings
        ? encodeURIComponent(settings)
        : encodeURIComponent("{}");

      return `<Playground id="${key}" ${
        title ? `title="${encodeURIComponent(title)}" ` : ""
      }
      settings="${settingString}"
      config="${config}"
      >`;
    },
    closeRender: () => `</Playground>`,
  });

const getPlugin =
  (name: string, component: string): PluginSimple =>
  (md) =>
    container(md, {
      name,
      openRender: (tokens: Token[], index: number): string => {
        const { info } = tokens[index];
        const title = info.trimStart().slice(name.length).trim();

        let config = "";
        let lang = "";

        for (let i = index; i < tokens.length; i++) {
          const { type, content, info } = tokens[i];

          if (type === `container_${name}_close`) break;
          if (!content) continue;
          if (type === "fence" && extensions.includes(info)) {
            lang = info;
            config = encodeURIComponent(content);
            // break;
          }

          // set to an unexisit token type
          tokens[i].type = `${name}_empty`;
          // hide token
          tokens[i].hidden = true;
        }

        return `<${component} id="${name}-${hash(
          `${name}${index}${title}${config}`
        )}" ${title ? ` title="${encodeURIComponent(title)}"` : ""}${
          config ? ` config="${config}"` : ""
        } ${lang ? ` lang="${lang}"` : ""}>`;
      },
      closeRender: () => `</${component}>`,
    });

export const playFile: PluginSimple = getPlugin("file", "PlayFile");
export const playSettings: PluginSimple = getPlugin("settings", "PlaySettings");
export const playImports: PluginSimple = getPlugin("imports", "PlayImports");
