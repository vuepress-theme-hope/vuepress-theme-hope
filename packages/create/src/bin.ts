import { execaCommandSync } from "execa";

const checkPnpmInstalled = (): boolean => {
  try {
    return (
      execaCommandSync("pnpm --version", { stdio: "ignore" }).exitCode === 0
    );
  } catch (e) {
    return false;
  }
};

const checkYarnInstalled = (): boolean => {
  try {
    return (
      execaCommandSync("yarn --version", { stdio: "ignore" }).exitCode === 0
    );
  } catch (e) {
    return false;
  }
};

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

export const bin = checkPnpmInstalled()
  ? "pnpm"
  : checkYarnInstalled()
  ? "yarn"
  : "npm";
