import { CAC } from "cac";
import { Application } from "express";
import * as WebpackDevServer from "webpack-dev-server";
import * as Config from "webpack-chain";
import { PluginConfig } from "./config";
import { Context } from "./context";
import { Markdown } from "./markdown";
import { Page, PageOptions } from "./page";
import { PluginAPI } from "./plugin-api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Plugin<Options = any> = PluginOptionAPI | PluginFunction<Options>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PluginFunction<Options = any> = (
  pluginOptions: Options,
  context: Context,
  pluginApi: PluginAPI
) => PluginOptionAPI;

export interface PluginGeneratedFile {
  name: string;
  content: string;
}

export type EnhanceAppFilesGeneratedFile = PluginGeneratedFile;

export type ClientDynamicModulesGeneratedFile = PluginGeneratedFile & {
  dirname?: string;
};

export type PluginGeneratedFileTypes<T extends PluginGeneratedFile> =
  | T
  | T[]
  | Promise<T>
  | Promise<T[]>;

export type MarkdownItChainConfig = Config;

export interface PluginOptionAPI {
  name?: string;
  plugins?: PluginConfig[];
  chainWebpack?: (config: Config, isServer: boolean) => void;
  define?: Record<string, unknown> | (() => Record<string, unknown>);
  alias?: Record<string, string>;
  beforeDevServer?: (app: Application, server: WebpackDevServer) => void;
  afterDevServer?: (app: Application, server: WebpackDevServer) => void;
  extendMarkdown?: (md: Markdown) => void;
  chainMarkdown?: (config: MarkdownItChainConfig) => void;
  enhanceAppFiles?:
    | string
    | string[]
    | (() =>
        | PluginGeneratedFileTypes<EnhanceAppFilesGeneratedFile>
        | string
        | string[]);
  clientDynamicModules?: () => PluginGeneratedFileTypes<
    ClientDynamicModulesGeneratedFile
  >;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extendPageData?: (page: Page & Record<string, any>) => void | Promise<void>;
  clientRootMixin?: string;
  additionalPages?:
    | Partial<PageOptions>[]
    | (() => Promise<Partial<PageOptions>[]>);
  globalUIComponents?: string | string[];
  extendCli?: (cli: CAC) => void;
  multiple?: boolean;
  /*
   * Life Cycle
   * https://vuepress.vuejs.org/plugin/life-cycle.html
   */
  ready?: () => void | Promise<void>;
  updated?: () => void | Promise<void>;
  generated?: (pagePaths: string[]) => void | Promise<void>;
}
