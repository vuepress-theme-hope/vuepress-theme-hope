import { type FunctionalComponent, type VNode, h } from "vue";

const LoadingIcon: FunctionalComponent = (): VNode =>
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
        })
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
        })
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
        })
      ),
    ]
  );

LoadingIcon.displayName = "LoadingIcon";

export const SearchLoading: FunctionalComponent<{ hint: string }> = ({
  hint,
}) => h("div", { class: "search-pro-result loading" }, [h(LoadingIcon), hint]);

SearchLoading.displayName = "SearchLoading";
