import { IconBase } from "@mr-hope/vuepress-shared/client";
import { h } from "vue";
import type { FunctionalComponent } from "vue";

export const EditIcon: FunctionalComponent = () =>
  h(
    IconBase,
    { name: "edit" },
    {
      default: () =>
        h("path", {
          d: "M117.953 696.992 64.306 959.696l265.931-49.336 450.204-452.505-212.284-213.376-450.204 452.513zm496.384-296.326L219.039 797.993l-46.108-46.34L568.233 354.33l46.104 46.335zm345.357-122.99-114.45 115.04-212.288-213.377 114.45-115.035 212.288 213.371zm0 0",
          fill: "currentColor",
        }),
    }
  );

EditIcon.displayName = "EditIcon";

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

export const NextIcon: FunctionalComponent = () =>
  h(
    IconBase,
    { name: "next" },
    {
      default: () =>
        h("path", {
          d: "M906.772 512c0 4.772-2.211 9.267-5.99 12.175L524.257 813.66a15.37 15.37 0 0 1-18.616.092 15.368 15.368 0 0 1-5.038-17.91l75.714-191.672h-443.73c-8.488 0-15.36-6.881-15.36-15.36v-153.6c0-8.489 6.872-15.36 15.36-15.36h443.73l-75.714-191.682a15.358 15.358 0 0 1 5.048-17.91c5.51-4.158 13.128-4.137 18.606.092l376.525 289.485a15.323 15.323 0 0 1 5.99 12.165z",
          fill: "currentColor",
        }),
    }
  );

NextIcon.displayName = "NextIcon";
