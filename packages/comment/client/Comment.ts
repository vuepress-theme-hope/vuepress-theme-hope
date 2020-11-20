import { Component, Vue } from "vue-property-decorator";
import Valine from "./Valine.vue";
import { commentOptions } from "./define";

@Component({ components: { Valine } })
export default class Comment extends Vue {
  private options = commentOptions;

  private get pluginEnable(): boolean {
    return (
      this.options.type !== "disable" &&
      (this.$frontmatter.comment ||
        (this.options.comment !== false &&
          (this.options.type === "valine" ||
            this.$frontmatter.comment !== false)))
    );
  }
}
