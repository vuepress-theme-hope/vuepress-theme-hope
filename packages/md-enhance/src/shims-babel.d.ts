import type Babel from "@babel/core";

declare global {
  interface Window {
    Babel?: typeof Babel;
  }
}
