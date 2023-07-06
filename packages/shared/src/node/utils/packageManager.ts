import { fs, path } from "@vuepress/utils";
import { execaCommandSync } from "execa";

export type PackageManager = "npm" | "yarn" | "pnpm";

const globalCache = new Map<string, boolean>();
const localCache = new Map<string, PackageManager>();

const NPM_LOCK = "package-lock.json";
const YARN_LOCK = "yarn.lock";
const PNPM_LOCK = "pnpm-lock.yaml";

const isInstalled = (packageManager: PackageManager): boolean => {
  try {
    return (
      execaCommandSync(`${packageManager} --version`, { stdio: "ignore" })
        .exitCode === 0
    );
  } catch (e) {
    return false;
  }
};

/**
 * Check if a package manager is installed globally.
 *
 * @param packageManager package manager
 */
export const hasGlobalInstallation = (
  packageManager: PackageManager,
): boolean => {
  const key = `global:${packageManager}`;

  const status = globalCache.get(key);

  if (status !== undefined) return status;

  if (isInstalled(packageManager)) {
    globalCache.set(key, true);

    return true;
  }

  return false;
};

/**
 * Get the type of lock file.
 *
 * @param cwd current working directory
 * @param deep whether to search in parent directories
 * @returns the type of lock file
 */
export const getTypeofLockFile = (
  cwd = process.cwd(),
  deep = true,
): PackageManager | null => {
  const key = `local:${cwd}`;

  const status = localCache.get(key);

  if (status !== undefined) return status;

  if (fs.existsSync(path.resolve(cwd, PNPM_LOCK))) {
    localCache.set(key, "pnpm");

    return "pnpm";
  }

  if (fs.existsSync(path.resolve(cwd, YARN_LOCK))) {
    localCache.set(key, "yarn");

    return "yarn";
  }

  if (fs.existsSync(path.resolve(cwd, NPM_LOCK))) {
    localCache.set(key, "npm");

    return "npm";
  }

  if (deep) {
    let dir = cwd;

    while (dir !== path.dirname(dir)) {
      dir = path.dirname(dir);

      if (fs.existsSync(path.resolve(dir, PNPM_LOCK))) {
        localCache.set(key, "pnpm");

        return "pnpm";
      }

      if (fs.existsSync(path.resolve(dir, YARN_LOCK))) {
        localCache.set(key, "yarn");

        return "yarn";
      }

      if (fs.existsSync(path.resolve(dir, NPM_LOCK))) {
        localCache.set(key, "npm");

        return "npm";
      }
    }
  }

  return null;
};

/**
 * Detect the package manager used in the current project.
 *
 * @param cwd current working directory
 * @param deep whether to search in parent directories
 * @returns the type of package manager
 */
export const detectPackageManager = (
  cwd = process.cwd(),
  deep = true,
): PackageManager => {
  const type = getTypeofLockFile(cwd, deep);

  return (
    type ||
    (hasGlobalInstallation("pnpm")
      ? "pnpm"
      : hasGlobalInstallation("yarn")
      ? "yarn"
      : "npm")
  );
};
