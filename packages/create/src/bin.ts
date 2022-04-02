import { sync } from "execa";

const isYarnInstalled = (): boolean => {
  try {
    return sync("yarn --version", { stdio: "ignore" }).exitCode === 0;
  } catch (e) {
    return false;
  }
};

export const bin = isYarnInstalled() ? "yarn" : "npm";
