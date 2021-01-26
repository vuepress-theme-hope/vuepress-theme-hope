<template>
  <div id="article-list" class="article-wrapper">
    <h2 v-if="!articles.length" class="empty">暂无文章</h2>

    <MyTransition
      v-for="(article, index) in articles"
      :key="article.path"
      :delay="index * 0.04"
    >
      <ArticleItem :article="article" />
    </MyTransition>

    <Pagination
      v-model="currentPage"
      :per-page="articlePerPage"
      :total="articleList.length"
    />
  </div>
</template>

<script src="./ArticleList" />

<style lang="stylus">
.article-list
  margin-top -0.5rem - $navbarHeight
  padding-top $navbarHeight + 0.5rem

  @media (max-width $MQMobile)
    margin-top -0.5rem - $navbarMobileHeight
    padding-top $navbarMobileHeight + 0.5rem

  .empty
    margin 20px auto
</style>
