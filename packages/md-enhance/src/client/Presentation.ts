import Vue, { PropType } from "vue";
import Loading from "./icons/LoadingIcon.vue";
import type { RevealOptions } from "reveal.js";

type ThemeType =
  | "auto"
  | "black"
  | "white"
  | "league"
  | "beige"
  | "sky"
  | "night"
  | "serif"
  | "simple"
  | "solarized"
  | "blood"
  | "moon";

export default Vue.extend({
  name: "Presentation",

  components: { Loading },

  props: {
    id: { type: String, required: true },
    theme: { type: String as PropType<ThemeType>, default: "auto" },
  },

  data: () => ({
    loading: true,
    code: "",
  }),

  mounted(): void {
    this.$el.setAttribute("id", this.id);
    this.code = decodeURIComponent(
      (this.$el as HTMLElement).dataset.code || ""
    );

    const revealElement = document.querySelector(`#${this.id}`);

    if (revealElement) {
      revealElement.setAttribute("theme", this.theme);

      const promises = [import(/* webpackChunkName: "reveal" */ "reveal.js")];

      promises.push(
        import(
          /* webpackChunkName: "reveal" */ "reveal.js/plugin/markdown/markdown.esm.js"
        )
      );

      if (REVEAL_PLUGIN_HIGHLIGHT)
        promises.push(
          import(
            /* webpackChunkName: "reveal" */ "reveal.js/plugin/highlight/highlight.esm.js"
          )
        );

      if (REVEAL_PLUGIN_MATH)
        promises.push(
          import(
            /* webpackChunkName: "reveal" */ "reveal.js/plugin/math/math.esm.js"
          )
        );

      if (REVEAL_PLUGIN_SEARCH)
        promises.push(
          import(
            /* webpackChunkName: "reveal" */ "reveal.js/plugin/search/search.esm.js"
          )
        );

      if (REVEAL_PLUGIN_NOTES)
        promises.push(
          import(
            /* webpackChunkName: "reveal" */ "reveal.js/plugin/notes/notes.esm.js"
          )
        );

      if (REVEAL_PLUGIN_ZOOM)
        promises.push(
          import(
            /* webpackChunkName: "reveal" */ "reveal.js/plugin/zoom/zoom.esm.js"
          )
        );

      // if (REVEAL_PLUGINS.includes("anything"))
      //   promises.push(
      //     import(
      //       /* webpackChunkName: "reveal" */ "reveal.js-plugins/anything/anything.js"
      //     )
      //   );

      // if (REVEAL_PLUGINS.includes("audio"))
      //   promises.push(
      //     import(
      //       /* webpackChunkName: "reveal" */ "reveal.js-plugins/audio-slideshow/audio-slideshow.js"
      //     )
      //   );

      // if (REVEAL_PLUGINS.includes("chalkboard"))
      //   promises.push(
      //     import(
      //       /* webpackChunkName: "reveal" */ "reveal.js-plugins/chalkboard/chalkboard.js"
      //     )
      //   );

      void Promise.all(promises).then(([revealJS, ...plugins]) => {
        const reveal = new revealJS.default(revealElement as HTMLElement, {
          plugins: plugins.map((plugin) => plugin.default),
        });

        void reveal
          .initialize({
            backgroundTransition: "slide",
            hash: this.$frontmatter.layout === "Slide",
            mouseWheel: this.$frontmatter.layout === "Slide",
            transition: "slide",
            slideNumber: true,
            ...REVEAL_CONFIG,
            ...(this.$frontmatter.reveal || {}),
            embedded: this.$frontmatter.layout !== "Slide",
          } as Partial<RevealOptions>)
          .then(() => {
            this.loading = false;
          });

        reveal.configure({ backgroundTransition: "slide" });
      });
    }
  },
});
