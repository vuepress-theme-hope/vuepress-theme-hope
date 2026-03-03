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
export interface TsdownOptions {
  /**
   * Platform
   *
   * 平台
   */
  platform?: UserConfig["platform"];

  /**
   * Whether to generate dts files
   *
   * 是否生成 dts 文件
   *
   * @default !browser
   */
  dts?: boolean;

  /**
   * Alias options
   *
   * 别名选项
   */
  alias?: Record<string, string>;

  /**
   * Whether to tree shake
   *
   * 是否进行树摇
   *
   * @default true
   */
  treeshake?: UserConfig["treeshake"];

  /**
   * Whitelist of dependencies allowed to be bundled
   *
   * 允许被打包的依赖白名单
   *
   * @default browser ? false : undefined
   */
  onlyAllowBundle?: (string | RegExp)[] | false;

  /**
   * Packages to always bundle
   *
   * 永远打包的包
   */
  alwaysBundle?: (string | RegExp)[];

  /**
   * Define options
   *
   * 定义选项
   */
  define?: Record<string, string>;

  /**
   * Assets to never bundle
   *
   * 永远不打包的资源
   *
   * @description `@temp/`, `@internal/` 以及 .css/.scss 文件默认不打包
   */
  neverBundle?: (string | RegExp)[];

  /**
   * Custom module side effects determination
   *
   * By default, only `.css` and `.scss` imports are considered to have side
   * effects. Use this to add additional side-effect patterns. This is part
   * of the `treeshake` option in tsdown/rolldown.
   *
   * 自定义模块副作用判定，默认仅保留 `.css` 和 `.scss` 导入的副作用。
   *
   * @param id - Module ID / 模块 ID
   * @param external - Whether the module is external / 模块是否为外部模块
   *
   * @default (id) => id.endsWith('.css') || id.endsWith('.scss')
   */
  moduleSideEffects?: (id: string, external: boolean) => boolean | undefined;

  /**
   * Additional files to copy to the output directory
   *
   * 要复制到输出目录的额外文件
   *
   * Each item is a tuple of [from, to], where 'from' is the source path relative to the project root, and 'to' is the destination path relative to the output directory.
   * 每个项都是一个 [from, to] 的元组，其中 'from' 是相对于项目根目录的源路径，'to' 是相对于输出目录的目标路径。
   *
   * Example:
   * 例如：
   * copy: [
   *   ['assets/', 'assets/'], // Copy src/assets/ folder to dist/assets/
   *   ['types/global.d.ts', 'types/global.d.ts'], // Copy src/types/global.d.ts to dist/types/global.d.ts
   * ]
   */
  copy?: [from: string, to?: string][];

  /**
   * Whether to mark the package as private
   *
   * 是否将包标记为私有
   */
  isPrivate?: boolean;
}

/**
 * Create tsdown configuration
 *
 * 创建 tsdown 配置
 *
 * @param fileOptions - File path or file info / 文件路径或文件信息
 * @param options - Tsdown options / Tsdown 选项
 * @returns Tsdown configuration / Tsdown 配置
 */
export const tsdownConfig = (
  fileOptions: string | string[],
  {
    alias,
    define,
    treeshake,
    alwaysBundle = [],
    neverBundle = [],
    onlyAllowBundle = false,
    platform = "node",
    dts = true,
    moduleSideEffects,
    copy = [],
    isPrivate = false,
  }: TsdownOptions = {},
): UserConfig => {
  const files = Array.isArray(fileOptions) ? fileOptions : [fileOptions];

  return defineConfig({
    clean: !isProduction,
    entry: Object.fromEntries(files.map((item) => [item, `./src/${item}.ts`])),
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
      alwaysBundle: alwaysBundle,
      neverBundle: [/^@internal\//, /^@temp\//, /\.s?css$/, ...neverBundle],
      onlyAllowBundle: onlyAllowBundle,
    },
    fixedExtension: false,
    publint: isProduction && !isPrivate,
    copy: copy.map(([from, to = dirname(from)]) => ({
      from: `./src/${from}`,
      to: `./dist/${to}`,
    })),
  });
};
