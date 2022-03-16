import type { CodeDemoOptions } from "../../../shared";

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
  jsx?: boolean;
  getScript: () => string;
}
