import { isLinkAbsolute, isLinkHttp } from "@vuepress/helper/client";
import type { FunctionalComponent } from "vue";
import { h, resolveComponent } from "vue";
import { withBase } from "vuepress/client";

export interface IconProps {
  icon?: string | undefined;
  color?: string | undefined;
  size?: string | number | undefined;
}

const HopeIcon: FunctionalComponent<IconProps> = (props) => {
  const { icon = "", color, size } = props;
  const style = color || size ? <Record<string, string>>{} : null;

  if (color) style!["color"] = color;
  if (size)
    style!["height"] = Number.isNaN(Number(size)) ? <string>size : `${size}px`;

  return isLinkHttp(icon)
    ? h("img", {
        class: "icon",
        src: icon,
        alt: "",
        "no-view": "",
        style,
      })
    : isLinkAbsolute(icon)
      ? h("img", {
          class: "icon",
          src: withBase(icon),
          alt: "",
          "aria-hidden": "",
          "no-view": "",
          style,
        })
      : h(resolveComponent("FontIcon"), props);
};

HopeIcon.displayName = "HopeIcon";

export default HopeIcon;
