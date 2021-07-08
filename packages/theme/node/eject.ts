import { cyan, red } from "chalk";
import { copy } from "fs-extra";
import { relative, resolve } from "path";

// #region exclude-files
const EXCLUDED_FILES = [
  "__tests__",
  ".npmignore",
  "LICENSE",
  "package.json",
  "node_modules",
  "README.md",
  "readme.md",
];
// #endregion exclude-files

export const eject = async (dir: string): Promise<void> => {
  try {
    const sourceDir = resolve(__dirname, "../");
    const targetDir = resolve(process.cwd(), dir, ".vuepress/theme");

    await copy(sourceDir, targetDir, {
      filter: (src) => {
        return !EXCLUDED_FILES.includes(relative(sourceDir, src));
      },
    });

    console.log(`Copied vuepress-theme-hope into ${cyan(targetDir)}.\n`);
  } catch (err) {
    console.error(red((err as Error).stack || ""));
    process.exitCode = 1;
  }
};
