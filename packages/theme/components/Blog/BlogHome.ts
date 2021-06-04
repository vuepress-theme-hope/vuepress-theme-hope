import Vue from "vue";
import ArticleList from "@theme/components/Blog/ArticleList.vue";
import BlogHero from "@theme/components/Blog/BlogHero.vue";
import BlogInfo from "@BlogInfo";
import MyTransition from "@theme/components/MyTransition.vue";
import ProjectList from "@theme/components/Blog/ProjectList.vue";

/**
 * 项目配置
 *
 * Project Configuration
 */
export interface ProjectOptions {
  /**
   * 项目类型
   *
   * Type of project
   */
  type: "article" | "book" | "link" | "project";
  /**
   * 项目名称
   *
   * Project name
   */
  name: string;
  /**
   * 项目描述
   *
   * Project desription
   */
  desc?: string;
  /**
   * 项目封面，应为绝对路径
   *
   * Cover for the project, must be an absolute path
   */
  cover?: string;
  /**
   * 项目链接
   *
   * Link of the project
   */
  link: string;
}

export default Vue.extend({
  name: "BlogHome",

  components: {
    ArticleList,
    BlogHero,
    BlogInfo,
    MyTransition,
    ProjectList,
  },
});
