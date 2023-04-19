---
title: 环境相关
---

环境函数应该在 Node 端调用，你应该只在 Node 端代码中从 `vuepress-shared/node` 导入它们。

所有函数都应该在在返回 API 接口之前在插件函数中被调用。

如果不支持运行时环境，插件应该返回一个空的 api 接口，例如：

```ts
export const examplePlugin = (options) => (app) => {
  // 这应该是下方的函数
  const result = envCheck();

  if (!result) {
    console.warn("this plugin is not supported in this environment");

    return {
      name: "vuepress-plugin-example",
    };
  }

  // 返回实际插件
  return {
    name: "vuepress-plugin-example",
    // ...
  };
};
```

## checkVersion

检查 VuePress 的版本是否满足给定的范围。

```ts
/**
 * Check if the version of VuePress is satisfied with the given range
 *
 * @param app VuePress app
 * @param name current package name
 * @param range version range
 */
export const checkVersion = (app: App, name: string, range = "v2") => boolean;
```

## hasGlobalInstallation

检查包管理器是否在全局范围内安装。

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

获取锁定文件的类型。

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

检测当前项目中使用的包管理器。

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
