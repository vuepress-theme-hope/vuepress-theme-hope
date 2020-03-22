<template>
  <div v-if="author || time" class="article-info">
    <!-- 作者 -->
    <span v-if="author" class="info-item">
      <AuthorIcon />
      <span v-text="author" />
    </span>

    <!-- 时间 -->
    <span v-if="time" class="info-item">
      <TimeIcon />
      <span v-text="time" />
    </span>

    <!-- 分类 -->
    <span v-if="category" class="info-item">
      <CategoryIcon />
      <span v-text="category" />
    </span>

    <!-- 标签 -->
    <span v-if="tag" class="info-item">
      <TagIcon />
      <Tags :tags="typeof tag === 'string'? [tag]: tag" />
    </span>
  </div>
</template>
<script lang="ts">
import * as moment from 'moment';
import { Component, Prop, Vue } from 'vue-property-decorator';
import AuthorIcon from '@mr-hope/vuepress-shared-utils/icons/AuthorIcon.vue';
import CategoryIcon from '@mr-hope/vuepress-shared-utils/icons/CategoryIcon.vue';
import { PageComputed } from 'vuepress-types';
import TagIcon from '@mr-hope/vuepress-shared-utils/icons/TagIcon.vue';
import Tags from '@mr-hope/vuepress-plugin-comment/src/Tags.vue';
import TimeIcon from '@mr-hope/vuepress-shared-utils/icons/TimeIcon.vue';
import { capitalize } from '@mr-hope/vuepress-shared-utils';

@Component({
  components: { AuthorIcon, CategoryIcon, TagIcon, Tags, TimeIcon }
})
export default class ArticleInfo extends Vue {
  @Prop(Object) private readonly article!: PageComputed;

  /** 作者 */
  private get author() {
    return this.article.frontmatter.author || this.$themeConfig.author || '';
  }

  /** 发表时间 */
  private get time() {
    const { time } = this.article.frontmatter;

    if (time) {
      if (time.indexOf('T') !== -1) {
        const [date, temp] = time.split('T');
        const [times] = temp.split('.');

        return `${date} ${times === '00:00:00' ? '' : times}`;
      }

      return time;
    }

    const { lastUpdated } = this.article;

    if (lastUpdated) {
      const times = lastUpdated.split(' ');

      times.pop();

      return times.join(' ');
    }

    return '';
  }

  /** 分类 */
  private get category() {
    const { category } = this.article.frontmatter;

    return category ? capitalize(category) : '';
  }

  /** 标签 */
  private get tag() {
    const { tags, tag = tags } = this.article.frontmatter;

    if (typeof tag === 'string') return capitalize(tag);

    if (Array.isArray(tag)) return tag.map((item) => capitalize(item));

    return '';
  }
}
</script>
<style lang="stylus">
.article-info
  display flex
  align-items center
  font-size 15px
  color #888
  flex-wrap wrap
  justify-content flex-start
  align-content stretch

  .icon
    width 16px
    height 16px
    margin-right 4px

  .info-item
    display flex
    align-items center
    margin-right 8px
</style>
