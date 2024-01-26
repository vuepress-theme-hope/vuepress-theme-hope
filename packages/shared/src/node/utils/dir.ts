import { fs, path } from "vuepress/utils";

export const getDirContents = (dir: string, base = ""): string[] =>
  fs
    .readdirSync(dir)
    .map((item) => {
      if (fs.statSync(path.join(dir, item)).isDirectory())
        return getDirContents(path.join(dir, item), path.join(base, item));

      return path.join(base, item);
    })
    .flat();
