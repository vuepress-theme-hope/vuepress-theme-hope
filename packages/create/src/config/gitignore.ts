import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const getGitIgnorePath = (dir: string): string => `
node_modules/
${dir}/.vuepress/.cache/
${dir}/.vuepress/.temp/
${dir}/.vuepress/dist/
`;

export const updateGitIgnore = (dir: string): void => {
  const gitignorePath = resolve(process.cwd(), ".gitignore");

  const gitignoreContent = existsSync(gitignorePath)
    ? readFileSync(gitignorePath, {
        encoding: "utf-8",
      })
    : "";

  writeFileSync(gitignorePath, `${gitignoreContent}${getGitIgnorePath(dir)}`, {
    encoding: "utf-8",
  });
};
