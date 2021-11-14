import Vue from "vue";
import { Route } from "vue-router";
import { valineI18n } from "./define";

import type { WalineInstance } from "@waline/client";
import type { PropType } from "vue";
import type { WalineOptions } from "../types";

let timeout: NodeJS.Timeout | null = null;

export default Vue.extend({
  name: "Waline",

  props: {
    walineConfig: {
      type: Object as PropType<WalineOptions>,
      required: true,
    },
  },

  data: () => ({
    waline: null as WalineInstance | null,
  }),

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
            this.waline?.update({});
          }, 1000);
        });
      }
    },
  },

  mounted(): void {
    if (this.walineEnable)
      timeout = setTimeout(() => {
        const { walineConfig } = this;

        void import(/* webpackChunkName: "waline" */ "@waline/client").then(
          ({ default: Waline }) => {
            this.waline = Waline({
              el: "#waline-comment",
              lang: this.$lang === "zh-CN" ? "zh-CN" : "en-US",
              locale: {
                placeholder: valineI18n[this.$localePath || "/"],
              },
              meta: walineConfig.meta || ["nick", "mail"],
              requiredMeta: walineConfig.requiredMeta || ["nick"],
              emoji: [
                "https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/bilibili",
                "https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/weibo",
              ],
              ...walineConfig,
              dark: "body.theme-dark",
              visitor: this.visitorDisplay,
              path:
                typeof window === "undefined" ? "" : window.location.pathname,
            }) as WalineInstance;
          }
        );
      }, 1000);
  },

  // eslint-disable-next-line vue/no-deprecated-destroyed-lifecycle
  beforeDestroy(): void {
    if (timeout) clearTimeout(timeout);
    this.waline?.destroy();
  },
});
