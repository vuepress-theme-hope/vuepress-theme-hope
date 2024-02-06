import type { VNode } from "vue";
import { computed, defineComponent, h } from "vue";
import {
  RouteLink,
  useRouteLocale,
  useSiteLocaleData,
  withBase,
} from "vuepress/client";

import { useThemeLocaleData } from "@theme-hope/composables/index";

import "../styles/navbar-brand.scss";

export default defineComponent({
  name: "NavbarBrand",

  setup() {
    const routeLocale = useRouteLocale();
    const siteLocale = useSiteLocaleData();
    const themeLocale = useThemeLocaleData();

    const siteBrandLink = computed(
      () => themeLocale.value.home || routeLocale.value,
    );

    const siteTitle = computed(() => siteLocale.value.title);
    const siteBrandTitle = computed(
      () => themeLocale.value.navTitle ?? siteTitle.value,
    );

    const siteBrandLogo = computed(() =>
      themeLocale.value.logo ? withBase(themeLocale.value.logo) : null,
    );

    const siteBrandLogoDark = computed(() =>
      themeLocale.value.logoDark ? withBase(themeLocale.value.logoDark) : null,
    );

    return (): VNode =>
      h(RouteLink, { to: siteBrandLink.value, class: "vp-brand" }, () => [
        siteBrandLogo.value
          ? h("img", {
              class: [
                "vp-nav-logo",
                { light: Boolean(siteBrandLogoDark.value) },
              ],
              src: siteBrandLogo.value,
              alt: "",
            })
          : null,
        siteBrandLogoDark.value
          ? h("img", {
              class: ["vp-nav-logo dark"],
              src: siteBrandLogoDark.value,
              alt: "",
            })
          : null,
        siteBrandTitle.value
          ? h(
              "span",
              {
                class: [
                  "vp-site-name",
                  {
                    "hide-in-pad":
                      siteBrandLogo.value &&
                      themeLocale.value.hideSiteNameOnMobile !== false,
                  },
                ],
              },
              siteBrandTitle.value,
            )
          : null,
      ]);
  },
});
