import type { MermaidConfig } from "mermaid";
import type { App } from "vue";
import { inject } from "vue";

declare const __VUEPRESS_DEV__: boolean;

export interface MermaidThemeVariables {
  dark?: boolean;
  background?: string;

  primaryColor?: string;
  primaryBorderColor?: string;
  primaryTextColor?: string;

  secondaryColor?: string;
  secondaryBorderColor?: string;
  secondaryTextColor?: string;

  tertiaryColor?: string;
  tertiaryBorderColor?: string;
  tertiaryTextColor?: string;

  // note
  noteBkgColor?: string;
  noteTextColor?: string;
  noteBorderColor?: string;

  lineColor?: string;
  textColor?: string;

  mainBkg?: string;
  errorBkgColor?: string;
  errorTextColor?: string;

  // flowchart
  nodeBorder?: string;
  nodeTextColor?: string;

  // sequence
  signalTextColor?: string;

  // class
  classText?: string;

  // state
  labelColor?: string;

  // colors
  fillType0?: string;
  fillType1?: string;
  fillType2?: string;
  fillType3?: string;
  fillType4?: string;
  fillType5?: string;
  fillType6?: string;
  fillType7?: string;
}

export type MermaidOptions = Omit<
  MermaidConfig,
  "startOnLoad" | "themeVariables"
> & {
  themeVariables?:
    | MermaidThemeVariables
    | ((isDarkmode: boolean) => MermaidThemeVariables);
};

let mermaidOptions: MermaidConfig = {};

const mermaidSymbol = Symbol(__VUEPRESS_DEV__ ? "mermaid" : "");

export const defineMermaidConfig = (options: MermaidOptions): void => {
  mermaidOptions = options;
};

export const useMermaidOptions = (): MermaidOptions => inject(mermaidSymbol)!;

export const injectMermaidConfig = (app: App): void => {
  app.provide(mermaidSymbol, mermaidOptions);
};
