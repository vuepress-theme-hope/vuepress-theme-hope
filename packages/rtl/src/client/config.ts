import { defineClientConfig, useRouteLocale } from "@vuepress/client";
import { onMounted, watch } from "vue";

declare const _RTL_LOCALES_: string[];
declare const _RTL_SELECTOR_: {
  [element: string]: {
    [attrs: string]: string;
  };
};

const getElement = (selector: string): HTMLElement | null =>
  selector === "html"
    ? document.documentElement
    : selector === "body"
    ? document.body
    : document.querySelector(selector);

export default defineClientConfig({
  setup() {
    const routeLocale = useRouteLocale();

    const toggleRTL = (routeLocale: string): void => {
      if (_RTL_LOCALES_.includes(routeLocale)) {
        Object.entries(_RTL_SELECTOR_).forEach(([selector, attrs]) => {
          const element = getElement(selector);

          if (element)
            Object.entries(attrs).forEach(([attr, value]) => {
              if (attr === "class") element.classList.add(value);
              else element.setAttribute(attr, value);
            });
        });
        document.documentElement.style.setProperty("direction", "rtl");
      } else {
        Object.entries(_RTL_SELECTOR_).forEach(([selector, attrs]) => {
          const element = getElement(selector);

          if (element)
            Object.entries(attrs).forEach(([attr, value]) => {
              if (attr === "class") element.classList.remove(value);
              else element.removeAttribute(attr);
            });
        });

        document.documentElement.style.removeProperty("direction");
      }
    };

    onMounted(() => {
      toggleRTL(routeLocale.value);
      watch(routeLocale, (value) => {
        toggleRTL(value);
      });
    });
  },
});
