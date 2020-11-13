import { Component, Vue } from "vue-property-decorator";
import { capitalize } from "@mr-hope/vuepress-shared-utils";
import { navigate } from "@theme/util/navigate";

@Component
export default class CategoryList extends Vue {
  private capitalize = (name: string): string => capitalize(name);

  private clickCategory(path: string): void {
    navigate(path, this.$router, this.$route);
  }
}
