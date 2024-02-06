import type { FunctionalComponent, VNode } from "vue";

export const RenderDefault: FunctionalComponent<
  Record<never, never>,
  Record<never, never>,
  { default: () => VNode | VNode[] }
> = (_props, { slots }) => slots.default?.();
