<template>
  <div v-html="copyright" />
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Clipboard extends Vue {
  @Prop({ type: String, default: "" })
  private readonly html!: string;

  @Prop({ type: String, default: "en-US" })
  private readonly lang!: string;

  private location = "";

  private get copyright() {
    /** 作者 */
    const { author } = this.$themeConfig;
    /** 内容 */
    const content: Record<string, string> = {
      "zh-CN": `${this.html}\n-----\n著作权归${author}所有。\n链接：${location}`,
      "en-US": `${this.html}\n-----\nCopyright by ${author}.\nLink: ${location}`,
    };

    return content[this.lang];
  }

  private created() {
    if (typeof window !== "undefined")
      this.location = window.location.toString();
  }
}
</script>
