/* global COMMENT_OPTIONS */
import { defineComponent, ref } from "@vue/composition-api";
import Valine from "./src/Valine.vue";

export default defineComponent({
  name: "Comment",

  components: { Valine },

  setup() {
    const options = ref(COMMENT_OPTIONS);

    return { options };
  },

  computed: {
    pluginEnable(): boolean {
      return (
        this.options.type !== "disable" &&
        ((this.$frontmatter.comment as boolean) ||
          (this.options.comment !== false &&
            (this.options.type === "valine" ||
              this.$frontmatter.comment !== false)))
      );
    },
  },
});
