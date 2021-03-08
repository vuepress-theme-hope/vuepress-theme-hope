import { basename, dirname } from "path";
import execa = require("execa");
import type { GitContributor } from "../types";

export const getContributors = async (
  filePath: string
): Promise<GitContributor[]> => {
  const { stdout } = await execa(
    "git",
    ["--no-pager", "shortlog", "-nes", "--", basename(filePath)],
    {
      cwd: dirname(filePath),
      stdin: "inherit",
    }
  );

  return stdout
    .split("\n")
    .map((item) => /^(\d+)\t(.*) <(.*)>$/u.exec(item.trim()))
    .filter((item): item is RegExpExecArray => item !== null)
    .map(([, commits, name, email]) => ({
      name,
      email,
      commits: Number.parseInt(commits, 10),
    }));
};
