<template>
  <div v-if="author || time" class="article-info">
    <!-- 作者 -->
    <span v-if="author">
      <AuthorIcon />
      <span v-text="author" />
    </span>

    <!-- 时间 -->
    <span v-if="time" class="time">
      <CalendarIcon />
      <span v-text="time" />
    </span>

    <CategoryInfo
      v-if="article.frontmatter.category"
      :category="article.frontmatter.category"
    />

    <TagInfo v-if="tags.length !== 0" :tags="tags" />

    <!-- 阅读时间 -->
    <span v-if="readtime" class="read-time-info">
      <TimeIcon />
      <span v-text="readtime" />
    </span>
  </div>
</template>

<script src="./ArticleInfo" />

<style lang="stylus">
$articleInfoTextSize ?= 14px

.article-info
  display flex
  justify-content flex-start
  align-content stretch
  align-items center
  flex-wrap wrap
  color var(--dark-grey)
  font-size $articleInfoTextSize

  & > span
    display flex
    align-items center
    flex-shrink 0
    margin-right 0.5em
    line-height 2

    @media (min-width $MQWide)
      font-size 1.1em

    @media (max-width $MQMobileNarrow)
      font-size 0.86rem

  .icon
    width 1em
    height 1em
    margin-right 0.25em
</style>
