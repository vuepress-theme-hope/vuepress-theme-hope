import { Component, Vue } from "vue-property-decorator";
import ArticleList from "@theme/components/Blog/ArticleList.vue";
import { capitalize } from "@mr-hope/vuepress-shared-utils";
import navigate from "@theme/util/navigate";

// eslint-disable-next-line @typescript-eslint/naming-convention
@Component({ components: { ArticleList } })
export default class CategoryList extends Vue {
  /** 大写首字母 */
  private capitalize = (name: string): string => capitalize(name);

  /** 点击分类的导航 */
  private clickCategory(path: string): void {
    navigate(path, this.$router, this.$route);
  }
}
