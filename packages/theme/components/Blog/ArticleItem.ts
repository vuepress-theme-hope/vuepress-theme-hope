import { Component, Prop, Vue } from "vue-property-decorator";
import ArticleInfo from "@theme/components/Blog/ArticleInfo.vue";
import LockIcon from "@theme/icons/LockIcon.vue";
import { PageComputed } from "@mr-hope/vuepress-types";
import PresentationIcon from "@theme/icons/PresentationIcon.vue";
import StickyIcon from "@theme/icons/StickyIcon.vue";
import { getPathMatchedKeys } from "@theme/util/encrypt";

@Component({
  components: { ArticleInfo, LockIcon, StickyIcon, PresentationIcon },
})
export default class ArticleItem extends Vue {
  @Prop({ type: Object, required: true })
  private readonly article!: PageComputed;

  private get isEncrypted(): boolean {
    return (
      getPathMatchedKeys(this.$themeConfig.encrypt, this.article.path)
        .length !== 0 || Boolean(this.article.frontmatter.password)
    );
  }
}
