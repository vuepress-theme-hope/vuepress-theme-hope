import { Component, Vue } from "vue-property-decorator";
import { getDefaultLocale } from "@mr-hope/vuepress-shared-utils";
import navigate from "@theme/util/navigate";

interface ArticleTypeItem {
  text: string;
  path: string;
}

@Component
export default class ArticleType extends Vue {
  private get types(): ArticleTypeItem[] {
    const blogI18n = this.$themeLocaleConfig.blog || getDefaultLocale().blog;

    return [
      { text: blogI18n.allText, path: "/article/" },
      { text: blogI18n.slides, path: "/slide/" },
      { text: blogI18n.encrypt, path: "/encrypt/" },
    ];
  }

  private navigate(path: string): void {
    navigate(path, this.$router, this.$route);
  }
}
