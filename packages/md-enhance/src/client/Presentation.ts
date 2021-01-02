import Vue, { PropType } from "vue";
import Loading from "./icons/LoadingIcon.vue";

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
    code: { type: String, required: true },
    theme: { type: String as PropType<ThemeType>, default: "auto" },
  },

  data: () => ({
    loading: true,
  }),

  mounted(): void {
    this.$el.setAttribute("id", this.id);
    const revealElement = document.querySelector(`#${this.id}`);

    if (revealElement) {
      revealElement.setAttribute("theme", this.theme);

      const promises = [import(/* webpackChunkName: "reveal" */ "reveal.js")];

      promises.push(
        import(
          /* webpackChunkName: "reveal" */ "reveal.js/plugin/markdown/markdown.esm.js"
        )
      );

      if (REVEAL_PLUGINS.includes("highlight"))
        promises.push(
          import(
            /* webpackChunkName: "reveal" */ "reveal.js/plugin/highlight/highlight.esm.js"
          )
        );

      if (REVEAL_PLUGINS.includes("math"))
        promises.push(
          import(
            /* webpackChunkName: "reveal" */ "reveal.js/plugin/math/math.esm.js"
          )
        );

      if (REVEAL_PLUGINS.includes("search"))
        promises.push(
          import(
            /* webpackChunkName: "reveal" */ "reveal.js/plugin/search/search.esm.js"
          )
        );

      if (REVEAL_PLUGINS.includes("notes"))
        promises.push(
          import(
            /* webpackChunkName: "reveal" */ "reveal.js/plugin/notes/notes.esm.js"
          )
        );

      if (REVEAL_PLUGINS.includes("zoom"))
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
            slideNumber: true,
            ...REVEAL_CONFIG,
            ...(this.$frontmatter.reveal || {}),
            embedded: this.$frontmatter.layout !== "Slide",
          })
          .then(() => {
            this.loading = false;
          });
      });
    }
  },
});
