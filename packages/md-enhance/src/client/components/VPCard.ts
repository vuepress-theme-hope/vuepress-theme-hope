import { type FunctionalComponent, h } from "vue";

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
}) =>
  h(
    "a",
    {
      class: "vp-card",
      href: link,
      target: "_blank",
      ...(color ? { style: { background: color } } : {}),
    },
    [
      h("img", { class: "vp-card-logo", src: logo }),
      h("div", { class: "vp-card-content" }, [
        h("div", { class: "vp-card-title", innerHTML: title }),
        h("hr"),
        h("div", { class: "vp-card-desc", innerHTML: desc }),
      ]),
    ]
  );

VPCard.displayName = "VPCard";

export default VPCard;
