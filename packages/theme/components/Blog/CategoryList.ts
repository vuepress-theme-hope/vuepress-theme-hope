import Vue from "vue";
import { capitalize } from "@mr-hope/vuepress-shared";
import { navigate } from "@theme/util/navigate";

export default Vue.extend({
  name: "CategoryList",

  methods: {
    capitalize,

    clickCategory(path: string): void {
      navigate(path, this.$router, this.$route);
    },
  },
});
