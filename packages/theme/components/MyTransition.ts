import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class MyTransition extends Vue {
  @Prop({ type: Number, default: 0 })
  private readonly delay!: number;

  @Prop({ type: Number, default: 0.25 })
  private readonly duration!: number;

  private setStyle(items: HTMLElement): void {
    items.style.transition = `transform ${this.duration}s ease-in-out ${this.delay}s, opacity ${this.duration}s ease-in-out ${this.delay}s`;
    items.style.transform = "translateY(-20px)";
    items.style.opacity = "0";
  }

  private unsetStyle(items: HTMLElement): void {
    items.style.transform = "translateY(0)";
    items.style.opacity = "1";
  }
}
