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

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import DropdownLink from "@theme/components/DropdownLink.vue";
import NavLink from "@theme/components/NavLink.vue";
import { RouterOptions } from "vue-router";
import { resolveNavLinkItem } from "../util/navbar";

@Component({ components: { NavLink, DropdownLink } })
export default class NavLinks extends Vue {
  private get userNav() {
    return this.$themeLocaleConfig.nav || this.$themeConfig.nav || [];
  }

  private get nav() {
    const { locales } = this.$site;

    if (locales && Object.keys(locales).length > 1) {
      const currentLink = this.$page.path;
      const { routes } = (this.$router as any).options as RouterOptions;
      const themeLocales = this.$themeConfig.locales || {};
      const languageDropdown = {
        text: this.$themeLocaleConfig.selectText || "Languages",
        ariaLabel: this.$themeLocaleConfig.ariaLabel || "Select language",
        items: Object.keys(locales).map((path) => {
          const locale = locales[path];
          const text =
            (themeLocales[path] && themeLocales[path].label) || locale.lang;
          let link: string;

          // Stay on the current page
          if (locale.lang === this.$lang) link = currentLink;
          else {
            // Try to stay on the same page
            link = currentLink.replace(this.$localeConfig.path as string, path);
            // Fallback to homepage
            if (!(routes || []).some((route) => route.path === link))
              link = path;
          }

          return { text, link };
        }),
      };

      return [...this.userNav, languageDropdown];
    }

    return this.userNav;
  }

  private get userLinks() {
    return (this.nav || []).map((link: any) => resolveNavLinkItem(link));
  }

  private get repoLink() {
    const { repo } = this.$themeConfig;

    if (repo)
      return /^https?:/u.test(repo) ? repo : `https://github.com/${repo}`;

    return "";
  }

  private get repoLabel() {
    if (!this.repoLink) return "";
    if (this.$themeConfig.repoLabel) return this.$themeConfig.repoLabel;

    const [repoHost] = this.repoLink.match(/^https?:\/\/[^/]+/u) || [""];
    const platforms = ["GitHub", "GitLab", "Bitbucket"];

    for (let index = 0; index < platforms.length; index++) {
      const platform = platforms[index];

      if (new RegExp(platform, "iu").test(repoHost)) return platform;
    }

    return "Source";
  }
}
</script>

<style lang="stylus">
.nav-links
  display inline-block

  .nav-link
    line-height 1.4rem
    color var(--dark-grey)

    &.active
      color var(--accent-color)

  .nav-item
    position relative
    display inline-block
    margin-left 1.5rem
    line-height 2rem

    &:first-child
      margin-left 0

  .repo-link
    color var(--dark-grey)
    margin-left 1.5rem

@media (max-width: $MQMobile)
  .nav-links
    .nav-link
      &:hover, &.active
        color var(--accent-color)

    .nav-item, .repo-link
      margin-left 0

@media (min-width: $MQMobile)
  .nav-item > .nav-link
    &:hover, &.active
      margin-bottom -2px
      border-bottom 2px solid var(--accent-color-l10)

    &.active
      color var(--accent-color)
</style>
