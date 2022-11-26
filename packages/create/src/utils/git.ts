import { execaCommandSync } from "execa";

export const checkGitRepo = (cwd = process.cwd()): boolean => {
  try {
    execaCommandSync("git status", { cwd });

    return true;
  } catch {
    return false;
  }
};

export const checkGitInstalled = (): boolean => {
  try {
    execaCommandSync("git --version");

    return true;
  } catch {
    return false;
  }
};
