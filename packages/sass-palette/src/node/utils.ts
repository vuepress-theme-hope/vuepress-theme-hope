import { Logger } from "vuepress-shared";
import { fs, path } from "@vuepress/utils";

export const emptyFile = path.resolve(__dirname, "../../styles/empty.scss");

export const logger = new Logger("vuepress-plugin-sass-palette");

export const getPath = (path: string): string =>
  fs.pathExistsSync(path) ? path : emptyFile;
