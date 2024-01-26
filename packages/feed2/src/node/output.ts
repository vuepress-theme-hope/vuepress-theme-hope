import type { App } from "vuepress/core";
import { fs, path } from "vuepress/utils";

export const writeFiles = (
  app: App,
  files: [filename: string, content: string][],
): Promise<void>[] =>
  files.map(async ([filename, content]) => {
    const location = app.dir.dest(filename);

    await fs.ensureDir(path.dirname(location));
    await fs.writeFile(location, content, "utf-8");
  });
