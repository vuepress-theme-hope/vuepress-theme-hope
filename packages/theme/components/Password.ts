import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Password extends Vue {
  @Prop({ type: Boolean, default: false })
  private readonly page!: boolean;

  private password = "";

  private hasTried = false;

  private get isMainPage(): boolean {
    return this.$frontmatter.home === true;
  }

  private verify(): void {
    this.hasTried = false;
    this.$emit("password-verify", this.password);

    void Vue.nextTick().then(() => {
      this.hasTried = true;
    });
  }
}
