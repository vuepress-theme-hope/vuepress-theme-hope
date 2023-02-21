import { fs, path } from "@vuepress/utils";
import { endsWith, fromEntries } from "vuepress-shared/node";

import { CLIENT_FOLDER } from "./utils.js";

const getDirAlias = (dir: string): [string, string][] =>
  fs
    .readdirSync(path.resolve(CLIENT_FOLDER, dir))
    .filter(
      (file) =>
        // js files
        endsWith(file, ".js") ||
        // folder
        !file.includes(".")
    )
    .map<[string, string]>((file) => [
      `@theme-hope/${dir}/${file.replace(/\.js$/, "")}`,
      path.resolve(CLIENT_FOLDER, dir, file),
    ]);

const getEntryAlias = (entry: string): [string, string] | null =>
  fs.existsSync(path.resolve(CLIENT_FOLDER, entry, "index.js"))
    ? [
        `@theme-hope/${entry}/index`,
        path.resolve(CLIENT_FOLDER, entry, "index.js"),
      ]
    : null;

/**
 * @private
 */
export const getAlias = (isDebug: boolean): Record<string, string> => {
  // use alias to make all components replaceable
  const alias = fromEntries([
    // define components
    ...getDirAlias("components"),
    // define composables and utils
    ...["composables", "utils"]
      .map(getEntryAlias)
      .filter<[string, string]>(
        (item): item is [string, string] => item !== null
      ),
    // define modules
    ...fs
      .readdirSync(path.resolve(CLIENT_FOLDER, "modules"))
      .map((folder) => `modules/${folder}`)
      .map((file) => [
        // define module components
        ...getDirAlias(`${file}/components`),
        // define module composables and utils
        ...["composables", "utils"]
          .map((folder) => `${file}/${folder}`)
          .map(getEntryAlias)
          .filter<[string, string]>(
            (item): item is [string, string] => item !== null
          ),
      ])
      .flat(),
  ]);

  if (isDebug) console.log("Theme alias config:", alias);

  return alias;
};
