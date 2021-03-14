import Vue from "vue";
import DropdownLink from "@theme/components/Navbar/DropdownLink.vue";
import LanguageDropdown from "@theme/components/Navbar/LanguageDropdown";
import NavLink from "@theme/components/Navbar/NavLink.vue";
import { getNavLinkItem } from "@theme/util/navbar";

import type { NavBarConfigItem } from "@mr-hope/vuepress-types";
import type { NavBarConfigItem as ResovledNavbarConfigItem } from "@theme/util/navbar";

export default Vue.extend({
  name: "NavLinks",

  components: {
    DropdownLink,
    LanguageDropdown,
    NavLink,
  },

  computed: {
    navLinks(): ResovledNavbarConfigItem[] {
      const navbar: NavBarConfigItem[] =
        this.$themeLocaleConfig.nav || this.$themeConfig.nav || [];

      return navbar.map((link) => getNavLinkItem(link));
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
