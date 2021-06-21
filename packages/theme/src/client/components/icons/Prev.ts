import { IconBase } from "@mr-hope/vuepress-shared/client";
import { h } from "vue";
import type { FunctionalComponent } from "vue";

export const PrevIcon: FunctionalComponent = () =>
  h(
    IconBase,
    { name: "prev" },
    {
      default: () =>
        h("path", {
          d: "M906.783 588.79c-.02 8.499-6.882 15.36-15.38 15.37l-443.7-.01 75.704 191.682c2.52 6.42.482 13.763-5.038 17.91-5.52 4.168-13.138 4.147-18.616-.092L123.228 524.175a15.362 15.362 0 0 1-6-12.165c0-4.782 2.222-9.277 6-12.185L499.753 210.35a15.388 15.388 0 0 1 9.38-3.195c3.236 0 6.502 1.034 9.236 3.103 5.52 4.147 7.578 11.49 5.038 17.91L447.683 419.84l443.72-.01c8.498.01 15.36 6.881 15.36 15.36l.02 153.6z",
          fill: "currentColor",
        }),
    }
  );

PrevIcon.displayName = "PrevIcon";
