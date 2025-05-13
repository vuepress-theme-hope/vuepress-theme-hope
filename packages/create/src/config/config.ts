import { spawnSync } from "node:child_process";

export type SupportedBundler = "vite" | "webpack";
export const supportedBundlers: SupportedBundler[] = ["vite", "webpack"];

export type SupportedPreset = "blog" | "docs";
export const supportedPresets: SupportedPreset[] = ["blog", "docs"];

export type PackageManager = "npm" | "yarn" | "pnpm";

const checkPnpmInstalled = (): boolean => {
  try {
    return (
      spawnSync("pnpm --version", [], {
        stdio: "ignore",
        shell: true,
      }).status === 0
    );
  } catch {
    return false;
  }
};

const checkYarnInstalled = (): boolean => {
  try {
    return (
      spawnSync("yarn --version", [], {
        stdio: "ignore",
        shell: true,
      }).status === 0
    );
  } catch {
    return false;
  }
};

const availablePackageManagers: PackageManager[] = ["npm"];

if (checkPnpmInstalled()) availablePackageManagers.unshift("pnpm");
if (checkYarnInstalled()) availablePackageManagers.unshift("yarn");

export { availablePackageManagers };
