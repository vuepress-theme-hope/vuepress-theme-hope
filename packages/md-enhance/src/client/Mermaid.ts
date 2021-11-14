import Vue from "vue";
import Loading from "./icons/LoadingIcon.vue";

import type mermaidAPI from "mermaid/mermaidAPI";

import "./styles/mermaid.styl";

export default Vue.extend({
  name: "Mermaid",

  components: { Loading },

  props: {
    id: { type: String, required: true },
  },

  data: () => ({
    loading: true,
    svgCode: "",
    observer: null as MutationObserver | null,
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
      const { initialize, render } = mermaid.default;

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
          theme: "base",
          themeVariables: {
            dark: isDarkTheme,
            background: isDarkTheme ? "#1e1e1e" : "#fff",

            primaryColor: isDarkTheme ? "#389d70" : "#4abf8a",
            primaryBorderColor: isDarkTheme ? "#389d70" : "#4abf8a",
            primaryTextColor: "#fff",

            secondaryColor: "#f39c12",
            secondaryBorderColor: isDarkTheme ? "#fff" : "#000",
            secondaryTextColor: isDarkTheme ? "#ddd" : "#333",

            tertiaryColor: isDarkTheme ? "#22182d" : "#eeeaf3",
            tertiaryBorderColor: isDarkTheme ? "#fff" : "#000",
            tertiaryTextColor: isDarkTheme ? "#ddd" : "#333",

            // note
            noteBkgColor: isDarkTheme ? "#f6d365" : "#fff5ad",
            noteTextColor: "#242424",
            noteBorderColor: isDarkTheme ? "#f6d365" : "#333",

            lineColor: isDarkTheme ? "#d3d3d3" : "#333",
            textColor: isDarkTheme ? "#fff" : "#242424",

            mainBkg: isDarkTheme ? "#389d70" : "#4abf8a",
            errorBkgColor: "#eb4d5d",
            errorTextColor: "#fff",

            // flowchart
            nodeBorder: isDarkTheme ? "#389d70" : "#4abf8a",
            nodeTextColor: isDarkTheme ? "#fff" : "#242424",

            // sequence
            signalTextColor: isDarkTheme ? "#9e9e9e" : "#242424",

            // class
            classText: "#fff",

            // state
            labelColor: "#fff",

            // colors
            fillType0: isDarkTheme ? "#cf1322" : "#f1636e",
            fillType1: "#f39c12",
            fillType2: "#2ecc71",
            fillType3: "#fa541c",
            fillType4: "#25a55b",
            fillType5: "#13c2c2",
            fillType6: "#096dd9",
            fillType7: "#aa6fe9",
          },
          ...MERMAID_OPTIONS,
          startOnLoad: false,
        } as mermaidAPI.Config);

        // clear SVG Code
        this.svgCode = "";

        document.body.appendChild(container);

        // make sure dom is refreshed
        Vue.nextTick(() => render(this.id, code, renderCallback, container));
      };

      const body = document.querySelector("body") as HTMLBodyElement;

      renderMermaid(body.classList.contains("theme-dark"));

      // watch theme change
      this.observer = new MutationObserver(() => {
        renderMermaid(body.classList.contains("theme-dark"));
      });

      this.observer.observe(body, {
        attributeFilter: ["class"],
        attributes: true,
      });
    });
  },

  // eslint-disable-next-line vue/no-deprecated-destroyed-lifecycle
  beforeDestroy() {
    if (this.observer) this.observer.disconnect();
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
