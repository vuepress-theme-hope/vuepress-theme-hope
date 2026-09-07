// oxlint-disable-next-line import/no-namespace
import type * as BabelCore from "@babel/core";

declare global {
  var Babel: typeof BabelCore | undefined;
}
