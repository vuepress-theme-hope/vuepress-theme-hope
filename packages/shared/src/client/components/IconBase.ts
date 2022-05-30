import { h } from "vue";

import type { FunctionalComponent } from "vue";

export interface IconBaseProps {
  name?: string;
  color?: string;
}

/**
 * Icon Base Component
 */
export const IconBase: FunctionalComponent<IconBaseProps> = (
  { name = "", color = "currentColor" },
  { slots }
) =>
  h(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      class: ["icon", `${name}-icon`],
      viewBox: "0 0 1024 1024",
      fill: color,
      "aria-label": `${name} icon`,
    },
    slots["default"]?.()
  );

IconBase.displayName = "IconBase";
