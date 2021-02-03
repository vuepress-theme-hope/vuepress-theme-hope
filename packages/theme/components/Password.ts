import { getDefaultLocale } from "@mr-hope/vuepress-shared";
import Vue from "vue";

import type { HopeThemeLocaleConfigItem } from "@mr-hope/vuepress-shared";

export default Vue.extend({
  name: "Password",

  props: {
    page: { type: Boolean, default: false },
  },

  data: () => ({
    password: "",
    hasTried: false,
  }),

  computed: {
    isMainPage(): boolean {
      return this.$frontmatter.home === true;
    },

    encrypt():HopeThemeLocaleConfigItem["encrypt"]{
      return this.$themeLocaleConfig.encrypt || getDefaultLocale().encrypt;
    }
  },

  methods: {
    verify(): void {
      this.hasTried = false;
      // eslint-disable-next-line vue/require-explicit-emits
      this.$emit("password-verify", this.password);

      void Vue.nextTick().then(() => {
        this.hasTried = true;
      });
    },
  },
});
