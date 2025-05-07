import type { FunctionalComponent } from "vue";
import { h } from "vue";
import { IconBase } from "vuepress-shared/client";

import "../../styles/home/hero-slide-down-button.scss";

const SlideDownIcon: FunctionalComponent = () =>
  h(IconBase, { name: "slide-down" }, () =>
    h("path", {
      d: "M108.775 312.23c13.553 0 27.106 3.734 39.153 11.806l375.205 250.338 363.641-252.808c32.587-21.624 76.499-12.83 98.123 19.757 21.685 32.467 12.95 76.56-19.576 98.184l-402.854 278.89c-23.733 15.901-54.694 15.962-78.547.12L69.501 442.097c-32.647-21.685-41.441-65.777-19.817-98.304 13.734-20.54 36.201-31.563 59.09-31.563Z",
    }),
  );

SlideDownIcon.displayName = "SlideDownIcon";

const HeroSlideDownButton: FunctionalComponent<
  Record<never, never>,
  { click: () => void }
> = (_props, { emit }) =>
  h(
    "button",
    {
      type: "button",
      class: "vp-hero-slide-down-button",
      onClick: () => emit("click"),
    },
    [h(SlideDownIcon), h(SlideDownIcon)],
  );

HeroSlideDownButton.displayName = "HeroSlideDownButton";

export default HeroSlideDownButton;
