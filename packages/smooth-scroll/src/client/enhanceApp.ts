import type { EnhanceApp } from "@mr-hope/vuepress-types";
import type { Route } from "vue-router";

import "./styles/index.styl";

const getElementPosition = (el: Element): { x: number; y: number } => {
  const docEl = document.documentElement;
  const docRect = docEl.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left,
    y: elRect.top - docRect.top,
  };
};

const enhanceApp: EnhanceApp = ({ Vue, router }): void => {
  router.options.scrollBehavior = (
    to: Route,
    _from: Route,
    savedPosition: void | { x: number; y: number }
  ): void => {
    if (savedPosition) {
      window.scrollTo({
        top: savedPosition.y,
        behavior: "smooth",
      });
    } else if (to.hash) {
      if (!Vue.$vuepress.$get("disableScrollBehavior"))
        setTimeout(() => {
          const targetAnchor = decodeURI(to.hash.slice(1));
          const targetElement =
            document.getElementById(targetAnchor) ||
            document.querySelector(`[name='${targetAnchor}']`);

          if (targetElement) {
            window.scrollTo({
              top: getElementPosition(targetElement).y,
              behavior: "smooth",
            });
          }
        }, SMOOTH_SCROLL_DELAY);
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
};

export default enhanceApp;
