import Vue from "vue";
import CategoryIcon from "./icons/CategoryIcon.vue";
import { capitalize } from "@mr-hope/vuepress-shared";
import { pageInfoI18n } from "./define";

export default Vue.extend({
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

    canUse(): boolean {
      return this.$themeConfig.blog !== false;
    },

    hint(): string {
      return pageInfoI18n[this.$localePath || "/"].category;
    },
  },

  methods: {
    navigate(): void {
      const path = `/category/${this.categoryName}/`;

      if (this.canUse && this.$route.path !== path)
        void this.$router.push(path);
    },
  },
});
