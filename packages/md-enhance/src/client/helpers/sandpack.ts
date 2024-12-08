import type { SandpackConfig } from "../typings/index.js";

const DEFAULT_SANDPACK_CONFIG: SandpackConfig = {
  template: "vue",
};

let sandpackConfig: SandpackConfig = DEFAULT_SANDPACK_CONFIG;

export const defineSandpackConfig = (config: SandpackConfig): void => {
  sandpackConfig = config;
};

export const useSandpackConfig = (): SandpackConfig => sandpackConfig;
