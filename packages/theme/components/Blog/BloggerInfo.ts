import { getDefaultLocale } from "@mr-hope/vuepress-shared";
import MediaLinks from "@theme/components/MediaLinks.vue";
import { timelineMixin } from "@theme/mixins/timeline";
import { filterArticle } from "@theme/utils/article";
import { navigate } from "@theme/utils/navigate";

import type { BlogOptions } from "@theme/types";
import type { HopeThemeLocaleConfigItem } from "@mr-hope/vuepress-shared";

export default timelineMixin.extend({
  name: "BloggerInfo",

  components: { MediaLinks },

  computed: {
    blogConfig(): BlogOptions {
      return this.$themeConfig.blog || {};
    },

    bloggerName(): string {
      return (
        this.blogConfig.name ||
        this.$themeConfig.author ||
        this.$site.title ||
        ""
      );
    },

    bloggerAvatar(): string {
      return this.blogConfig.avatar || this.$themeConfig.logo || "";
    },

    hasIntro(): boolean {
      return Boolean(this.blogConfig.intro);
    },

    hintAttr(): string {
      return this.hasIntro ? "aria-label" : "";
    },

    i18n(): HopeThemeLocaleConfigItem["blog"] {
      return this.$themeLocaleConfig.blog || getDefaultLocale().blog;
    },

    articleNumber(): number {
      return filterArticle(this.$site.pages).length;
    },
  },

  methods: {
    navigate(url: string): void {
      navigate(url, this.$router, this.$route);
    },

    jumpIntro(): void {
      if (this.hasIntro)
        navigate(this.blogConfig.intro as string, this.$router, this.$route);
    },
  },
});
