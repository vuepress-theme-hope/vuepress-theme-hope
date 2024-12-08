import type { KotlinPlaygroundOptions } from "../typings/index.js";

const DEFAULT_KOTLIN_PLAYGROUND_OPTIONS: KotlinPlaygroundOptions = {};

let kotlinPlaygroundOptions: KotlinPlaygroundOptions =
  DEFAULT_KOTLIN_PLAYGROUND_OPTIONS;

export const defineKotlinPlaygroundConfig = (
  options: KotlinPlaygroundOptions,
): void => {
  kotlinPlaygroundOptions = options;
};

export const useKotlinPlaygroundConfig = (): KotlinPlaygroundOptions =>
  kotlinPlaygroundOptions;
