import { type FunctionalComponent, type VNode, h } from "vue";

import "../styles/badge.scss";

export interface BadgeProps {
  type?: string;
  text?: string;
  vertical?: "top" | "middle" | "baseline" | "bottom";
  color?: string;
}

const Badge: FunctionalComponent<
  BadgeProps,
  Record<never, never>,
  { default?: () => VNode | VNode[] | undefined }
> = ({ type = "info", text = "", vertical = "top", color }, { slots }) =>
  h(
    "span",
    {
      class: ["vp-badge", type, { diy: color }],
      style: {
        verticalAlign: vertical,
        ...(color ? { backgroundColor: color } : {}),
      },
    },
    slots.default?.() || text
  );

Badge.displayName = "Badge";

export default Badge;
