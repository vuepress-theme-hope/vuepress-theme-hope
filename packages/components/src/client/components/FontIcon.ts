import { h } from "vue";

import type { FunctionalComponent } from "vue";

declare const ICON_PREFIX: string;

export interface FontIconProps {
  icon?: string | undefined;
  color?: string | undefined;
  size?: number | undefined;
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

FontIcon.props = {
  icon: String,
  color: String,
  size: Number,
};

export default FontIcon;
