import Vue from "vue";
import AlgoliaSearchBox from "@AlgoliaSearchBox";
import LanguageDropdown from "@theme/components/Navbar/LanguageDropdown";
import NavLinks from "@theme/components/Navbar/NavLinks.vue";
import RepoLink from "@theme/components/Navbar/RepoLink.vue";
import SearchBox from "@SearchBox";
import SidebarButton from "@theme/components/Navbar/SidebarButton.vue";
import ThemeColor from "@ThemeColor";

import type { AlgoliaOption } from "@mr-hope/vuepress-types";

let handler: () => void;

const css = (
  el: Element,
  property: keyof Omit<
    CSSStyleDeclaration,
    | "getPropertyPriority"
    | "getPropertyValue"
    | "item"
    | "removeProperty"
    | "setProperty"
    | number
  >
): string => {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const window = el.ownerDocument.defaultView;

  // `null` means not to return pseudo styles
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return window!.getComputedStyle(el, null)[property] as string;
};

export default Vue.extend({
  name: "Navbar",

  components: {
    AlgoliaSearchBox,
    LanguageDropdown,
    NavLinks,
    RepoLink,
    SearchBox,
    SidebarButton,
    ThemeColor,
  },

  data: () => ({
    linksWrapMaxWidth: 0,
    isMobile: false,
  }),

  computed: {
    siteBrandTitle(): string {
      return this.$site.title;
    },

    canHideSiteBrandTitle(): boolean {
      return (
        Boolean(this.siteBrandTitle) &&
        this.$themeConfig.hideSiteTitleonMobile !== false
      );
    },

    siteBrandLogo(): string {
      const { logo } = this.$themeConfig;

      return logo ? this.$withBase(logo) : "";
    },

    siteBrandDarkLogo(): string {
      const { darkLogo } = this.$themeConfig;

      return darkLogo ? this.$withBase(darkLogo) : "";
    },

    algoliaConfig(): AlgoliaOption | false {
      return (
        this.$themeLocaleConfig.algolia || this.$themeConfig.algolia || false
      );
    },

    isAlgoliaSearch(): boolean {
      return Boolean(
        this.algoliaConfig &&
          this.algoliaConfig.apiKey &&
          this.algoliaConfig.indexName
      );
    },

    canHide(): boolean {
      const autoHide = this.$themeConfig.navAutoHide;

      return autoHide !== "none" && (autoHide === "always" || this.isMobile);
    },
  },

  mounted(): void {
    // Refer to config.styl
    const MOBILE_DESKTOP_BREAKPOINT = 719;
    const NAVBAR_HORIZONTAL_PADDING =
      parseInt(css(this.$el, "paddingLeft")) +
      parseInt(css(this.$el, "paddingRight"));

    handler = (): void => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.isMobile = true;
        this.linksWrapMaxWidth = 0;
      } else {
        this.isMobile = false;
        this.linksWrapMaxWidth =
          (this.$el as HTMLElement).offsetWidth -
          NAVBAR_HORIZONTAL_PADDING -
          ((this.$refs.siteInfo &&
            (this.$refs.siteInfo as Vue).$el &&
            ((this.$refs.siteInfo as Vue).$el as HTMLElement).offsetWidth) ||
            0);
      }
    };

    handler();
    window.addEventListener("resize", handler);
    window.addEventListener("orientationchange", handler);
  },

  // eslint-disable-next-line vue/no-deprecated-destroyed-lifecycle
  beforeDestroy() {
    window.removeEventListener("resize", handler);
    window.removeEventListener("orientationchange", handler);
  },
});
