import { sync } from "execa";

export const detectYarn = (): boolean => {
  try {
    sync("yarn --version", { stdio: "ignore" });
    return true;
  } catch (e) {
    return false;
  }
};
