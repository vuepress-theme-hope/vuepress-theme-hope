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
  type?: string;
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
   * Badge color
   *
   * 徽章颜色
   */
  color?: string;
}

const Badge: FunctionalComponent<
  BadgeProps,
  Record<never, never>,
  { default?: () => VNode | VNode[] | undefined }
> = ({ type = "info", text = "", vertical, color }, { slots }) =>
  h(
    "span",
    {
      class: ["vp-badge", type, { diy: color }],
      style: {
        verticalAlign: vertical ?? false,
        backgroundColor: color ?? false,
      },
    },
    slots.default?.() || text,
  );

Badge.displayName = "Badge";

export default Badge;
