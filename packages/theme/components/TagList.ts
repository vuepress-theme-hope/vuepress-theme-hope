import { Component, Vue } from "vue-property-decorator";
import { i18n } from "@mr-hope/vuepress-shared-utils";
import navigate from "@theme/util/navigate";

interface TagOption {
  name: string;
  path: string;
}

@Component
export default class TagList extends Vue {
  /** 标签列表 */
  private get tagList(): TagOption[] {
    return [
      {
        name:
          this.$themeLocaleConfig.blog.allText ||
          i18n.getDefaultLocale().blog.allText,
        path: "/tag/",
      },
      ...(this.$tag.list as TagOption[]),
    ];
  }

  /** 是否激活 */
  private isActive(name: string): boolean {
    return (
      name ===
      ((this.$currentTag && this.$currentTag.key) ||
        this.$themeLocaleConfig.blog.allText ||
        i18n.getDefaultLocale().blog.allText)
    );
  }

  /** 点击标签导航 */
  private clickTag(path: string): void {
    navigate(path, this.$router, this.$route);
  }
}
