// import { Component, Prop, Ref, Vue, Watch } from 'vue-property-decorator';
import Vue from "vue";
import { Route } from "vue-router";

// import type { WalineInstance } from "@utterances/client";
import type { PropType } from "vue";
import type { UtterancesOptions } from "../types";

let timeout: NodeJS.Timeout | null = null;

export default Vue.extend({
  name: "Utterances",

  props: {
    utterancesConfig: {
      type: Object as PropType<UtterancesOptions>,
      required: true,
    },
  },

    data: () => ({
      utterances: null as UtterancesInstance | null,
    }),

  computed: {
    utterancesEnable(): boolean {
      const { UtterancesConfig } = this;

      return Boolean(UtterancesConfig?.repo);
    },
    commentDisplay(): boolean {
      if (!this.utterancesEnable) return false;
      const globalEnable = this.utterancesConfig.comment !== false;
      const pageEnable = this.$page.frontmatter.comment;

      return (globalEnable && pageEnable !== false) || pageEnable === true;
    },

    /** Whether to display view number */
    visitorDisplay(): boolean {
      if (!this.utterancesEnable) return false;
      const globalEnable = this.utterancesConfig.visitor !== false;
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
            this.utterances?.update({});
          }, 1000);
        });
      }
    },
  },

  mounted(): void {
    if (this.utterancesEnable)
      timeout = setTimeout(() => {
        const { utterancesConfig } = this;

        void import(/*"utterances"*/).then(({ default: Utterances }) => {
          this.utterances = Utterances({
            src: "https://utteranc.es/client.js",
            repo: utterancesConfig.repo,
            issueTerm: utterancesConfig.issueTerm,
            theme: utterancesConfig.theme || "github-light",
            crossorigin: "anonymous",
            async: true,
            ...utterancesConfig,
            visitor: this.visitorDisplay,
          });
        });
      }, 1000);
  },
});
