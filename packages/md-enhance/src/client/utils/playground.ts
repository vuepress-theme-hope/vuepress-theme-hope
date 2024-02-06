import type { VuePlaygroundOptions } from "../typings/index.js";

export const getVuePlaygroundSettings = (
  settings: string,
): VuePlaygroundOptions =>
  <VuePlaygroundOptions>JSON.parse(decodeURIComponent(settings));
