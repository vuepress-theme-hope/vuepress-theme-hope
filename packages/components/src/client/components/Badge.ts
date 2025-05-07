import type { Slot } from "@vuepress/helper/client";
import type { FunctionalComponent } from "vue";
import { h } from "vue";

import "../styles/badge.scss";

export interface BadgeProps {
  /**
   * Badge type
   *
   * 徽章类型
   *
   * @default "info"
   */
  type?: "tip" | "warning" | "danger" | "info" | "important" | "note";
  /**
   * Badge text
   *
   * 徽章文字
   *
   * @default ""
   */
  text?: string;

  /**
   * Badge vertical align
   *
   * 徽章垂直对齐方式
   *
   * @default "top"
   */
  vertical?: "top" | "middle" | "baseline" | "bottom";

  /**
   * Badge background color
   *
   * 徽章背景颜色
   */
  bgColor?: string;

  /**
   * Badge text color
   *
   * 徽章字体颜色
   */
  color?: string;
}

const Badge: FunctionalComponent<
  BadgeProps,
  Record<never, never>,
  { default?: Slot }
> = ({ type = "info", text = "", vertical, color, bgColor }, { slots }) =>
  h(
    "span",
    {
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      class: ["vp-badge", type, { diy: Boolean(color || bgColor) }],
      style: {
        backgroundColor: bgColor ?? false,
        color: color ?? false,
        verticalAlign: vertical ?? false,
      },
    },
    slots.default?.() ?? text,
  );

Badge.displayName = "Badge";

export default Badge;
