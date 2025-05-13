import { execSync } from "node:child_process";

export const checkGitRepo = (cwd = process.cwd()): boolean => {
  try {
    execSync("git status", {
      cwd,
      stdio: "ignore",
    });

    return true;
  } catch {
    return false;
  }
};

export const checkGitInstalled = (): boolean => {
  try {
    execSync("git --version", { stdio: "ignore" });

    return true;
  } catch {
    return false;
  }
};
