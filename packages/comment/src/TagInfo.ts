import { defineComponent, PropType } from "@vue/composition-api";
import { capitalize, i18n } from "@mr-hope/vuepress-shared-utils";

import TagIcon from "@mr-hope/vuepress-shared-utils/icons/TagIcon.vue";

export default defineComponent({
  name: "TagInfo",

  components: { TagIcon },

  props: {
    tags: { type: Array as PropType<string[]>, default: (): string[] => [] },
  },

  computed: {
    $tags(): string[] {
      if (this.tags.length !== 0) return this.tags;

      const {
        tag,
        tags = tag as string | string[] | undefined,
      } = this.$frontmatter;

      if (typeof tags === "string") return [capitalize(tags)];

      if (Array.isArray(tags)) return tags.map((item) => capitalize(item));

      return [];
    },

    clickable(): boolean {
      return this.$themeConfig.blog !== false;
    },

    hint(): string {
      return (this.$themeLocaleConfig.blog || i18n.getDefaultLocale().blog).tag;
    },
  },

  methods: {
    navigate(tagName: string): void {
      const path = `/tag/${tagName}/`;
      if (this.$route.path !== path) void this.$router.push(path);
    },
  },
});
