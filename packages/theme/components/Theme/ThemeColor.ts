import Vue from "vue";
import ClickOutside from "@theme/utils/click-outside";
import ThemeOptions from "@theme/components/Theme/ThemeOptions.vue";

export default Vue.extend({
  name: "ThemeColor",

  directives: { "click-outside": ClickOutside },

  components: { ThemeOptions },

  data: () => ({
    showMenu: false,
  }),

  methods: {
    clickOutside(): void {
      this.showMenu = false;
    },
  },
});
