import Vue from "vue";
import { getDefaultLocale } from "@mr-hope/vuepress-shared";
import { navigate } from "@theme/util/navigate";

interface TagOption {
  name: string;
  path: string;
}

export default Vue.extend({
  name: "TagList",

  computed: {
    tagList(): TagOption[] {
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
    },
  },

  methods: {
    isActive(name: string): boolean {
      return (
        name ===
        ((this.$currentTag && this.$currentTag.key) ||
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          this.$themeLocaleConfig.blog!.allText ||
          getDefaultLocale().blog.allText)
      );
    },

    clickTag(path: string): void {
      navigate(path, this.$router, this.$route);
    },
  },
});
