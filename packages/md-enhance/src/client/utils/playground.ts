import { deepAssign } from "vuepress-shared/lib/client";

import type { VuePlaygroundOptions } from "../../shared/index.js";

declare const VUE_PLAYGROUND_OPTIONS: VuePlaygroundOptions;

export const getVuePlaygroundSettings = (
  settings: string
): VuePlaygroundOptions =>
  deepAssign(
    {},
    VUE_PLAYGROUND_OPTIONS,
    <VuePlaygroundOptions>JSON.parse(decodeURIComponent(settings))
  );
