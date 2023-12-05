import { fs, path } from "@vuepress/utils";
import { endsWith, fromEntries } from "vuepress-shared/node";

import { CLIENT_FOLDER } from "./utils.js";

const getDirAlias = (dir: string): [string, string][] => {
  const dirPath = path.resolve(CLIENT_FOLDER, dir);

  return fs.existsSync(dirPath)
    ? fs
        .readdirSync(dirPath)
        .filter(
          (file) =>
            // js files
            endsWith(file, ".js") ||
            // folder
            !file.includes("."),
        )
        .map<[string, string]>((file) => [
          `@theme-hope/${dir}/${file.replace(/\.js$/, "")}`,
          path.resolve(CLIENT_FOLDER, dir, file),
        ])
    : [];
};

const getEntryAlias = (entry: string): [string, string] | null => {
  const entryPath = path.resolve(CLIENT_FOLDER, entry, "index.js");

  return fs.existsSync(entryPath)
    ? [`@theme-hope/${entry}/index`, entryPath]
    : null;
};

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
        (item): item is [string, string] => item !== null,
      ),
    // define layouts
    ...getDirAlias("layouts"),
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
            (item): item is [string, string] => item !== null,
          ),
        // define layouts
        ...getDirAlias(`${file}/layouts`),
      ])
      .flat(),
  ]);

  if (isDebug) console.log("Theme alias config:", alias);

  return alias;
};
