/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Vue } from "vue-property-decorator";
import { AlgoliaOption } from "@mr-hope/vuepress-types";
import AlgoliaSearchBox from "@AlgoliaSearchBox";
import NavLinks from "@theme/components/NavLinks.vue";
import SearchBox from "@SearchBox";
import SidebarButton from "@theme/components/SidebarButton.vue";
import ThemeColor from "@ThemeColor";

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

@Component({
  components: {
    AlgoliaSearchBox,
    NavLinks,
    SearchBox,
    SidebarButton,
    ThemeColor,
  },
})
export default class Navbar extends Vue {
  private linksWrapMaxWidth = 0;

  /** Algolia 配置 */
  private get algolia(): AlgoliaOption | false {
    return (
      this.$themeLocaleConfig.algolia || this.$themeConfig.algolia || false
    );
  }

  /** 是否使用 Algolia 搜索 */
  private get isAlgoliaSearch(): boolean {
    return Boolean(
      this.algolia && this.algolia.apiKey && this.algolia.indexName
    );
  }

  private mounted(): void {
    // Refer to config.styl
    const MOBILE_DESKTOP_BREAKPOINT = 719;
    const NAVBAR_VERTICAL_PADDING =
      parseInt(css(this.$el, "paddingLeft")) +
      parseInt(css(this.$el, "paddingRight"));
    const handleLinksWrapWidth = (): void => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT)
        this.linksWrapMaxWidth = 0;
      else
        this.linksWrapMaxWidth =
          (this.$el as HTMLElement).offsetWidth -
          NAVBAR_VERTICAL_PADDING -
          ((this.$refs.siteName &&
            (this.$refs.siteName as HTMLElement).offsetWidth) ||
            0);
    };

    handleLinksWrapWidth();
    window.addEventListener("resize", handleLinksWrapWidth, false);
    window.onorientationchange = (): (() => void) => handleLinksWrapWidth;
  }
}
