<template>
  <div v-if="author || time" class="article-info">
    <!-- 作者 -->
    <template v-if="author">
      <AuthorIcon />
      <span v-text="author" />
    </template>

    <!-- 时间 -->
    <template v-if="time">
      <TimeIcon />
      <span v-text="time" />
    </template>

    <!-- 分类 -->
    <template v-if="category">
      <CategoryIcon />
      <span v-text="category" />
    </template>

    <!-- 标签 -->
    <template v-if="tag">
      <TagIcon />
      <span v-if="typeof tag === 'string'">{{tag}}</span>
      <span v-else>
        <template v-for="item in tag">{{item}}&nbsp;</template>
      </span>
    </template>
  </div>
</template>
<script lang="ts">
import * as moment from 'moment';
import { Component, Prop, Vue } from 'vue-property-decorator';
import AuthorIcon from '@mr-hope/vuepress-shared-utils/icons/AuthorIcon.vue';
import CategoryIcon from '@mr-hope/vuepress-shared-utils/icons/CategoryIcon.vue';
import { PageComputed } from 'vuepress-types';
import TagIcon from '@mr-hope/vuepress-shared-utils/icons/TagIcon.vue';
import TimeIcon from '@mr-hope/vuepress-shared-utils/icons/TimeIcon.vue';
import { capitalize } from '@mr-hope/vuepress-shared-utils';

@Component({ components: { AuthorIcon, CategoryIcon, TagIcon, TimeIcon } })
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

    if (Array.isArray(tag)) return tag.map(item => capitalize(item));

    return '';
  }
}
</script>
<style lang="stylus">
.article-info
  color desaturate(lighten($textColor, 25%), 25%)
  display flex
  align-items center
  font-size 15px
  color #888

  .icon
    width 16px
    height 16px
    margin 0 6px 0 10px

    &:first-child
      margin-left 0
</style>
