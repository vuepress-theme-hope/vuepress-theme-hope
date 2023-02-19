import { withBase } from "@vuepress/client";
import { isLinkHttp } from "@vuepress/shared";
import { type FunctionalComponent, h, resolveComponent } from "vue";
import { isAbsoluteUrl } from "vuepress-shared/client";

export interface IconProps {
  icon?: string | undefined;
  color?: string | undefined;
  size?: number | undefined;
}

const HopeIcon: FunctionalComponent<IconProps> = (props) => {
  const { icon = "" } = props;

  return isLinkHttp(icon)
    ? h("img", { class: "icon", src: icon, "no-view": "" })
    : isAbsoluteUrl(icon)
    ? h("img", { class: "icon", src: withBase(icon), "no-view": "" })
    : h(resolveComponent("FontIcon"), props);
};

HopeIcon.displayName = "HopeIcon";

export default HopeIcon;
