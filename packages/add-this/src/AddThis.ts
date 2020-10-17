import { Component, Vue } from "vue-property-decorator";

@Component
export default class AddThis extends Vue {
  private pubid = PUB_ID;

  private get addthisLink(): string {
    return `//s7.addthis.com/js/300/addthis_widget.js#pubid=${this.pubid}`;
  }

  private mounted(): void {
    if (this.pubid) {
      const script = document.createElement("script");

      script.src = this.addthisLink;
      document.getElementsByTagName("body")[0].appendChild(script);
    } else
      console.error("[AddThis]: Please provide a pubid to let plugin work");
  }
}
