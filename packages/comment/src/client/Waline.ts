import Vue from "vue";
import { Route } from "vue-router";
import { WalineOptions } from "../types";
import { valineI18n } from "./define";

import type { PropType } from "vue";

let timeout: NodeJS.Timeout | null = null;

export default Vue.extend({
  name: "Valine",

  props: {
    walineConfig: {
      type: Object as PropType<WalineOptions>,
      required: true,
    },
  },

  computed: {
    walineEnable(): boolean {
      const { walineConfig } = this;

      return Boolean(walineConfig?.serverURL);
    },
    commentDisplay(): boolean {
      if (!this.walineEnable) return false;
      const globalEnable = this.walineConfig.comment !== false;
      const pageEnable = this.$page.frontmatter.comment;

      return (globalEnable && pageEnable !== false) || pageEnable === true;
    },

    /** Whether to display view number */
    visitorDisplay(): boolean {
      if (!this.walineEnable) return false;
      const globalEnable = this.walineConfig.visitor !== false;
      const pageEnable = this.$page.frontmatter.visitor;

      return (globalEnable && pageEnable !== false) || pageEnable === true;
    },
  },

  watch: {
    $route(to: Route, from: Route): void {
      // Refresh comment when navigating to a new page
      if (to.path !== from.path) {
        Vue.nextTick(() => {
          if (timeout) clearTimeout(timeout);

          timeout = setTimeout(() => {
            this.initWaline();
          }, 1000);
        });
      }
    },
  },

  mounted(): void {
    if (this.walineEnable)
      timeout = setTimeout(() => {
        this.initWaline();
      }, 1000);
  },

  // eslint-disable-next-line vue/no-deprecated-destroyed-lifecycle
  beforeDestroy(): void {
    if (timeout) clearTimeout(timeout);
  },

  methods: {
    // Init waline
    initWaline(): void {
      const { walineConfig } = this;

      void import(/* webpackChunkName: "waline" */ "@waline/client").then(
        ({ default: Waline }) => {
          Waline({
            el: "#waline-comment",
            lang: this.$lang === "zh-CN" ? "zh-CN" : "en-US",
            placeholder: valineI18n[this.$localePath || "/"],
            meta: walineConfig.meta || ["nick", "mail"],
            requiredFields: walineConfig.requiredFields || ["nick"],
            avatar: walineConfig.avatar || "retro",
            ...walineConfig,
            dark: "body.theme-dark",
            visitor: this.visitorDisplay,
            path: typeof window === "undefined" ? "" : window.location.pathname,
          });
        }
      );
    },
  },
});
