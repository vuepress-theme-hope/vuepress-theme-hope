import { Component, Vue } from "vue-property-decorator";
import { getDefaultLocale } from "@mr-hope/vuepress-shared";
import { navigate } from "@theme/util/navigate";

interface TagOption {
  name: string;
  path: string;
}

@Component
export default class TagList extends Vue {
  private get tagList(): TagOption[] {
    return [
      {
        name:
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          this.$themeLocaleConfig.blog!.allText ||
          getDefaultLocale().blog.allText,
        path: "/tag/",
      },
      ...(this.$tag.list as TagOption[]),
    ];
  }

  private isActive(name: string): boolean {
    return (
      name ===
      ((this.$currentTag && this.$currentTag.key) ||
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.$themeLocaleConfig.blog!.allText ||
        getDefaultLocale().blog.allText)
    );
  }

  private clickTag(path: string): void {
    navigate(path, this.$router, this.$route);
  }
}
