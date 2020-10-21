import { Component, Prop, Vue } from "vue-property-decorator";
import Loading from "@mr-hope/vuepress-shared-utils/icons/LoadingIcon.vue";

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

@Component({ components: { Loading } })
export default class Reveal extends Vue {
  @Prop({ type: String, required: true })
  private readonly id!: string;

  @Prop({ type: String, required: true })
  private readonly code!: string;

  @Prop({ type: String, default: "auto" })
  private readonly theme!: ThemeType;

  private loading = true;

  private mounted(): void {
    this.$el.setAttribute("id", this.id);
    const revealElement = document.querySelector(`#${this.id}`);

    if (revealElement) {
      revealElement.setAttribute("theme", this.theme);

      void Promise.all([
        import(/* webpackChunkName: "reveal" */ "reveal.js"),
        import(
          /* webpackChunkName: "reveal" */ "reveal.js/plugin/highlight/highlight.esm.js"
        ),
        import(
          /* webpackChunkName: "reveal" */ "reveal.js/plugin/markdown/markdown.esm.js"
        ),
        import(
          /* webpackChunkName: "reveal" */ "reveal.js/plugin/math/math.esm.js"
        ),
      ]).then(([revealJS, revealHighlight, revealMarkdown, revealMath]) => {
        const reveal = new revealJS.default(revealElement as HTMLElement, {
          plugins: [
            revealMarkdown.default,
            revealHighlight.default,
            revealMath.default,
          ],
        });

        void reveal
          .initialize({
            slideNumber: true,
            ...REVEAL_OPTIONS,
            ...(this.$frontmatter.reveal || {}),
            embedded: true,
          })
          .then(() => {
            this.loading = false;
          });
      });
    }
  }
}
