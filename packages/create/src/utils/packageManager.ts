import { execaCommandSync } from "execa";
import inquirer from "inquirer";

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

const availablePackageManagers = ["npm"];

if (checkYarnInstalled()) availablePackageManagers.push("yarn");
if (checkPnpmInstalled()) availablePackageManagers.push("pnpm");

export type PackageManager = "npm" | "yarn" | "pnpm";

export interface PackageManagerAnswer {
  packageManager: PackageManager;
}

export const getPackageManager = async (
  message: string,
): Promise<PackageManager> =>
  (
    await inquirer.prompt<PackageManagerAnswer>([
      {
        name: "packageManager",
        type: "list",
        message,
        choices: availablePackageManagers,
      },
    ])
  ).packageManager;
