import { execaCommandSync } from "execa";

export const checkGitRepo = (): boolean => {
  try {
    execaCommandSync("git log");

    return true;
  } catch {
    return false;
  }
};

export const checkGitInstalled = (): boolean => {
  try {
    execaCommandSync("git log");

    return true;
  } catch {
    return false;
  }
};
