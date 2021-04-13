import Vue from "vue";
import { commentOptions } from "./define";

export default Vue.extend({
  name: "Comment",

  components: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Valine: () =>
      VALINE_ENABLE
        ? import(/* webpackChunkName: "valine" */ "./Valine.vue")
        : import(
            /* webpackChunkName: "noopModule" */ "@mr-hope/vuepress-shared/lib/esm/noopModule"
          ),
  },

  data: () => ({
    options: commentOptions,
  }),

  computed: {
    pluginEnable(): boolean {
      return (
        this.options.type !== "disable" &&
        (this.$frontmatter.comment ||
          (this.options.comment !== false &&
            (this.options.type === "valine" ||
              this.$frontmatter.comment !== false)))
      );
    },
  },
});
