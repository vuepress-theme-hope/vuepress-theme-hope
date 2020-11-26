import Vue from "vue";

export default Vue.extend({
  name: "DropdownTransition",

  methods: {
    setHeight(items: HTMLElement): void {
      // explicitly set height so that it can be transitioned
      items.style.height = `${items.scrollHeight}px`;
    },

    unsetHeight(items: HTMLElement): void {
      items.style.height = "";
    },
  },
});
