/* global COMMENT_OPTIONS */
import { defineComponent, ref } from "@vue/composition-api";
import EyeIcon from "@mr-hope/vuepress-shared-utils/icons/EyeIcon.vue";
import FireIcon from "@mr-hope/vuepress-shared-utils/icons/FireIcon.vue";
import { Route } from "vue-router";
import { ValineOptions } from "../types";
import { i18n } from "@mr-hope/vuepress-shared-utils";

export default defineComponent({
  name: "VisitorInfo",

  components: { EyeIcon, FireIcon },

  setup() {
    const valineConfig = ref(COMMENT_OPTIONS as ValineOptions);

    const count = ref(0);

    return { count, valineConfig };
  },

  computed: {
    valineEnable(): boolean {
      const { valineConfig } = this;

      return Boolean(
        valineConfig &&
          valineConfig.type === "valine" &&
          valineConfig.appId &&
          valineConfig.appKey
      );
    },

    /** Whether enable page view display */
    enableVisitor(): boolean {
      if (!this.valineEnable) return false;
      const globalEnable = this.valineConfig.visitor !== false;
      const pageConfig = this.$frontmatter.visitor as boolean;

      return (globalEnable && pageConfig !== false) || pageConfig === true;
    },

    /** visitorID, use current path */
    visitorID(): string {
      const { base } = this.$site;

      return base
        ? `${base.slice(0, base.length - 1)}${this.$page.path}`
        : this.$page.path;
    },

    hint(): string {
      return (this.$themeLocaleConfig.blog || i18n.getDefaultLocale().blog)
        .views;
    },
  },

  watch: {
    // show fire icon depending on the views number
    $route(to: Route, from: Route): void {
      if (to.path !== from.path)
        setTimeout(() => {
          this.getCount();
        }, 500);
    },
  },

  mounted(): void {
    setTimeout(() => {
      this.getCount();
    }, 1500);
  },

  methods: {
    getCount(): void {
      const countElement = document.querySelector(
        ".leancloud_visitors .leancloud-visitors-count"
      );

      if (countElement) {
        const count = countElement.textContent;

        if (count && !isNaN(Number(count))) this.count = Number(count);
      } else
        setTimeout(() => {
          this.getCount();
        }, 500);
    },
  },
});
