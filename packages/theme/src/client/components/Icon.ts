import { withBase } from "@vuepress/client";
import { isLinkHttp } from "@vuepress/shared";
import { h, resolveComponent } from "vue";
import { isAbsoluteUrl } from "vuepress-shared/client";

import type { FunctionalComponent } from "vue";

export interface IconProps {
  icon?: string | undefined;
  color?: string | undefined;
  size?: number | undefined;
}

const Icon: FunctionalComponent<IconProps> = (props) => {
  const { icon = "" } = props;

  return isLinkHttp(icon)
    ? h("img", { class: "icon", src: icon })
    : isAbsoluteUrl(icon)
    ? h("img", { class: "icon", src: withBase(icon) })
    : h(resolveComponent("FontIcon"), props);
};

Icon.displayName = "Icon";

export default Icon;
