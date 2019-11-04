<!--
 * @Author: Mr.Hope
 * @Date: 2019-10-07 00:29:40
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-20 13:17:01
 * @Description: 导航栏
 *
 * 添加全屏按钮，添加导航栏阴影
-->
<template>
  <header class="navbar">
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')" />

    <router-link :to="$localePath" class="home-link">
      <img
        :alt="$siteTitle"
        :src="$withBase($themeConfig.logo)"
        class="logo"
        v-if="$themeConfig.logo"
      />
      <span
        :class="{ 'can-hide': $themeConfig.logo }"
        class="site-name"
        ref="siteName"
        v-if="$siteTitle"
      >{{ $siteTitle }}</span>
    </router-link>

    <div
      :style="linksWrapMaxWidth ? {
        'max-width': linksWrapMaxWidth + 'px'
      } : {}"
      class="links"
    >
      <Theme />
      <ScreenFull />
      <AlgoliaSearchBox :options="algolia" v-if="isAlgoliaSearch" />
      <SearchBox v-else-if="$themeConfig.search !== false && $page.frontmatter.search !== false" />
      <NavLinks class="can-hide" />
    </div>
  </header>
</template>

<script>
import AlgoliaSearchBox from '@AlgoliaSearchBox';
import NavLinks from '@theme/components/NavLinks.vue';
import ScreenFull from '@theme/components/ScreenFull.vue';
import SearchBox from '@SearchBox';
import SidebarButton from '@parent-theme/components/SidebarButton.vue';
import Theme from '@theme/components/Theme';

const css = (el, property) => {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView;

  // `null` means not to return pseudo styles
  return win.getComputedStyle(el, null)[property];
};

export default {
  components: { SidebarButton, NavLinks, ScreenFull, SearchBox, AlgoliaSearchBox, Theme },

  data: () => ({ linksWrapMaxWidth: null }),

  mounted() {
    // Refer to config.styl
    const MOBILE_DESKTOP_BREAKPOINT = 719;
    const NAVBAR_VERTICAL_PADDING = parseInt(css(this.$el, 'paddingLeft')) + parseInt(css(this.$el, 'paddingRight'));
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) this.linksWrapMaxWidth = null;
      else
        this.linksWrapMaxWidth =
          this.$el.offsetWidth -
          NAVBAR_VERTICAL_PADDING -
          ((this.$refs.siteName && this.$refs.siteName.offsetWidth) || 0);
    };

    handleLinksWrapWidth();
    window.addEventListener('resize', handleLinksWrapWidth, false);
  },

  computed: {
    algolia() {
      return this.$themeLocaleConfig.algolia || this.$themeConfig.algolia || {};
    },

    isAlgoliaSearch() {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName;
    }
  }
};
</script>

<style lang="stylus">
$navbar-vertical-padding = 0.7rem
$navbar-horizontal-padding = 1.5rem

.navbar
  padding $navbar-vertical-padding $navbar-horizontal-padding
  line-height $navbarHeight - 1.4rem
  box-shadow 0 1px 6px 0 rgba(32, 33, 36, 0.28)

  a, span, img
    display inline-block

  .logo
    height $navbarHeight - 1.4rem
    min-width $navbarHeight - 1.4rem
    margin-right 0.8rem
    vertical-align top

  .site-name
    font-size 1.2rem
    font-weight 600
    color $textColor
    position relative

  .links
    padding-left 1.5rem
    box-sizing border-box
    background-color white
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
