<template>
  <header class="navbar">
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')" />

    <router-link :to="$localePath" class="home-link">
      <img
        v-if="$themeConfig.logo"
        class="logo"
        :class="{ light: Boolean($themeConfig.darkLogo) }"
        :src="$withBase($themeConfig.logo)"
        :alt="$siteTitle"
      />
      <img
        v-if="$themeConfig.darkLogo"
        class="logo dark"
        :src="$withBase($themeConfig.darkLogo)"
        :alt="$siteTitle"
      />
      <span
        v-if="$siteTitle"
        ref="siteName"
        :class="{ 'can-hide': $themeConfig.logo }"
        class="site-name"
      >{{ $siteTitle }}</span>
    </router-link>

    <div
      :style="linksWrapMaxWidth ? {
        'max-width': `${linksWrapMaxWidth}px`
      } : {}"
      class="links"
    >
      <ThemeColor />
      <AlgoliaSearchBox v-if="isAlgoliaSearch" :options="algolia" />
      <SearchBox v-else-if="$themeConfig.search !== false && $page.frontmatter.search !== false" />
      <NavLinks class="can-hide" />
    </div>
  </header>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import { AlgoliaOption } from "@mr-hope/vuepress-types";
import AlgoliaSearchBox from "@AlgoliaSearchBox";
import NavLinks from "@theme/components/NavLinks.vue";
import SearchBox from "@SearchBox";
import SidebarButton from "@theme/components/SidebarButton.vue";
import ThemeColor from "@ThemeColor";

const css = (el: Element, property: any) => {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const window = el.ownerDocument!.defaultView;

  // `null` means not to return pseudo styles
  return window!.getComputedStyle(el, null)[property];
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
  private linksWrapMaxWidth: number = 0;

  /** Algolia 配置 */
  private get algolia(): AlgoliaOption | false {
    return (
      this.$themeLocaleConfig.algolia || this.$themeConfig.algolia || false
    );
  }

  /** 是否使用 Algolia 搜索 */
  private get isAlgoliaSearch() {
    return this.algolia && this.algolia.apiKey && this.algolia.indexName;
  }

  private mounted() {
    // Refer to config.styl
    const MOBILE_DESKTOP_BREAKPOINT = 719;
    const NAVBAR_VERTICAL_PADDING =
      parseInt(css(this.$el, "paddingLeft")) +
      parseInt(css(this.$el, "paddingRight"));
    const handleLinksWrapWidth = () => {
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
    window.onorientationchange = () => handleLinksWrapWidth;
  }
}
</script>

<style lang="stylus">
.navbar
  position fixed
  z-index 20
  top 0
  left 0
  right 0
  height $navbarHeight
  padding $navbar-vertical-padding $navbar-horizontal-padding
  background-color var(--background-color)
  box-sizing border-box
  line-height $navbarHeight - 1.4rem
  box-shadow 0 2px 8px var(--card-shadow-color)

  a, span, img
    display inline-block

  .logo
    height $navbarHeight - 1.4rem
    min-width $navbarHeight - 1.4rem
    margin-right 0.8rem
    vertical-align top

    .theme-light &
      &.light
        display block

      &.dark
        display none

    .theme-dark &
      &.light
        display none

      &.dark
        display block

  .site-name
    font-size 1.3rem
    font-weight 600
    color var(--text-color)
    position relative

  .links
    padding-left 1.5rem
    box-sizing border-box
    background-color var(--background-color)
    white-space nowrap
    font-size 0.9rem
    position absolute
    right $navbar-horizontal-padding
    top $navbar-vertical-padding
    display flex

    .search-box
      flex 0 0 auto
      vertical-align top

@media (max-width: $MQMobile)
  .navbar
    padding-left 4rem

    .can-hide
      display none

    .links
      padding-left 1.5rem

    .site-name
      width calc(100vw - 9.4rem)
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
</style>
