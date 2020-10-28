import { Component, Vue } from "vue-property-decorator";
import ArticleList from "@theme/components/Blog/ArticleList.vue";
import BlogHero from "@theme/components/Blog/BlogHero.vue";
import BlogInfo from "@BlogInfo";
import MyTransition from "@theme/components/MyTransition.vue";
import PageFooter from "@theme/components/PageFooter.vue";
import ProjectList from "@theme/components/Blog/ProjectList.vue";

@Component({
  components: {
    ArticleList,
    BlogHero,
    BlogInfo,
    MyTransition,
    PageFooter,
    ProjectList,
  },
})
export default class BlogHome extends Vue {}
