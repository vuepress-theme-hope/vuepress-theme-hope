import Vue from "vue";
import MyTransition from "@theme/components/MyTransition.vue";
import NavLink from "@theme/components/Navbar/NavLink.vue";
import { navigate } from "@theme/utils/navigate";

interface ActionConfig {
  text: string;
  link: string;
}

export default Vue.extend({
  name: "Home",

  components: { MyTransition, NavLink },

  computed: {
    actionLinks(): ActionConfig[] {
      const { action } = this.$frontmatter;
      if (Array.isArray(action)) return action as ActionConfig[];
      return [action] as ActionConfig[];
    },
  },

  methods: {
    navigate(link: string): void {
      navigate(link, this.$router, this.$route);
    },
  },
});
