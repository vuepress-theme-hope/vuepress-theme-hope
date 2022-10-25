import { fs, getDirname, path } from "@vuepress/utils";

const __dirname = getDirname(import.meta.url);

const getDirAlias = (dir: string): [string, string][] =>
  fs
    .readdirSync(path.resolve(__dirname, "../client", dir))
    .filter(
      (file) =>
        file.endsWith(".js") || file.endsWith(".vue") || !file.includes(".")
    )
    .map<[string, string]>((file) => [
      `@theme-hope/${dir}/${file}`,
      path.resolve(__dirname, "../client", dir, file),
    ]);

const getEntryAlias = (entry: string): [string, string] | null =>
  fs.existsSync(path.resolve(__dirname, "../client", entry, "index.js"))
    ? [
        `@theme-hope/${entry}/index.js`,
        path.resolve(__dirname, "../client", entry, "index.js"),
      ]
    : null;

export const resolveAlias = (isDebug: boolean): Record<string, string> => {
  // use alias to make all components replaceable
  const alias = Object.fromEntries([
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
      .readdirSync(path.resolve(__dirname, "../client/modules"))
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
