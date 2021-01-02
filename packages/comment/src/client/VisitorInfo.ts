import Vue from "vue";
import EyeIcon from "./icons/EyeIcon.vue";
import FireIcon from "./icons/FireIcon.vue";
import { commentOptions, pageInfoI18n } from "./define";
import { Route } from "vue-router";
import { ValineOptions } from "../types";

export default Vue.extend({
  name: "VisitorInfo",

  components: { EyeIcon, FireIcon },

  data: () => ({
    count: 0,
    valineConfig: commentOptions as ValineOptions,
  }),

  computed: {
    valineEnable(): boolean {
      const { valineConfig } = this;

      return Boolean(
        valineConfig &&
          valineConfig.type === "valine" &&
          valineConfig.appId &&
          valineConfig.appKey
      );
    } /** Whether enable page view display */,
    enableVisitor(): boolean {
      if (!this.valineEnable) return false;
      const globalEnable = this.valineConfig.visitor !== false;
      const pageConfig = this.$frontmatter.visitor;

      return (globalEnable && pageConfig !== false) || Boolean(pageConfig);
    },

    /** visitorID, use current path */
    visitorID(): string {
      const { base } = this.$site;

      return base
        ? `${base.slice(0, base.length - 1)}${this.$page.path}`
        : this.$page.path;
    },

    hint(): string {
      return pageInfoI18n[this.$localePath || "/"].views;
    },
  },

  watch: {
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
    // show fire icon depending on the views number
    getCount(): void {
      const countElement = document.querySelector(
        ".leancloud_visitors .leancloud-visitors-count"
      );

      if (countElement) {
        const count = countElement.textContent;

        if (count && !isNaN(Number(count))) this.count = Number(count);
        else
          setTimeout(() => {
            this.getCount();
          }, 500);
      }
    },
  },
});
