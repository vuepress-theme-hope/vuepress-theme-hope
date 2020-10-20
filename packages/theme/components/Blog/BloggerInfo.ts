import { Component, Mixins } from "vue-property-decorator";
import { HopeLangI18nConfig, i18n } from "@mr-hope/vuepress-shared-utils";
import { ArticleMixin, TimelineMixin } from "@theme/util/articleMixin";
import MediaLinks from "@theme/components/MediaLinks.vue";
import navigate from "@theme/util/navigate";
import { BlogOptions } from "@theme/types";

@Component({ components: { MediaLinks } })
export default class BloggerInfo extends Mixins(ArticleMixin, TimelineMixin) {
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
    return this.$themeLocaleConfig.blog || i18n.getDefaultLocale().blog;
  }

  private navigate(url: string): void {
    navigate(url, this.$router, this.$route);
  }

  private jumpIntro(): void {
    if (this.hasIntro)
      navigate(this.blogConfig.intro as string, this.$router, this.$route);
  }
}
