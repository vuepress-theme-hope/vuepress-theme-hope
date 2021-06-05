import type { CreateAppFunction } from "vue";
import type { FunctionComponent, ReactElement } from "react";

export interface CodeType {
  html: [code: string, type: string] | [];
  js: [code: string, type: string] | [];
  css: [code: string, type: string] | [];
  isLegal: boolean;
}

export interface Code {
  html: string;
  js: string;
  css: string;
  jsLib: string[];
  cssLib: string[];
}

export interface NormalCode extends Code {
  script?: () => unknown;
}

export interface VueScript {
  (): unknown;
  template: string;
}

export interface VueCode extends Code {
  script?: VueScript;
}

export interface ReactCode extends Code {
  script?: FunctionComponent;
}

declare global {
  interface Window {
    Babel: {
      transform: (
        code: string,
        options: {
          presets?: string[];
        }
      ) => { code: string };
    };
    ReactDOM: {
      render: (reactElement: ReactElement, element: HTMLElement) => void;
    };
    Vue: {
      createApp: CreateAppFunction<HTMLElement>;
    };
  }
}
