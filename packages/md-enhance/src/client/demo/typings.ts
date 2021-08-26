import type { CodeDemoOptions } from "../../types";

export interface CodeType {
  html: [code: string, type: string] | [];
  js: [code: string, type: string] | [];
  css: [code: string, type: string] | [];
  isLegal: boolean;
}

export interface Code extends CodeDemoOptions {
  html: string;
  js: string;
  css: string;
  isLegal: boolean;
  getScript: () => string;
}
