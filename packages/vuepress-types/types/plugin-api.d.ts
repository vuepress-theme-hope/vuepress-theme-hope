import { Plugin, PluginOptionAPI } from "./plugin";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface OptionItem<Value = any> {
  value: Value;
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Option<Value = any> {
  key: string;
  items: OptionItem<Value>[];
  readonly values: Value[];
  appliedItems: OptionItem<Value>[];
  readonly appliedValues: Value[];
  readonly entries: [string, Value][];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apply: (...args: any[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  syncApply: (...args: any[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pipeline: <T = void>(input: any) => T;
}

export interface AsyncOption extends Option {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apply: (...args: any[]) => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  asyncApply: (...args: any[]) => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parallelApply: (...args: any[]) => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pipeline: <T = Promise<void>>(input: any) => T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  applySyncOption: (name: string, ...args: any[]) => PluginAPI;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  applyAsyncOption: (name: string, ...args: any[]) => Promise<void>;
  getOption: (name: string) => Option;
}
