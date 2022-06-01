import { execaCommandSync } from "execa";

const isPnpmInstalled = (): boolean => {
  try {
    return (
      execaCommandSync("pnpm --version", { stdio: "ignore" }).exitCode === 0
    );
  } catch (e) {
    return false;
  }
};

const isYarnInstalled = (): boolean => {
  try {
    return (
      execaCommandSync("yarn --version", { stdio: "ignore" }).exitCode === 0
    );
  } catch (e) {
    return false;
  }
};

export const bin = isPnpmInstalled()
  ? "pnpm"
  : isYarnInstalled()
  ? "yarn"
  : "npm";
