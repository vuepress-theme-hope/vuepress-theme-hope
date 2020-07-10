import { Component, Vue } from "vue-property-decorator";
import ArticleIcon from "@mr-hope/vuepress-shared-utils/icons/ArticleIcon.vue";
import BookIcon from "@mr-hope/vuepress-shared-utils/icons/BookIcon.vue";
import LinkIcon from "@mr-hope/vuepress-shared-utils/icons/LinkIcon.vue";
import ProjectIcon from "@mr-hope/vuepress-shared-utils/icons/ProjectIcon.vue";
import navigate from "@theme/util/navigate";

@Component({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  components: { ArticleIcon, BookIcon, LinkIcon, ProjectIcon },
})
export default class ProjectList extends Vue {
  private navigate(link: string): void {
    navigate(link, this.$router, this.$route);
  }
}
