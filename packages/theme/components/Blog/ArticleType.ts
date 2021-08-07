import Vue from "vue";
import { getDefaultLocale } from "@mr-hope/vuepress-shared";
import { navigate } from "@theme/utils/navigate";

interface ArticleTypeItem {
  text: string;
  path: string;
}

export default Vue.extend({
  name: "ArticleType",

  computed: {
    types(): ArticleTypeItem[] {
      const blogI18n = this.$themeLocaleConfig.blog || getDefaultLocale().blog;

      return [
        { text: blogI18n.allText, path: "/article/" },
        { text: blogI18n.star, path: "/star/" },
        { text: blogI18n.slides, path: "/slide/" },
        { text: blogI18n.encrypt, path: "/encrypt/" },
      ];
    },
  },

  methods: {
    navigate(path: string): void {
      navigate(path, this.$router, this.$route);
    },
  },
});
