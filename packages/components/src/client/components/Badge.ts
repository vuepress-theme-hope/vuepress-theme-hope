import { h } from "vue";

import type { FunctionalComponent } from "vue";

import "../styles/badge.scss";

export interface BadgeProps {
  type?: string;
  text?: string;
  vertical?: "top" | "middle" | "baseline" | "bottom";
  color?: string;
}

const Badge: FunctionalComponent<BadgeProps> = (
  { type = "info", text = "", vertical = "top", color },
  { slots }
) =>
  h(
    "span",
    {
      class: ["badge", type, { diy: color }],
      style: {
        verticalAlign: vertical,
        ...(color ? { backgroundColor: color } : {}),
      },
    },
    text || slots["default"]?.()
  );

Badge.displayName = "Badge";

export default Badge;
