import type { MermaidOptions } from "../typings/index.js";

let mermaidOptions: MermaidOptions = {};

export const defineMermaidConfig = (options: MermaidOptions): void => {
  mermaidOptions = options;
};

export const useMermaidOptions = (): MermaidOptions => mermaidOptions;
