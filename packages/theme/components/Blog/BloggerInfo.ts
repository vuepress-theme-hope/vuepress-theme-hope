import { Component, Mixins } from "vue-property-decorator";
import { getDefaultLocale } from "@mr-hope/vuepress-shared";
import { TimelineMixin } from "@theme/util/articleMixin";
import MediaLinks from "@theme/components/MediaLinks.vue";
import { filterArticle } from "@theme/util/article";
import { navigate } from "@theme/util/navigate";

import { BlogOptions } from "@theme/types";
import { HopeLangI18nConfig } from "@mr-hope/vuepress-shared";

@Component({ components: { MediaLinks } })
export default class BloggerInfo extends Mixins(TimelineMixin) {
  private get blogConfig(): BlogOptions {
    return this.$themeConfig.blog || {};
  }

  private get bloggerName(): string {
    return (
      this.blogConfig.name || this.$themeConfig.author || this.$site.title || ""
    );
  }

  private get bloggerAvatar(): string {
    return this.blogConfig.avatar || this.$themeConfig.logo || "";
  }

  private get hasIntro(): boolean {
    return Boolean(this.blogConfig.intro);
  }

  private get i18n(): HopeLangI18nConfig["blog"] {
    return this.$themeLocaleConfig.blog || getDefaultLocale().blog;
  }

  private get articleNumber(): number {
    return filterArticle(this.$site.pages).length;
  }

  private navigate(url: string): void {
    navigate(url, this.$router, this.$route);
  }

  private jumpIntro(): void {
    if (this.hasIntro)
      navigate(this.blogConfig.intro as string, this.$router, this.$route);
  }
}
