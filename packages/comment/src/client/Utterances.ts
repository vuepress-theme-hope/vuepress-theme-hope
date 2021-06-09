// import { Component, Prop, Ref, Vue, Watch } from 'vue-property-decorator';
import Vue from "vue";
import { Route } from "vue-router";

// import type { WalineInstance } from "@utterances/client";
import type { PropType } from "vue";
import type { UtterancesOptions } from "../types";

let timeout: NodeJS.Timeout | null = null;
const body = document.querySelector("body") as HTMLBodyElement;
export default Vue.extend({
  name: "Utterances",

  props: {
    utterancesConfig: {
      type: Object as PropType<UtterancesOptions>,
      required: true,
    },
  },

  data: () => ({
    utterances: null,
  }),

  computed: {
    utterancesEnable(): boolean {
      const { utterancesConfig } = this;

      return Boolean(utterancesConfig?.repo);
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

        void (() => {
          this.utterances = Utterances({
            src: "https://utteranc.es/client.js" as string,
            repo: utterancesConfig.repo as string,
            issueTerm: utterancesConfig.issueTerm as string,
            theme: utterancesConfig.theme as string,
            crossorigin: "anonymous" as string,
            async: true as boolean,
            ...utterancesConfig,
            visitor: this.visitorDisplay,
          }) as string;
        });
      }, 1000);
  },
  // eslint-disable-next-line vue/no-deprecated-destroyed-lifecycle
  beforeDestroy(): void {
    const renderMermaid = (isDarkTheme: boolean): void => {
      // generate a unvisiable container
      const container = document.createElement("div");

      container.style.position = "relative";
      container.style.top = "-9999px";
    };
    const isDarkMode = new MutationObserver(() => {
      renderMermaid(body.classList.contains("theme-dark"));
    });
    if (isDarkMode) this.utterances?.destroy();
  },
});
