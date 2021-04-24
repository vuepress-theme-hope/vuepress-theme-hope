import Vue from "vue";
import Loading from "./icons/LoadingIcon.vue";

import type { Mermaid } from "mermaid";

export default Vue.extend({
  name: "Mermaid",

  components: { Loading },

  props: {
    id: { type: String, required: true },
  },

  data: () => ({
    theme: "dark",
    loading: true,
    svgCode: "",
  }),

  mounted(): void {
    const delay = (): Promise<void> =>
      new Promise((resolve) => setTimeout(resolve, 500));

    const code = decodeURIComponent(
      (this.$el as HTMLElement).dataset.code || ""
    );

    void Promise.all([
      import(/* webpackChunkName: "mermaid" */ "mermaid"),
      delay(),
    ]).then(([mermaid]) => {
      const { initialize, render } = (mermaid as unknown) as Mermaid;

      const renderMermaid = (isDarkTheme: boolean): void => {
        // generate a unvisiable container
        const container = document.createElement("div");

        container.style.position = "relative";
        container.style.top = "-9999px";

        const renderCallback = (svgCode: string): void => {
          this.loading = false;
          this.svgCode = svgCode;
          document.body.removeChild(container);
        };

        initialize({
          theme: isDarkTheme ? "dark" : "default",
          ...MERMAID_OPTIONS,
          startOnLoad: false,
        });

        // clear SVG Code
        this.svgCode = "";

        document.body.appendChild(container);

        // make sure dom is refreshed
        Vue.nextTick(() => render(this.id, code, renderCallback, container));
      };

      const body = document.querySelector("body") as HTMLBodyElement;

      renderMermaid(body.classList.contains("theme-dark"));

      // watch theme change
      new MutationObserver(() => {
        renderMermaid(body.classList.contains("theme-dark"));
      }).observe(body, {
        attributeFilter: ["class"],
        attributes: true,
      });
    });
  },

  render(h) {
    return this.svgCode
      ? // mermaid
        h("div", {
          class: "md-mermaid",
          domProps: {
            innerHTML: this.svgCode,
          },
        })
      : // loading
        h("div", { class: "md-mermaid-loading" }, [h(Loading)]);
  },
});
