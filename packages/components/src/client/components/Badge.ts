import type { FunctionalComponent, VNode } from "vue";
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
   * 徽章北境颜色
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
  { default?: () => VNode | VNode[] | undefined }
> = ({ type = "info", text = "", vertical, color, bgColor }, { slots }) =>
  h(
    "span",
    {
      class: ["vp-badge", type, { diy: color || bgColor }],
      style: {
        verticalAlign: vertical ?? false,
        backgroundColor: bgColor ?? false,
        color: color ?? false,
      },
    },
    slots.default?.() ?? text,
  );

Badge.displayName = "Badge";

export default Badge;
