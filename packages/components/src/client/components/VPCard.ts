import { withBase } from "@vuepress/client";
import { isLinkExternal } from "@vuepress/shared";
import type { FunctionalComponent } from "vue";
import { h } from "vue";
import { VPLink } from "vuepress-shared/client";

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
   * Card color
   *
   * 卡片链颜色
   */
  color?: string;
}

const VPCard: FunctionalComponent<CardProps> = ({
  title,
  desc = "",
  logo = "",
  color = "",
  link = "",
}) => {
  const children = [
    h("img", { class: "vp-card-logo", src: withBase(logo) }),
    h("div", { class: "vp-card-content" }, [
      h("div", { class: "vp-card-title", innerHTML: title }),
      h("hr"),
      h("div", { class: "vp-card-desc", innerHTML: desc }),
    ]),
  ];

  const props: Record<string, unknown> = { class: "vp-card" };

  if (color) props["style"] = { background: color };

  return isLinkExternal(link)
    ? h("a", { href: link, target: "_blank", ...props }, children)
    : h(VPLink, { to: link, ...props }, () => children);
};

VPCard.displayName = "VPCard";

export default VPCard;
