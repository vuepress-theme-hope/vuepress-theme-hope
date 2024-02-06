import { isLinkExternal } from "@vuepress/helper/client";
import type { FunctionalComponent } from "vue";
import { h } from "vue";
import { RouteLink, withBase } from "vuepress/client";

import "../styles/vp-card.scss";

export interface CardProps {
  /**
   * Card title
   *
   * 卡片标题
   *
   */
  title: string;

  /**
   * Card description
   *
   * 卡片描述
   */
  desc?: string;

  /**
   * Card icon
   *
   * 卡片图标
   */
  logo?: string;

  /**
   * Card link
   *
   * 卡片链接
   */
  link?: string;

  /**
   * Card background
   *
   * 卡片背景
   */
  background?: string;

  /**
   * Card font color
   *
   * 卡片字体颜色
   */
  color?: string;
}

export const VPCard: FunctionalComponent<CardProps> = ({
  title,
  desc = "",
  logo,
  background,
  color,
  link,
}) => {
  const children = [
    logo
      ? h("img", {
          class: "vp-card-logo",
          src: withBase(logo),
          loading: "lazy",
          "no-view": "",
        })
      : null,
    h("div", { class: "vp-card-content" }, [
      h("div", { class: "vp-card-title", innerHTML: title }),
      h("hr"),
      h("div", { class: "vp-card-desc", innerHTML: desc }),
    ]),
  ];

  const style: Record<string, string> = {};

  if (background) style["background"] = background;
  if (color) style["color"] = color;

  return link
    ? isLinkExternal(link)
      ? h(
          "a",
          { class: "vp-card", href: link, target: "_blank", style },
          children,
        )
      : h(RouteLink, { to: link, class: "vp-card", style }, () => children)
    : h("div", { class: "vp-card", style }, children);
};

VPCard.displayName = "VPCard";
