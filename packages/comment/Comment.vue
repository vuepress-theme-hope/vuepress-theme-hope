<template>
  <div v-show="pluginEnable" class="comments-wrapper">
    <Valine v-if="options.type === 'valine'" :valine-config="options" />
    <Vssue v-else-if="options.type === 'vssue'" :title="$title" />
  </div>
</template>

<script lang='ts'>
/* global COMMENT_OPTIONS */
import { Component, Prop, Vue } from "vue-property-decorator";
import Valine from "./src/Valine.vue";

@Component({ components: { Valine } })
export default class Comment extends Vue {
  private options = COMMENT_OPTIONS;

  private get pluginEnable() {
    return (
      this.options.type !== "disable" &&
      (this.$frontmatter.comment ||
        (this.options.comment !== false &&
          (this.options.type === "valine" ||
            this.$frontmatter.comment !== false)))
    );
  }
}
</script>
