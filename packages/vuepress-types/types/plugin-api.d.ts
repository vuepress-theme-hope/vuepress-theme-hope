/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Plugin, PluginOptionAPI } from "./plugin";

export interface OptionItem<Value = any> {
  value: Value;
  name: string;
}

export interface Option<Value = any> {
  key: string;
  items: OptionItem<Value>[];
  readonly values: Value[];
  appliedItems: OptionItem<Value>[];
  readonly appliedValues: Value[];
  readonly entries: [string, Value][];
  apply: (...args: any[]) => void;
  syncApply: (...args: any[]) => void;
  pipeline: <T = void>(input: any) => T;
}

export interface AsyncOption extends Option {
  apply: (...args: any[]) => Promise<void>;
  asyncApply: (...args: any[]) => Promise<void>;
  parallelApply: (...args: any[]) => Promise<void>;
  pipeline: <T = Promise<void>>(input: any) => T;
}

export interface NormalizedPlugin<PluginOptions = any> extends PluginOptionAPI {
  name: string;
  shortcut: string | null;
  enabled: boolean;
  $$options: PluginOptions;
  $$normalized: true;
}

export interface PluginAPI {
  options: Record<string, Option | AsyncOption>;
  readonly enabledPlugins: (NormalizedPlugin & { enabled: true })[];
  readonly disabledPlugins: (NormalizedPlugin & { enabled: false })[];
  initialize: () => void;
  use: <PluginOptions>(
    pluginRaw: Plugin<PluginOptions>,
    pluginOptions: PluginOptions
  ) => PluginAPI;
  normalizePlugin: <PluginOptions>(
    type: "plugin" | "theme",
    pluginRaw: Plugin<PluginOptions>,
    pluginOptions: PluginOptions
  ) => NormalizedPlugin<PluginOptions>;
  useByPluginsConfig: (pluginConfig: PluginOptionAPI) => PluginAPI;
  initializeOptions: () => void;
  registerOption: (key: string, value: Option, pluginName: string) => PluginAPI;
  applyPlugin: (plugin: NormalizedPlugin) => void;
  applySyncOption: (name: string, ...args: any[]) => PluginAPI;
  applyAsyncOption: (name: string, ...args: any[]) => Promise<void>;
  getOption: (name: string) => Option;
}
