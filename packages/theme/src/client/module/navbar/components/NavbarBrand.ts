import { useRouteLocale, useSiteLocaleData, withBase } from "@vuepress/client";
import { computed, defineComponent, h, VNode } from "vue";
import { RouterLink } from "vue-router";

import { useThemeLocaleData } from "@theme-hope/composables";

import "../styles/navbar-brand.scss";

export default defineComponent({
  name: "NavbarBrand",

  setup(_, { slots }) {
    const routeLocale = useRouteLocale();
    const siteLocale = useSiteLocaleData();
    const themeLocale = useThemeLocaleData();

    const siteBrandLink = computed(
      () => themeLocale.value.home || routeLocale.value
    );

    const siteBrandTitle = computed(() => siteLocale.value.title);

    const siteBrandLogo = computed(() =>
      themeLocale.value.logo ? withBase(themeLocale.value.logo) : null
    );

    const siteBrandDarkLogo = computed(() =>
      themeLocale.value.darkLogo ? withBase(themeLocale.value.darkLogo) : null
    );

    return (): VNode =>
      h(RouterLink, { to: siteBrandLink.value, class: "home-link" }, () => [
        siteBrandLogo.value
          ? h("img", {
              class: ["logo", { light: Boolean(siteBrandDarkLogo.value) }],
              src: siteBrandLogo.value,
              alt: siteBrandTitle.value,
            })
          : null,
        siteBrandDarkLogo.value
          ? h("img", {
              class: ["logo dark", { light: Boolean(siteBrandDarkLogo) }],
              src: siteBrandLogo.value,
              alt: siteBrandTitle.value,
            })
          : null,
        siteBrandTitle.value
          ? h(
              "span",
              { class: ["site-name", { "hide-in-mobile": siteBrandLogo }] },
              siteBrandTitle.value
            )
          : null,
        slots.default?.(),
      ]);
  },
});
