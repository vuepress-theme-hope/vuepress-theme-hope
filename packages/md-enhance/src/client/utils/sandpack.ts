import type {
  SandpackFiles,
  SandpackOptions,
  SandpackSetup,
} from "sandpack-vue3";

export const getSandpackFiles = (files: string): SandpackFiles =>
  <SandpackFiles>JSON.parse(atob(decodeURIComponent(files)));

export const getSandpackOptions = (options: string): SandpackOptions =>
  <SandpackOptions>JSON.parse(decodeURIComponent(options));

export const getSandpackCustomSetup = (customSetup: string): SandpackSetup =>
  <SandpackSetup>JSON.parse(decodeURIComponent(customSetup));
