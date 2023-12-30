import type {
  SandpackFiles,
  SandpackOptions,
  SandpackSetup,
} from "sandpack-vue3";
import { atou } from "vuepress-shared/client";

export const getSandpackFiles = (files: string): SandpackFiles =>
  <SandpackFiles>JSON.parse(atou(files));

export const getSandpackOptions = (options: string): SandpackOptions =>
  <SandpackOptions>JSON.parse(atou(options));

export const getSandpackCustomSetup = (customSetup: string): SandpackSetup =>
  <SandpackSetup>JSON.parse(atou(customSetup));
