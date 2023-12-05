import type { FunctionalComponent } from "vue";
import { h } from "vue";
import { IconBase } from "vuepress-shared/client";

export const HeadingIcon: FunctionalComponent = () =>
  h(IconBase, { name: "heading" }, () =>
    h("path", {
      d: "M250.4 704.6H64V595.4h202.4l26.2-166.6H94V319.6h214.4L352 64h127.8l-43.6 255.4h211.2L691 64h126.2l-43.6 255.4H960v109.2H756.2l-24.6 166.6H930v109.2H717L672 960H545.8l43.6-255.4H376.6L333 960H206.8l43.6-255.4zm168.4-276L394 595.4h211.2l24.6-166.6h-211z",
    }),
  );

HeadingIcon.displayName = "HeadingIcon";

export const HeartIcon: FunctionalComponent = () =>
  h(IconBase, { name: "heart" }, () =>
    h("path", {
      d: "M1024 358.156C1024 195.698 892.3 64 729.844 64c-86.362 0-164.03 37.218-217.844 96.49C458.186 101.218 380.518 64 294.156 64 131.698 64 0 195.698 0 358.156 0 444.518 37.218 522.186 96.49 576H96l320 320c32 32 64 64 96 64s64-32 96-64l320-320h-.49c59.272-53.814 96.49-131.482 96.49-217.844zM841.468 481.232 517.49 805.49a2981.962 2981.962 0 0 1-5.49 5.48c-1.96-1.95-3.814-3.802-5.49-5.48L182.532 481.234C147.366 449.306 128 405.596 128 358.156 128 266.538 202.538 192 294.156 192c47.44 0 91.15 19.366 123.076 54.532L512 350.912l94.768-104.378C638.696 211.366 682.404 192 729.844 192 821.462 192 896 266.538 896 358.156c0 47.44-19.368 91.15-54.532 123.076z",
    }),
  );

HeartIcon.displayName = "HeartIcon";

export const HistoryIcon: FunctionalComponent = () =>
  h(IconBase, { name: "history" }, () =>
    h("path", {
      d: "M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512zm0-896a384 384 0 1 0 384 384 384 384 0 0 0-384-384zm192 448H512a64 64 0 0 1-64-64V320a64 64 0 0 1 128 0v128h128a64 64 0 0 1 0 128z",
    }),
  );

HistoryIcon.displayName = "HistoryIcon";

export const TitleIcon: FunctionalComponent = () =>
  h(IconBase, { name: "title" }, () =>
    h("path", {
      d: "M512 256c70.656 0 134.656 28.672 180.992 75.008A254.933 254.933 0 0 1 768 512c0 83.968-41.024 157.888-103.488 204.48C688.96 748.736 704 788.48 704 832c0 105.984-86.016 192-192 192-106.048 0-192-86.016-192-192h128a64 64 0 1 0 128 0 64 64 0 0 0-64-64 255.19 255.19 0 0 1-181.056-75.008A255.403 255.403 0 0 1 256 512c0-83.968 41.024-157.824 103.488-204.544C335.04 275.264 320 235.584 320 192A192 192 0 0 1 512 0c105.984 0 192 85.952 192 192H576a64.021 64.021 0 0 0-128 0c0 35.328 28.672 64 64 64zM384 512c0 70.656 57.344 128 128 128s128-57.344 128-128-57.344-128-128-128-128 57.344-128 128z",
    }),
  );

TitleIcon.displayName = "TitleIcon";

export const SearchIcon: FunctionalComponent = () =>
  h(IconBase, { name: "search" }, () =>
    h("path", {
      d: "M192 480a256 256 0 1 1 512 0 256 256 0 0 1-512 0m631.776 362.496-143.2-143.168A318.464 318.464 0 0 0 768 480c0-176.736-143.264-320-320-320S128 303.264 128 480s143.264 320 320 320a318.016 318.016 0 0 0 184.16-58.592l146.336 146.368c12.512 12.48 32.768 12.48 45.28 0 12.48-12.512 12.48-32.768 0-45.28",
    }),
  );

SearchIcon.displayName = "SearchIcon";

export const LoadingIcon: FunctionalComponent = () =>
  h(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "32",
      height: "32",
      preserveAspectRatio: "xMidYMid",
      viewBox: "0 0 100 100",
    },
    [
      h(
        "circle",
        { cx: "28", cy: "75", r: "11", fill: "currentColor" },
        h("animate", {
          attributeName: "fill-opacity",
          begin: "0s",
          dur: "1s",
          keyTimes: "0;0.2;1",
          repeatCount: "indefinite",
          values: "0;1;1",
        }),
      ),
      h(
        "path",
        {
          fill: "none",
          stroke: "#88baf0",
          "stroke-width": "10",
          d: "M28 47a28 28 0 0 1 28 28",
        },
        h("animate", {
          attributeName: "stroke-opacity",
          begin: "0.1s",
          dur: "1s",
          keyTimes: "0;0.2;1",
          repeatCount: "indefinite",
          values: "0;1;1",
        }),
      ),
      h(
        "path",
        {
          fill: "none",
          stroke: "#88baf0",
          "stroke-width": "10",
          d: "M28 25a50 50 0 0 1 50 50",
        },
        h("animate", {
          attributeName: "stroke-opacity",
          begin: "0.2s",
          dur: "1s",
          keyTimes: "0;0.2;1",
          repeatCount: "indefinite",
          values: "0;1;1",
        }),
      ),
    ],
  );

LoadingIcon.displayName = "LoadingIcon";
