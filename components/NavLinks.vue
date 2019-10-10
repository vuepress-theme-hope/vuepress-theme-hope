<!--
 * @Author: Mr.Hope
 * @Date: 2019-10-08 17:25:18
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-10 08:47:02
 * @Description: 导航栏链接块
 *
 * 自主选择是否显示 Github 库
-->
<template>
  <nav class="nav-links" v-if="userLinks.length || repoLink">
    <!-- user links -->
    <div :key="item.link" class="nav-item" v-for="item in userLinks">
      <DropdownLink :item="item" v-if="item.type === 'links'" />
      <NavLink :item="item" v-else />
    </div>

    <!-- repo link -->
    <a
      :href="repoLink"
      class="repo-link"
      rel="noopener noreferrer"
      target="_blank"
      v-if="repoLink && $themeConfig.repoDisplay !== false"
    >
      {{ repoLabel }}
      <OutboundLink />
    </a>
  </nav>
</template>

<script>
import DropdownLink from '@theme/components/DropdownLink.vue';
import { resolveNavLinkItem } from '@parent-theme/util';
import NavLink from '@theme/components/NavLink.vue';

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
        const routes = this.$router.options.routes;
        const themeLocales = this.$themeConfig.locales || {};
        const languageDropdown = {
          text: this.$themeLocaleConfig.selectText || 'Languages',
          items: Object.keys(locales).map(path => {
            const locale = locales[path];
            const text = (themeLocales[path] && themeLocales[path].label) || locale.lang;
            let link;

            // Stay on the current page
            if (locale.lang === this.$lang) {
              link = currentLink;
            } else {
              // Try to stay on the same page
              link = currentLink.replace(this.$localeConfig.path, path);
              // fallback to homepage
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
      return (this.nav || []).map(link => {
        return Object.assign(resolveNavLinkItem(link), {
          items: (link.items || []).map(resolveNavLinkItem)
        });
      });
    },

    repoLink() {
      const { repo } = this.$themeConfig;

      if (repo) return /^https?:/.test(repo) ? repo : `https://github.com/${repo}`;
    },

    repoLabel() {
      if (!this.repoLink) return;
      if (this.$themeConfig.repoLabel) return this.$themeConfig.repoLabel;

      const repoHost = this.repoLink.match(/^https?:\/\/[^/]+/)[0];
      const platforms = ['GitHub', 'GitLab', 'Bitbucket'];

      for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i];

        if (new RegExp(platform, 'i').test(repoHost)) return platform;
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
