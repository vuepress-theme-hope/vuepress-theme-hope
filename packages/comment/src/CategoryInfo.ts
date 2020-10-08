import { defineComponent } from "@vue/composition-api";
import { capitalize, i18n } from "@mr-hope/vuepress-shared-utils";

import CategoryIcon from "@mr-hope/vuepress-shared-utils/icons/CategoryIcon.vue";

export default defineComponent({
  name: "CategoryInfo",

  components: { CategoryIcon },

  props: {
    category: { type: String, default: "" },
  },

  computed: {
    categoryName(): string {
      if (this.category) return capitalize(this.category);

      const { category } = this.$frontmatter;

      return category ? capitalize(category) : "";
    },

    active(): boolean {
      return this.$themeConfig.blog !== false;
    },

    hint(): string {
      return (this.$themeLocaleConfig.blog || i18n.getDefaultLocale().blog)
        .category;
    },
  },

  methods: {
    navigate(): void {
      const path = `/category/${this.categoryName}/`;

      if (this.active && this.$route.path !== path)
        void this.$router.push(path);
    },
  },
});
