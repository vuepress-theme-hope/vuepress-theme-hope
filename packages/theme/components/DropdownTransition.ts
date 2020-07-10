import { Component, Vue } from "vue-property-decorator";

@Component
export default class DropdownTransition extends Vue {
  private setHeight(items: HTMLElement): void {
    // explicitly set height so that it can be transitioned
    items.style.height = `${items.scrollHeight}px`;
  }

  private unsetHeight(items: HTMLElement): void {
    items.style.height = "";
  }
}
