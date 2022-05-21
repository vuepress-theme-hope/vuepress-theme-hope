import { h } from "vue";

import type { FunctionalComponent } from "vue";

declare const ICON_PREFIX: string;

export interface FontIconProps {
  icon?: string;
  color?: string;
}

const FontIcon: FunctionalComponent<FontIconProps> = ({ icon = "", color }) =>
  icon
    ? h("span", {
        class: ["icon", `${ICON_PREFIX}${icon}`],
        ...(color ? { style: { color } } : {}),
      })
    : null;

FontIcon.displayName = "FontIcon";

export default FontIcon;
