import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Clipboard extends Vue {
  @Prop({ type: String, default: "" })
  private readonly html!: string;

  @Prop({ type: String, default: "en-US" })
  private readonly lang!: string;

  private location = "";

  private get copyright(): string {
    /** 作者 */
    const { author } = this.$themeConfig;
    /** 内容 */
    const content: Record<string, string> = {
      "zh-CN": `${this.html}\n-----\n${
        author ? `著作权归${author}所有。\n` : ""
      }链接：${this.location}`,
      "en-US": `${this.html}\n-----\n${
        author ? `Copyright by ${author}.\n` : ""
      }Link: ${this.location}`,
    };

    return content[this.lang];
  }

  private created(): void {
    if (typeof window !== "undefined")
      this.location = window.location.toString();
  }
}
