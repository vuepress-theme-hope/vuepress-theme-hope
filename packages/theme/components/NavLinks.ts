import Vue from "vue";
import VueRouter, { RouterOptions } from "vue-router";
import DropdownLink from "@theme/components/DropdownLink.vue";
import { NavBarConfigItem } from "@mr-hope/vuepress-types";
import NavLink from "@theme/components/NavLink.vue";
import { NavBarConfigItem as ResovledNavbarConfigItem } from "@theme/util/navbar";
import { getNavLinkItem } from "@theme/util/navbar";

export default Vue.extend({
  name: "NavLinks",

  components: { NavLink, DropdownLink },

  computed: {
    userNav(): NavBarConfigItem[] {
      return this.$themeLocaleConfig.nav || this.$themeConfig.nav || [];
    },

    nav(): NavBarConfigItem[] {
      const { locales } = this.$site;

      if (locales && Object.keys(locales).length > 1) {
        const currentLink = this.$page.path;
        const { routes } = ((this.$router as unknown) as VueRouter & {
          options: RouterOptions;
        }).options;
        const themeLocales = this.$themeConfig.locales || {};
        const languageDropdown = {
          text: this.$themeLocaleConfig.selectText || "Languages",
          ariaLabel: this.$themeLocaleConfig.ariaLabel || "Select language",
          items: Object.keys(locales).map((path) => {
            const locale = locales[path];
            const text =
              (themeLocales[path] && themeLocales[path].label) ||
              locale.lang ||
              "Unknown Language";
            let link: string;

            // Stay on the current page
            if (locale.lang === this.$lang) link = currentLink;
            else {
              // Try to stay on the same page
              link = currentLink.replace(this.$localeConfig.path, path);
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
    },

    userLinks(): ResovledNavbarConfigItem[] {
      return (this.nav || []).map((link) => getNavLinkItem(link));
    },

    repoLink(): string {
      const { repo } = this.$themeConfig;

      if (repo)
        return /^https?:/u.test(repo) ? repo : `https://github.com/${repo}`;

      return "";
    },

    repoLabel(): string {
      if (!this.repoLink) return "";
      if (this.$themeConfig.repoLabel) return this.$themeConfig.repoLabel;

      const [repoHost] = /^https?:\/\/[^/]+/u.exec(this.repoLink) || [""];
      const platforms = ["GitHub", "GitLab", "Bitbucket"];

      for (let index = 0; index < platforms.length; index++) {
        const platform = platforms[index];

        if (new RegExp(platform, "iu").test(repoHost)) return platform;
      }

      return "Source";
    },
  },
});
