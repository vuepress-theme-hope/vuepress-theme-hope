import { isLinkExternal } from "@vuepress/helper/client";
import type { FunctionalComponent } from "vue";
import { h } from "vue";
import { RouteLink, withBase } from "vuepress/client";

import "../styles/vp-banner.scss";

export interface BannerAction {
  text: string;
  link: string;
  /**
   * @default "primary"
   */
  type?: "primary" | "default";
}

export interface BannerProps {
  /**
   * Banner title
   *
   * 横幅标题
   */
  title: string;

  /**
   * Banner content
   *
   * 横幅内容
   */
  content?: string;

  /**
   * Banner icon
   *
   * 横幅图标
   */
  logo?: string;

  /**
   * Banner background
   *
   * 横幅背景
   */
  background?: string;

  /**
   * Banner font color
   *
   * 横幅字体颜色
   */
  color?: string;

  /**
   * Banner action
   *
   * 横幅操作
   */
  actions?: BannerAction[];
}

const VPBanner: FunctionalComponent<BannerProps> = ({
  title,
  content = "",
  logo = "",
  background = "",
  color = "",
  actions = [],
}) => {
  const style: Record<string, string> = {};

  if (background) style["background"] = background;
  if (color) style["color"] = color;

  return h("div", { class: "vp-banner", style }, [
    logo
      ? h("img", {
          class: "vp-banner-logo",
          src: withBase(logo),
          loading: "lazy",
          "no-view": "",
        })
      : null,
    h("div", { class: "vp-banner-body" }, [
      h("div", { class: "vp-banner-title", innerHTML: title }),
      h("p", { class: "vp-banner-content", innerHTML: content }),
      h("div", { class: "vp-banner-actions" }, [
        ...actions.map(({ link, text, type = "primary" }) =>
          isLinkExternal(link)
            ? h(
                "a",
                {
                  class: ["vp-banner-action", type],
                  href: link,
                  target: "_blank",
                },
                text,
              )
            : h(
                RouteLink,
                {
                  class: ["vp-banner-action", type],
                  to: link,
                },
                () => text,
              ),
        ),
      ]),
    ]),
  ]);
};

VPBanner.displayName = "VPBanner";

export default VPBanner;
