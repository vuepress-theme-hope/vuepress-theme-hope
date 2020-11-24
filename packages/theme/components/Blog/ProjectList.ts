import { Component, Vue } from "vue-property-decorator";
import ArticleIcon from "@theme/icons/ArticleIcon.vue";
import BookIcon from "@theme/icons/BookIcon.vue";
import LinkIcon from "@theme/icons/LinkIcon.vue";
import ProjectIcon from "@theme/icons/ProjectIcon.vue";
import { navigate } from "@theme/util/navigate";

@Component({
  components: { ArticleIcon, BookIcon, LinkIcon, ProjectIcon },
})
export default class ProjectList extends Vue {
  private navigate(link: string): void {
    navigate(link, this.$router, this.$route);
  }
}
