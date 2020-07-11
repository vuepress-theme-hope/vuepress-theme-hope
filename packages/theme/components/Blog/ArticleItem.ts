import { Component, Prop, Vue } from "vue-property-decorator";
import ArticleInfo from "@theme/components/Blog/ArticleInfo.vue";
import LockIcon from "@mr-hope/vuepress-shared-utils/icons/LockIcon.vue";
import { PageComputed } from "@mr-hope/vuepress-types";
import StickyIcon from "@mr-hope/vuepress-shared-utils/icons/StickyIcon.vue";
import { pathHitKeys } from "@theme/util/encrypt";

// eslint-disable-next-line @typescript-eslint/naming-convention
@Component({ components: { ArticleInfo, LockIcon, StickyIcon } })
export default class ArticleItem extends Vue {
  @Prop({ type: Object, required: true })
  private readonly article!: PageComputed;

  /** 文章是否加密 */
  private get isEncrypted(): boolean {
    return (
      pathHitKeys(this.$themeConfig.encrypt, this.article.path).length !== 0 ||
      Boolean(this.article.frontmatter.password)
    );
  }
}
