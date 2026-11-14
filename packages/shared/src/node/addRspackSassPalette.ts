import { getBundlerName } from "@vuepress/helper";
import type { App } from "vuepress/core";

interface SassLoaderAdditionalDataContext {
  resourcePath: string;
  rootContext: string;
  [key: string]: unknown;
}

interface SassOptionsObject {
  silenceDeprecations?: string[];
  [key: string]: unknown;
}

interface RspackSassLoaderOptions {
  additionalData?:
    | string
    | ((content: string, context: SassLoaderAdditionalDataContext) => string | Promise<string>);
  sassOptions?: SassOptionsObject | ((loaderContext: unknown) => SassOptionsObject);
}

interface RspackBundlerOptions {
  // The theme and its plugins only ship SCSS, so indented Sass (`sass`) is not handled.
  scss?: RspackSassLoaderOptions;
}

// Matches the id used by useSassPalettePlugin() in the theme and its plugins.
const SASS_PALETTE_ID = "hope";
const CONFIG_MODULE = `${SASS_PALETTE_ID}-config`;
const PALETTE_MODULE = `${SASS_PALETTE_ID}-palette`;

const createUseRegExp = (module: string): RegExp =>
  new RegExp(`@use\\s+(["'])@sass-palette/${module}\\1;`, "u");

const mergeSassOptions = (sassOptions: SassOptionsObject): SassOptionsObject => ({
  ...sassOptions,
  silenceDeprecations: [...new Set(["import", ...(sassOptions.silenceDeprecations ?? [])])],
});

/**
 * Add sass palette support for rspack
 *
 * 为 rspack 添加 sass 调色板支持
 *
 * The sass-palette plugin only injects palette modules for vite and webpack. This helper injects
 * them into the sass-loader options of rspack.
 *
 * Sass-palette 插件仅会为 vite 和 webpack 注入调色板模块，此辅助函数会将它们注入到 rspack 的 sass-loader 选项中。
 *
 * @param bundlerOptions - Rspack bundler options / Rspack 打包器选项
 * @param app - VuePress app / VuePress 应用
 */
export const addRspackSassPalette = (bundlerOptions: unknown, app: App): void => {
  if (getBundlerName(app) !== "rspack") return;

  const options = bundlerOptions as RspackBundlerOptions;
  const configUseRegExp = createUseRegExp(CONFIG_MODULE);
  const paletteUseRegExp = createUseRegExp(PALETTE_MODULE);
  options.scss ??= {};
  const { additionalData, sassOptions } = options.scss;

  options.scss.additionalData = async (content, context): Promise<string> => {
    let result =
      typeof additionalData === "function"
        ? await additionalData(content, context)
        : typeof additionalData === "string"
          ? `${additionalData}${content}`
          : content;

    if (result.includes(CONFIG_MODULE) && !configUseRegExp.test(result))
      result = `@use "@sass-palette/${CONFIG_MODULE}";\n${result}`;

    if (result.includes(PALETTE_MODULE) && !paletteUseRegExp.test(result))
      result = `@use "@sass-palette/${PALETTE_MODULE}";\n${result}`;

    return result;
  };

  options.scss.sassOptions =
    typeof sassOptions === "function"
      ? (loaderContext): SassOptionsObject => mergeSassOptions(sassOptions(loaderContext))
      : mergeSassOptions(sassOptions ?? {});
};
