import { onMounted, watch } from "vue";
import type { ClientConfig } from "vuepress/client";
import { defineClientConfig, useRouteLocale } from "vuepress/client";
import { entries } from "vuepress-shared/client";

declare const _RTL_LOCALES_: string[];
declare const _RTL_SELECTOR_: {
  [element: string]: {
    [attr: string]: string;
  };
};

const getElement = (selector: string): HTMLElement | null =>
  selector === "html"
    ? document.documentElement
    : selector === "body"
      ? document.body
      : document.querySelector(selector);

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
export default <ClientConfig>defineClientConfig({
  setup() {
    const routeLocale = useRouteLocale();

    const toggleRTL = (routeLocale: string): void => {
      if (_RTL_LOCALES_.includes(routeLocale)) {
        entries(_RTL_SELECTOR_).forEach(([selector, attrs = {}]) => {
          const element = getElement(selector);

          if (element)
            entries(attrs).forEach(([attr, value]) => {
              if (attr === "class") element.classList.add(value);
              else element.setAttribute(attr, value);
            });
        });
        document.documentElement.style.setProperty("direction", "rtl");
      } else {
        entries(_RTL_SELECTOR_).forEach(([selector, attrs = {}]) => {
          const element = getElement(selector);

          if (element)
            entries(attrs).forEach(([attr, value]) => {
              if (attr === "class") element.classList.remove(value);
              else element.removeAttribute(attr);
            });
        });

        document.documentElement.style.removeProperty("direction");
      }
    };

    onMounted(() => {
      watch(routeLocale, toggleRTL, { immediate: true });
    });
  },
});
