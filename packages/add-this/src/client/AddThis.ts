import Vue from "vue";

export default Vue.extend({
  name: "AddThis",

  data: () => ({
    pubid: PUB_ID,
  }),

  computed: {
    addthisLink(): string {
      return `//s7.addthis.com/js/300/addthis_widget.js#pubid=${this.pubid}`;
    },
  },

  mounted(): void {
    if (this.pubid) {
      const script = document.createElement("script");

      script.src = this.addthisLink;
      document.getElementsByTagName("body")[0].appendChild(script);
    } else
      console.error("[AddThis]: Please provide a pubid to let plugin work");
  },

  render(h) {
    return h("div", { class: "add-this" });
  },
});
