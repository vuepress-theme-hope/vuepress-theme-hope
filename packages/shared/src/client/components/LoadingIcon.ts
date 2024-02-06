import type { FunctionalComponent, VNode } from "vue";
import { h } from "vue";

export const LoadingIcon: FunctionalComponent<{
  size?: number;
  stroke?: number;
  wrapper?: boolean;
  height?: number;
}> = ({ size = 48, stroke = 4, wrapper = true, height = 2 * size }): VNode => {
  const icon = h(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      preserveAspectRatio: "xMidYMid",
      viewBox: "25 25 50 50",
    },
    [
      h("animateTransform", {
        attributeName: "transform",
        type: "rotate",
        dur: "2s",
        keyTimes: "0;1",
        repeatCount: "indefinite",
        values: "0;360",
      }),
      h(
        "circle",
        {
          cx: "50",
          cy: "50",
          r: "20",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": stroke,
          "stroke-linecap": "round",
        },
        [
          h("animate", {
            attributeName: "stroke-dasharray",
            dur: "1.5s",
            keyTimes: "0;0.5;1",
            repeatCount: "indefinite",
            values: "1,200;90,200;1,200",
          }),
          h("animate", {
            attributeName: "stroke-dashoffset",
            dur: "1.5s",
            keyTimes: "0;0.5;1",
            repeatCount: "indefinite",
            values: "0;-35px;-125px",
          }),
        ],
      ),
    ],
  );

  return wrapper
    ? h(
        "div",
        {
          class: "loading-icon-wrapper",
          style: `display:flex;align-items:center;justify-content:center;height:${height}px`,
        },
        icon,
      )
    : icon;
};

LoadingIcon.displayName = "LoadingIcon";
