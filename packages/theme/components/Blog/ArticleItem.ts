import Vue, { PropType } from "vue";
import ArticleInfo from "@theme/components/Blog/ArticleInfo.vue";
import LockIcon from "@theme/icons/LockIcon.vue";
import { PageComputed } from "@mr-hope/vuepress-types";
import PresentationIcon from "@theme/icons/PresentationIcon.vue";
import StickyIcon from "@theme/icons/StickyIcon.vue";
import { getPathMatchedKeys } from "@theme/util/encrypt";

export default Vue.extend({
  name: "ArticleItem",

  components: { ArticleInfo, LockIcon, StickyIcon, PresentationIcon },

  props: {
    article: { type: Object as PropType<PageComputed>, required: true },
  },

  computed: {
    isEncrypted(): boolean {
      return (
        getPathMatchedKeys(this.$themeConfig.encrypt, this.article.path)
          .length !== 0 || Boolean(this.article.frontmatter.password)
      );
    },
  },
});
