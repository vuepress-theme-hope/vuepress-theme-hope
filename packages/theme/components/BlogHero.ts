import { Component, Vue } from "vue-property-decorator";
import MyTransition from "@theme/components/MyTransition.vue";

// eslint-disable-next-line @typescript-eslint/naming-convention
@Component({ components: { MyTransition } })
export default class BlogHero extends Vue {
  private get heroImageStyle(): Record<string, string> {
    const defaultStyle = {
      maxHeight: "180px",
      margin:
        this.$frontmatter.showTitle === false
          ? "6rem auto 1.5rem"
          : "1rem auto",
    };

    return {
      ...defaultStyle,
      ...(this.$frontmatter.heroImageStyle as Record<string, string>),
    };
  }

  private get bgImageStyle(): Record<string, string> {
    const defaultBgImageStyle: Record<string, string> = {
      height: "350px",
      textAlign: "center",
      overflow: "hidden",
    };
    const { bgImageStyle = {} } = this.$frontmatter;

    return {
      ...defaultBgImageStyle,
      ...(bgImageStyle as Record<string, string>),
    };
  }
}
