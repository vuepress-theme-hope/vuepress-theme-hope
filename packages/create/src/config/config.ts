import { execaCommandSync } from "execa";

export type SupportedBundler = "vite" | "webpack";
export const supportedBundlers: SupportedBundler[] = ["vite", "webpack"];

export type SupportedPreset = "blog" | "docs";
export const supportedPresets: SupportedPreset[] = ["blog", "docs"];

export type PackageManager = "npm" | "yarn" | "pnpm";

const checkPnpmInstalled = (): boolean => {
  try {
    return (
      execaCommandSync("pnpm --version", { stdio: "ignore" }).exitCode === 0
    );
  } catch {
    return false;
  }
};

const checkYarnInstalled = (): boolean => {
  try {
    return (
      execaCommandSync("yarn --version", { stdio: "ignore" }).exitCode === 0
    );
  } catch {
    return false;
  }
};

const availablePackageManagers: PackageManager[] = ["npm"];

if (checkPnpmInstalled()) availablePackageManagers.unshift("pnpm");
if (checkYarnInstalled()) availablePackageManagers.unshift("yarn");

export { availablePackageManagers };
