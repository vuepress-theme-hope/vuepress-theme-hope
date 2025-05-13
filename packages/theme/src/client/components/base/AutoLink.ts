import type { RequiredSlot, Slot } from "@vuepress/helper/client";
import type { FunctionalComponent, VNode } from "vue";
import { h, resolveComponent } from "vue";
import { AutoLink as _AutoLink } from "vuepress/client";

import type { AutoLinkOptions } from "../../../shared/index.js";

export interface AutoLinkProps {
  /**
   * Autolink config
   */
  config: AutoLinkOptions;

  /**
   * Icon sizing
   *
   * @default "both"
   */
  iconSizing?: "height" | "width" | "both";
}

const AutoLink: FunctionalComponent<
  AutoLinkProps,
  ["focusout"],
  {
    before?: Slot;
    after?: Slot;
    default?: RequiredSlot;
  }
> = ({ config, iconSizing = "both" }, { emit, slots }) => {
  const { icon } = config;

  return h(
    _AutoLink,
    {
      config,
      onFocusout: () => {
        emit("focusout");
      },
    },
    {
      ...slots,
      before:
        slots.before ??
        (icon
          ? (): VNode =>
              h(resolveComponent("VPIcon"), {
                icon,
                sizing: iconSizing,
              })
          : null),
    },
  );
};

AutoLink.displayName = "AutoLink";

export default AutoLink;
