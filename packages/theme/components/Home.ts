import { Component, Vue } from "vue-property-decorator";
import MyTransition from "@theme/components/MyTransition.vue";
import NavLink from "@theme/components/NavLink.vue";
import { navigate } from "@theme/util/navigate";

interface ActionConfig {
  text: string;
  link: string;
}

@Component({ components: { MyTransition, NavLink } })
export default class Home extends Vue {
  private get actionLinks(): ActionConfig[] {
    const { action } = this.$frontmatter;
    if (Array.isArray(action)) return action as ActionConfig[];
    return [action] as ActionConfig[];
  }

  private navigate(link: string): void {
    navigate(link, this.$router, this.$route);
  }
}
