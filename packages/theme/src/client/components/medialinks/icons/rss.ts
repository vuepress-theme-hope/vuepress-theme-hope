import { IconBase } from "@mr-hope/vuepress-shared/lib/client";
import { h } from "vue";
import type { FunctionalComponent } from "vue";

export const RssIcon: FunctionalComponent = () =>
  h(
    IconBase,
    { name: "rss" },
    {
      default: () => [
        h("circle", {
          cx: "512",
          cy: "512",
          r: "512",
          fill: "#FD9B00",
        }),
        h("path", {
          d: "M687.981 740.39c0-225.92-183.617-409.777-409.21-409.777v-97.205c279.353 0 506.617 227.506 506.617 506.98H687.98zm-74.841 0h-97.538c0-63.567-24.688-123.245-69.43-167.993-44.762-44.856-104.24-69.556-167.54-69.556v-97.176c184.44 0 334.508 150.046 334.508 334.725zM346.038 605.166c37.35 0 67.514 30.357 67.514 67.39 0 37.146-30.163 67.177-67.514 67.177-37.219 0-67.458-30.03-67.458-67.176 0-37.034 30.24-67.391 67.458-67.391z",
          fill: "#fff",
        }),
      ],
    }
  );

RssIcon.displayName = "RssIcon";
