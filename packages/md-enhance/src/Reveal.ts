import { Component, Prop, Vue } from "vue-property-decorator";
import Loading from "@mr-hope/vuepress-shared-utils/icons/LoadingIcon.vue";
import RevealJS from "reveal.js";
import RevealHighlight from "reveal.js/plugin/highlight/highlight.esm.js";
import RevealMarkdown from "reveal.js/plugin/markdown/markdown.esm.js";
import RevealMath from "reveal.js/plugin/math/math.esm.js";

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

    if (revealElement)
      if (this.theme === "auto") revealElement.setAttribute("auto-theme", "");
      else revealElement.classList.add(this.theme);

    const reveal = new RevealJS({
      plugins: [RevealMarkdown, RevealHighlight, RevealMath],
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
  }
}
