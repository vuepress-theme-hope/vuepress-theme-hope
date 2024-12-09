import type { FunctionalComponent, VNode } from "vue";
import { h } from "vue";

export interface IconBaseProps {
  name?: string;
  color?: string;
  ariaLabel?: string;
}

/**
 * Icon Base Component
 */

export const IconBase: FunctionalComponent<
  IconBaseProps,
  Record<never, never>,
  { default: () => VNode | VNode[] }
> = ({ name = "", color = "currentColor", ariaLabel }, { attrs, slots }) =>
  h(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      class: ["icon", `${name}-icon`],
      viewBox: "0 0 1024 1024",
      fill: color,
      "aria-label": ariaLabel ?? `${name} icon`,
      ...attrs,
    },
    slots.default(),
  );

IconBase.displayName = "IconBase";
