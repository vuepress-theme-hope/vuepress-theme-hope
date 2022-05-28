import { sync } from "execa";

const isPnpmInstalled = (): boolean => {
  try {
    return sync("pnpm --version", { stdio: "ignore" }).exitCode === 0;
  } catch (e) {
    return false;
  }
};

const isYarnInstalled = (): boolean => {
  try {
    return sync("yarn --version", { stdio: "ignore" }).exitCode === 0;
  } catch (e) {
    return false;
  }
};

export const bin = isPnpmInstalled()
  ? "pnpm"
  : isYarnInstalled()
  ? "yarn"
  : "npm";
