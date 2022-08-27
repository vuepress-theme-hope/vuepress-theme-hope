import { Logger } from "vuepress-shared";
import { fs, getDirname, path } from "@vuepress/utils";

const __dirname = getDirname(import.meta.url);

export const emptyFile = path.resolve(__dirname, "../../styles/empty.scss");

export const logger = new Logger("vuepress-plugin-sass-palette");

export const getPath = (path: string): string =>
  fs.pathExistsSync(path) ? path : emptyFile;
