<template>
  <div v-if="author || time" class="article-info">
    <!-- 作者 -->
    <span v-if="author">
      <AuthorIcon />
      <span v-text="author" />
    </span>

    <!-- 时间 -->
    <span v-if="time">
      <TimeIcon />
      <span v-text="time" />
    </span>

    <!-- 分类 -->
    <span v-if="category" class="category" @click="navigate">
      <CategoryIcon />
      <span v-text="category" />
    </span>

    <!-- 标签 -->
    <span v-if="tags">
      <TagIcon />
      <Tags :tags="tags" />
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
import navigate from '@theme/util/navigate';

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
  private get tags() {
    const { tag, tags = tag } = this.article.frontmatter;

    if (typeof tags === 'string') return [capitalize(tags)];

    if (Array.isArray(tags)) return tags.map((item) => capitalize(item));

    return [];
  }

  private navigate() {
    navigate(
      `/category/${this.article.frontmatter.category}/`,
      this.$router,
      this.$route
    );
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

  & > span
    display flex
    align-items center
    margin-right 8px

    &.category:hover
      cursor pointer
</style>
