import { h } from "vue";

import type { FunctionalComponent } from "vue";

declare const ICON_PREFIX: string;

export interface FontIconProps {
  icon?: string;
  color?: string;
  size?: number;
}

const FontIcon: FunctionalComponent<FontIconProps> = ({
  icon = "",
  color,
  size,
}) =>
  icon
    ? h("span", {
        class: ["icon", `${ICON_PREFIX}${icon}`],
        ...(color || size
          ? {
              style: {
                ...(color ? { color } : {}),
                ...(size ? { "font-size": `${size}px` } : {}),
              },
            }
          : {}),
      })
    : null;

FontIcon.displayName = "FontIcon";

export default FontIcon;
