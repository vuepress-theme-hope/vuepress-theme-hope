import type { FunctionComponent } from "react";
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
}

export interface NormalCode extends Code {
  run: () => unknown;
}

export interface VueScript {
  (): unknown;
  template: string;
}

export interface VueCode extends Code {
  getScript: () => VueScript;
}

export interface ReactCode extends Code {
  getComponent: () => FunctionComponent;
}
