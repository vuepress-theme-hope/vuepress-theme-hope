import { decodeData } from "@vuepress/helper/client";
import type {
  SandpackFiles,
  SandpackOptions,
  SandpackSetup,
} from "sandpack-vue3";

export const getSandpackFiles = (files: string): SandpackFiles =>
  <SandpackFiles>JSON.parse(decodeData(files));

export const getSandpackOptions = (options: string): SandpackOptions =>
  <SandpackOptions>JSON.parse(decodeData(options));

export const getSandpackCustomSetup = (customSetup: string): SandpackSetup =>
  <SandpackSetup>JSON.parse(decodeData(customSetup));
