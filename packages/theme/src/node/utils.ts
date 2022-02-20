import { Logger } from "@mr-hope/vuepress-shared";
import { fs, path } from "@vuepress/utils";

export const logger = new Logger("vuepress-theme-hope");

export const deepReadDir = (base: string, dir = ""): string[] => {
  const dirPath = path.resolve(base, dir);
  const files = fs.readdirSync(dirPath);

  return files
    .map((file) =>
      fs.statSync(path.join(dirPath, file)).isDirectory()
        ? deepReadDir(base, path.join(dir, file))
        : [`${dir ? `${dir}/` : ""}${file}`]
    )
    .flat();
};
