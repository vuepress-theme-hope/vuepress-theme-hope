import { Component, Vue } from "vue-property-decorator";
import Valine from "./src/Valine.vue";

@Component({ components: { Valine } })
export default class Comment extends Vue {
  private options = COMMENT_OPTIONS;

  private get pluginEnable(): boolean {
    return (
      this.options.type !== "disable" &&
      ((this.$frontmatter.comment as boolean) ||
        (this.options.comment !== false &&
          (this.options.type === "valine" ||
            this.$frontmatter.comment !== false)))
    );
  }
}
