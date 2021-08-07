import Vue from "vue";
import DropdownLink from "@theme/components/Navbar/DropdownLink.vue";
import NavLink from "@theme/components/Navbar/NavLink.vue";
import { getNavLinkItem } from "@theme/utils/navbar";

import type { NavBarConfigItem } from "@mr-hope/vuepress-types";
import type { NavBarConfigItem as ResovledNavbarConfigItem } from "@theme/utils/navbar";

export default Vue.extend({
  name: "NavLinks",

  components: {
    DropdownLink,
    NavLink,
  },

  computed: {
    navLinks(): ResovledNavbarConfigItem[] {
      const navbar: NavBarConfigItem[] =
        this.$themeLocaleConfig.nav || this.$themeConfig.nav || [];

      return navbar.map((link) => getNavLinkItem(link));
    },
  },
});
