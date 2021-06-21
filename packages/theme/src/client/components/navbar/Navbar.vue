<template>
  <header ref="navbar" class="navbar" :class="{ 'auto-hide': autoHide }">
    <ToggleSidebarButton @toggle="$emit('toggle-sidebar')" />

    <RouterLink ref="siteBrand" :to="siteBrandLink" class="home-link">
      <img
        v-if="siteBrandLogo"
        class="logo"
        :class="{ light: Boolean(siteBrandDarkLogo) }"
        :src="withBase(siteBrandLogo)"
        :alt="siteBrandTitle"
      />
      <img
        v-if="siteBrandDarkLogo"
        class="logo dark"
        :src="withBase(siteBrandDarkLogo)"
        :alt="siteBrandTitle"
      />
      <span
        v-if="siteBrandTitle"
        class="site-name"
        :class="{ 'hide-in-mobile': siteBrandLogo }"
      >
        {{ siteBrandTitle }}
      </span>
    </RouterLink>

    <div class="navbar-links-wrapper" :style="linksWrapperStyle">
      <slot name="before" />

      <NavbarLinks />

      <slot name="center" />

      <ToggleDarkModeButton v-if="enableDarkMode" />

      <NavbarSearch />
      <slot name="after" />
    </div>
  </header>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue";
import { useRouteLocale, useSiteLocaleData, withBase } from "@vuepress/client";
import { useThemeLocaleData } from "../../composables";
import NavbarLinks from "./NavbarLinks";
import ToggleDarkModeButton from "./ToggleDarkModeButton.vue";
import ToggleSidebarButton from "./ToggleSidebarButton";

import "./styles/index.scss";

const getCssValue = (
  el: Element | null,
  property: keyof Omit<
    CSSStyleDeclaration,
    | "getPropertyPriority"
    | "getPropertyValue"
    | "item"
    | "removeProperty"
    | "setProperty"
    | number
  >
): number => {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const value = el?.ownerDocument.defaultView?.getComputedStyle(el, null)[
    property
  ] as string;

  const num = Number.parseInt(value, 10);
  return Number.isNaN(num) ? 0 : num;
};

export default defineComponent({
  name: "Navbar",

  components: {
    NavbarLinks,
    ToggleDarkModeButton,
    ToggleSidebarButton,
  },

  emits: ["toggle-sidebar"],

  setup() {
    const routeLocale = useRouteLocale();
    const siteLocale = useSiteLocaleData();
    const themeLocale = useThemeLocaleData();

    const isMobile = ref(false);

    const navbar = ref<HTMLElement | null>(null);
    const siteBrand = ref<HTMLElement | null>(null);

    const siteBrandLink = computed(
      () => themeLocale.value.home || routeLocale.value
    );
    const siteBrandLogo = computed(() =>
      themeLocale.value.logo ? withBase(themeLocale.value.logo) : null
    );
    const siteBrandDarkLogo = computed(() =>
      themeLocale.value.darkLogo ? withBase(themeLocale.value.darkLogo) : null
    );
    const siteBrandTitle = computed(() => siteLocale.value.title);

    const linksWrapperMaxWidth = ref(0);
    const linksWrapperStyle = computed(() => {
      if (!linksWrapperMaxWidth.value) return {};

      return {
        "max-width": `${linksWrapperMaxWidth.value}px`,
      };
    });

    const autoHide = computed(() => {
      const autoHide = themeLocale.value.navAutoHide;

      return autoHide !== "none" && (autoHide === "always" || isMobile.value);
    });
    const enableDarkMode = computed(() => themeLocale.value.darkMode);

    let handleLinksWrapWidth: () => void;

    // avoid overlapping of long title and long navbar links
    onMounted(() => {
      // TODO: migrate to css var
      // refer to _variables.scss
      const MOBILE_DESKTOP_BREAKPOINT = 719;
      const navbarHorizontalPadding =
        getCssValue(navbar.value, "paddingLeft") +
        getCssValue(navbar.value, "paddingRight");

      handleLinksWrapWidth = (): void => {
        if (window.innerWidth < MOBILE_DESKTOP_BREAKPOINT) {
          isMobile.value = true;
          linksWrapperMaxWidth.value = 0;
        } else {
          isMobile.value = false;
          linksWrapperMaxWidth.value =
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            navbar.value!.offsetWidth -
            navbarHorizontalPadding -
            (siteBrand.value?.offsetWidth || 0);
        }
      };

      handleLinksWrapWidth();
      window.addEventListener("resize", handleLinksWrapWidth, false);
      window.addEventListener("orientationchange", handleLinksWrapWidth, false);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", handleLinksWrapWidth, false);
      window.removeEventListener(
        "orientationchange",
        handleLinksWrapWidth,
        false
      );
    });

    return {
      navbar,
      autoHide,
      enableDarkMode,

      linksWrapperStyle,

      siteBrand,
      siteBrandLink,
      siteBrandLogo,
      siteBrandDarkLogo,
      siteBrandTitle,

      withBase,
    };
  },
});
</script>
