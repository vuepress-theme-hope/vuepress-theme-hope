import { withBase } from "@vuepress/client";
import { isLinkHttp } from "@vuepress/shared";
import type { FunctionalComponent } from "vue";
import { h, resolveComponent } from "vue";
import { isAbsoluteUrl } from "vuepress-shared/client";

export interface IconProps {
  icon?: string | undefined;
  color?: string | undefined;
  size?: string | number | undefined;
}

const HopeIcon: FunctionalComponent<IconProps> = (props) => {
  const { icon = "", color, size } = props;
  const style: Record<string, string> = {};

  if (color) style["color"] = color;
  if (size)
    style["height"] = Number.isNaN(Number(size)) ? <string>size : `${size}px`;

  return isLinkHttp(icon)
    ? h("img", { class: "icon", src: icon, "no-view": "", style })
    : isAbsoluteUrl(icon)
      ? h("img", {
          class: "icon",
          src: withBase(icon),
          "aria-hidden": "",
          "no-view": "",
          style,
        })
      : h(resolveComponent("FontIcon"), props);
};

HopeIcon.displayName = "HopeIcon";

export default HopeIcon;
