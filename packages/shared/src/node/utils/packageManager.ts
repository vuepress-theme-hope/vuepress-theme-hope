import { existsSync } from "fs";
import { resolve } from "path";
import { sync } from "execa";

export type PackageManager = "npm" | "yarn" | "pnpm";

const globalCache = new Map<string, boolean>();
const localCache = new Map<string, PackageManager>();

const isInstalled = (packageManager: PackageManager): boolean => {
  try {
    return (
      sync(`${packageManager} --version`, { stdio: "ignore" }).exitCode === 0
    );
  } catch (e) {
    return false;
  }
};

/**
 * Check if a global package manager is available
 */
const hasGlobalInstallation = (packageManager: PackageManager): boolean => {
  const key = `global:${packageManager}`;

  const status = globalCache.get(key);

  if (status !== undefined) return status;

  if (isInstalled(packageManager)) {
    globalCache.set(key, true);

    return true;
  }

  return false;
};

const getTypeofLockFile = (cwd: string): PackageManager | null => {
  const key = `local:${cwd}`;

  const status = localCache.get(key);

  if (status !== undefined) return status;

  if (existsSync(resolve(cwd, "pnpm-lock.yaml"))) {
    localCache.set(key, "pnpm");

    return "pnpm";
  }

  if (existsSync(resolve(cwd, "yarn.lock"))) {
    localCache.set(key, "yarn");

    return "yarn";
  }

  if (existsSync(resolve(cwd, "package-lock.json"))) {
    localCache.set(key, "npm");

    return "npm";
  }

  return null;
};

export const detectPackageManager = (cwd = process.cwd()): PackageManager => {
  const type = getTypeofLockFile(cwd);

  return (
    type ||
    (hasGlobalInstallation("pnpm")
      ? "pnpm"
      : hasGlobalInstallation("yarn")
      ? "yarn"
      : "npm")
  );
};
