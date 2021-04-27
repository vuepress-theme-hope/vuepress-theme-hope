import Vue from "vue";
import { Route } from "vue-router";
import { ValineOptions } from "../types";
import { valineI18n } from "./define";

import type { PropType } from "vue";

export default Vue.extend({
  name: "Valine",

  props: {
    valineConfig: {
      type: Object as PropType<ValineOptions>,
      required: true,
    },
  },

  computed: {
    valineEnable(): boolean {
      const { valineConfig } = this;

      return Boolean(valineConfig && valineConfig.appId && valineConfig.appKey);
    },
    commentDisplay(): boolean {
      if (!this.valineEnable) return false;
      const globalEnable = this.valineConfig.comment !== false;
      const pageEnable = this.$page.frontmatter.comment;

      return (globalEnable && pageEnable !== false) || pageEnable === true;
    },

    /** Whether to display view number */
    visitorDisplay(): boolean {
      if (!this.valineEnable) return false;
      const globalEnable = this.valineConfig.visitor !== false;
      const pageEnable = this.$page.frontmatter.visitor;

      return (globalEnable && pageEnable !== false) || pageEnable === true;
    },
  },

  watch: {
    $route(to: Route, from: Route): void {
      if (to.path !== from.path)
        // Refresh comment when navigating to a new page
        Vue.nextTick(() => {
          this.initValine();
        });
    },
  },

  mounted(): void {
    if (this.valineEnable)
      setTimeout(() => {
        this.initValine();
      }, 500);
  },

  methods: {
    // Init valine
    initValine(): void {
      const { valineConfig } = this;

      void import(/* webpackChunkName: "valine" */ "valine").then(
        (valineConstructor) => {
          const valine = new valineConstructor.default();

          valine.init({
            el: "#valine",
            appId: valineConfig.appId, // Your appId
            appKey: valineConfig.appKey, // Your appKey
            placeholder:
              valineConfig.placeholder || valineI18n[this.$localePath || "/"],
            meta: valineConfig.meta || ["nick", "mail"],
            requiredFields: valineConfig.requiredFields || ["nick"],
            avatar: valineConfig.avatar || "retro",
            visitor: this.visitorDisplay,
            recordIP: valineConfig.recordIP || false,
            path: typeof window === "undefined" ? "" : window.location.pathname,
            pageSize: valineConfig.pageSize || 10,
            enableQQ: valineConfig.enableQQ || true,
            emojiCDN: valineConfig.emojiCDN || "",
            emojiMaps: valineConfig.emojiMaps,
            lang: this.$lang === "zh-CN" ? "zh-CN" : "en",
          });
        }
      );
    },
  },
});
