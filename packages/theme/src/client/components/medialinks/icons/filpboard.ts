import { IconBase } from "@mr-hope/vuepress-shared/lib/client";
import { h } from "vue";
import type { FunctionalComponent } from "vue";

export const FlipboardIcon: FunctionalComponent = () =>
  h(
    IconBase,
    { name: "flipboard" },
    {
      default: () => [
        h("circle", {
          cx: "512",
          cy: "512",
          r: "512",
          fill: "#E12828",
        }),
        h("path", {
          d: "M293.58 292.18h160.343v481.003H293.58V292.18z",
          fill: "#fff",
        }),
        h("path", {
          d: "M453.922 292.18h320.662v160.343H453.922V292.18z",
          fill: "#FCE9E9",
        }),
        h("path", {
          d: "M453.922 452.523h160.343v160.343H453.922V452.523z",
          fill: "#F6BEBE",
        }),
      ],
    }
  );

FlipboardIcon.displayName = "FlipboardIcon";
