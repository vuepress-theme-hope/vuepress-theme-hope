import type BabelCore from "@babel/core";

declare global {
  var Babel: typeof BabelCore | undefined;
}
