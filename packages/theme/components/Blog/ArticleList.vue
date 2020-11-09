<template>
  <div id="article" class="article-wrapper">
    <MyTransition
      v-for="(article, index) in articles"
      :key="article.path"
      :delay="index * 0.04"
    >
      <ArticleItem :article="article" />
    </MyTransition>
    <!-- 分页 -->
    <Pagination
      v-model="currentPage"
      :per-page="articlePerPage"
      :total="articleList.length"
    />
  </div>
</template>

<script src="./ArticleList" />

<style lang="stylus">
.article-wrapper
  margin-top -0.5rem - $navbarHeight
  padding-top $navbarHeight + 0.5rem

  @media (max-width $MQMobile)
    margin-top -0.5rem - $navbarMobileHeight
    padding-top $navbarMobileHeight + 0.5rem
</style>
