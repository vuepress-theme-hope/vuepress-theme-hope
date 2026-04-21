import { dirname } from "node:path";

import type { UserConfig } from "tsdown";
import { defineConfig } from "tsdown";

const isProduction = process.env.NODE_ENV === "production";

const defaultModuleSideEffects = (id: string): boolean =>
  id.endsWith(".css") || id.endsWith(".scss");

/**
 * Tsdown options
 *
 * Tsdown 选项
 */
export interface TsdownOptions extends Omit<UserConfig, "entry" | "copy"> {
  /**
   * Whitelist of dependencies allowed to be bundled
   *
   * 允许被打包的依赖白名单
   *
   * @default browser ? false : undefined
   */
  onlyBundle?: (string | RegExp)[] | false;

  /**
   * Packages to always bundle
   *
   * 永远打包的包
   */
  alwaysBundle?: (string | RegExp)[];

  /**
   * Assets to never bundle
   *
   * 永远不打包的资源
   *
   * `@temp/`, `@internal/` 以及 .css/.scss 文件默认不打包
   */
  neverBundle?: (string | RegExp)[];

  /**
   * Custom module side effects determination
   *
   * By default, only `.css` and `.scss` imports are considered to have side effects. Use this to
   * add additional side-effect patterns. This is part of the `treeshake` option in
   * tsdown/rolldown.
   *
   * 自定义模块副作用判定，默认仅保留 `.css` 和 `.scss` 导入的副作用。
   *
   * @default (id) => id.endsWith('.css') || id.endsWith('.scss')
   * @param id - Module ID / 模块 ID
   * @param external - Whether the module is external / 模块是否为外部模块
   */
  moduleSideEffects?: (id: string, external: boolean) => boolean | undefined;

  /**
   * Additional files to copy to the output directory
   *
   * 要复制到输出目录的额外文件
   *
   * Each item is a tuple of [from, to], where 'from' is the source path relative to src, and 'to'
   * is the destination path relative to the output directory. To can be omitted to copy to the same
   * relative path in the output directory.
   *
   * 每项都是一个 [from, to] 的元组，其中 'from' 是相对于 src 目录的源路径，'to' 是相对于输出目录的目标路径。to 可以省略，表示复制到输出目录的相同相对路径。
   *
   * @example
   *   copy: [
   *     ["assets/"], // Copy src/assets/ folder to dist/assets/
   *     ["types/global.d.ts", "global.d.ts"], // Copy src/types/global.d.ts to dist/global.d.ts
   *   ];
   */
  copy?: [from: string, to?: string][];
}

const resolveEntry = (entryItem: string): string =>
  `./src/${entryItem.includes(".") ? entryItem : `${entryItem}.ts`}`;

/**
 * Create tsdown configuration
 *
 * 创建 tsdown 配置
 *
 * @param entryOptions - Entry options / 入口选项
 * @param options - Tsdown options / Tsdown 选项
 * @returns Tsdown configuration / Tsdown 配置
 */
export const tsdownConfig = (
  entryOptions: UserConfig["entry"],
  {
    alias,
    define,
    treeshake,
    alwaysBundle = [],
    neverBundle = [],
    onlyBundle = false,
    platform = "node",
    dts = true,
    moduleSideEffects,
    copy = [],
    publint = isProduction,
    ...rest
  }: TsdownOptions = {},
): UserConfig => {
  const entry =
    typeof entryOptions === "string"
      ? { [entryOptions]: resolveEntry(entryOptions) }
      : Array.isArray(entryOptions)
        ? entryOptions.every((item) => typeof item === "string")
          ? Object.fromEntries(entryOptions.map((item) => [item, resolveEntry(item)]))
          : entryOptions.map((item) =>
              typeof item === "string" ? { [item]: resolveEntry(item) } : item,
            )
        : entryOptions;

  return defineConfig({
    clean: !isProduction,
    entry,
    format: "esm",
    outDir: "./dist",
    sourcemap: true,
    dts,
    minify: isProduction,
    target: ["node20.19", "chrome107", "edge107", "firefox104", "safari16"],
    platform,
    define,
    alias,
    treeshake: treeshake ?? {
      moduleSideEffects: moduleSideEffects ?? defaultModuleSideEffects,
    },
    deps: {
      alwaysBundle,
      neverBundle: [/^@internal\//, /^@temp\//, /\.s?css$/, ...neverBundle],
      onlyBundle,
    },
    fixedExtension: false,
    publint,
    copy: copy.map(([from, to = dirname(from)]) => ({
      from: `./src/${from}`,
      to: `./dist/${to}`,
    })),
    ...rest,
  });
};
