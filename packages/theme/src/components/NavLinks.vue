<!--
 * @Author: Mr.Hope
 * @Date: 2019-10-08 17:25:18
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-23 15:46:41
 * @Description: 导航栏链接块
 *
 * 自主选择是否显示 Github 库
-->
<template>
  <nav v-if="userLinks.length || repoLink" class="nav-links">
    <!-- user links -->
    <div v-for="item in userLinks" :key="item.link" class="nav-item">
      <DropdownLink v-if="item.type === 'links'" :item="item" />
      <NavLink v-else :item="item" />
    </div>

    <!-- repo link -->
    <a
      v-if="repoLink && $themeConfig.repoDisplay !== false"
      class="repo-link"
      rel="noopener noreferrer"
      :href="repoLink"
      target="_blank"
    >
      {{ repoLabel }}
      <OutboundLink />
    </a>
  </nav>
</template>

<script>
import DropdownLink from '@theme/components/DropdownLink.vue';
import NavLink from '@theme/components/NavLink.vue';
import { resolveNavLinkItem } from '@theme/util';

export default {
  components: { NavLink, DropdownLink },

  computed: {
    userNav() {
      return this.$themeLocaleConfig.nav || this.$themeConfig.nav || [];
    },

    nav() {
      const { locales } = this.$site;

      if (locales && Object.keys(locales).length > 1) {
        const currentLink = this.$page.path;
        const { routes } = this.$router.options;
        const themeLocales = this.$themeConfig.locales || {};
        const languageDropdown = {
          text: this.$themeLocaleConfig.selectText || 'Languages',
          ariaLabel: this.$themeLocaleConfig.ariaLabel || 'Select language',
          items: Object.keys(locales).map(path => {
            const locale = locales[path];
            const text =
              (themeLocales[path] && themeLocales[path].label) || locale.lang;
            let link;

            // Stay on the current page
            if (locale.lang === this.$lang) link = currentLink;
            else {
              // Try to stay on the same page
              link = currentLink.replace(this.$localeConfig.path, path);
              // Fallback to homepage
              if (!routes.some(route => route.path === link)) link = path;
            }

            return { text, link };
          })
        };

        return [...this.userNav, languageDropdown];
      }

      return this.userNav;
    },

    userLinks() {
      return (this.nav || []).map(link => resolveNavLinkItem(link));
    },

    repoLink() {
      const { repo } = this.$themeConfig;

      if (repo)
        return /^https?:/u.test(repo) ? repo : `https://github.com/${repo}`;

      return '';
    },

    repoLabel() {
      if (!this.repoLink) return '';
      if (this.$themeConfig.repoLabel) return this.$themeConfig.repoLabel;

      const [repoHost] = this.repoLink.match(/^https?:\/\/[^/]+/u);
      const platforms = ['GitHub', 'GitLab', 'Bitbucket'];

      for (let index = 0; index < platforms.length; index++) {
        const platform = platforms[index];

        if (new RegExp(platform, 'iu').test(repoHost)) return platform;
      }

      return 'Source';
    }
  }
};
</script>

<style lang="stylus">
.nav-links
  display inline-block

  a
    line-height 1.4rem
    color inherit

    &:hover, &.router-link-active
      color $accentColor

  .nav-item
    position relative
    display inline-block
    margin-left 1.5rem
    line-height 2rem

    &:first-child
      margin-left 0

  .repo-link
    margin-left 1.5rem

@media (max-width: $MQMobile)
  .nav-links
    .nav-item, .repo-link
      margin-left 0

@media (min-width: $MQMobile)
  .nav-links a
    &:hover, &.router-link-active
      color $textColor

  .nav-item > a:not(.external)
    &:hover, &.router-link-active
      margin-bottom -2px
      border-bottom 2px solid lighten($accentColor, 8%)
</style>
