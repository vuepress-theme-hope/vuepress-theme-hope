import type { FunctionalComponent } from "vue";

export const RenderDefault: FunctionalComponent = (_props, { slots }) =>
  slots["default"]?.() || null;
