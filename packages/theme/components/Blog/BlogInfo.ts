import { Component, Vue } from "vue-property-decorator";
import BlogInfoList from "@theme/components/Blog/BlogInfoList.vue";
import BloggerInfo from "@theme/components/Blog/BloggerInfo.vue";
import MyTransition from "@theme/components/MyTransition.vue";

@Component({
  components: { BlogInfoList, BloggerInfo, MyTransition },
})
export default class BlogInfo extends Vue {}
