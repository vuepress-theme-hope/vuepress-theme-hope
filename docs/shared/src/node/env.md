---
title: Environment Related
---

Environment functions should be called at node side, you shall import them from `vuepress-shared/node` in node side code only.

All functions are expected be called in plugin function before returning an API interface.

The plugin should return an empty api interface if the runtime environment is not supported, e.g:

```ts
export const examplePlugin = (options) => (app) => {
  // this should be some of the following functions
  const result = envCheck();

  if (!result) {
    console.warn("this plugin is not supported in this environment");

    return {
      name: "vuepress-plugin-example",
    };
  }

  // return the actual plugin
  return {
    name: "vuepress-plugin-example",
    // ...
  };
};
```

## hasGlobalInstallation

Check if a package manager is installed globally.

```ts
/**
 * Check if a package manager is installed globally.
 *
 * @param packageManager package manager
 */
export const hasGlobalInstallation = (packageManager: PackageManager) =>
  boolean;
```

## getTypeofLockFile

Get the type of lock file.

```ts
/**
 * Get the type of lock file.
 *
 * @param cwd current working directory
 * @param deep whether to search in parent directories
 * @returns the type of lock file
 */
export const getTypeofLockFile = (app: App) => "yarn" | "npm" | "pnpm" | null;
```

## detectPackageManager

Detect the package manager used in the current project.

```ts
/**
 * Detect the package manager used in the current project.
 *
 * @param cwd current working directory
 * @param deep whether to search in parent directories
 * @returns the package manager used in the current project
 */
export const detectPackageManager = (cwd = process.cwd(), deep = true) =>
  "yarn" | "npm" | "pnpm";
```
