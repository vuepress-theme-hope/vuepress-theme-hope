<template>
  <div class="page blog">
    <BlogHero v-if="$frontmatter.home" />

    <div class="blog-page-wrapper">
      <main class="blog-list">
        <MyTransition>
          <component :is="componentName" v-if="componentName" />
          <h1 v-else-if="!$frontmatter.home" class="article-title">
            {{ articleListText }}
          </h1>
        </MyTransition>

        <MyTransition :delay="0.16">
          <ProjectList v-if="$frontmatter.home" />
        </MyTransition>

        <!-- 文章列表 -->
        <MyTransition :delay="0.24">
          <ArticleList v-if="displayArticles" :key="$route.path" />
        </MyTransition>
      </main>

      <MyTransition :delay="0.16">
        <BlogInfo />
      </MyTransition>
    </div>

    <!-- Markdown 内容 -->
    <MyTransition :delay="0.28">
      <Content :key="$route.path" class="home-center" custom />
    </MyTransition>

    <!-- 页脚 -->
    <MyTransition :delay="0.32">
      <PageFooter :key="$route.path" />
    </MyTransition>
  </div>
</template>

<script src="./BlogPage" />

<style lang="stylus">
.page.blog
  min-height 100vh - $navbarHeight
  padding-top $navbarHeight
  margin 0px auto
  background-color var(--bgcolor-light)

  @media (max-width $MQMobile)
    padding-left 1.5rem
    padding-right 1.5rem

  @media (max-width $MQMobileNarrow)
    padding-left 0
    padding-right 0

  .blog-page-wrapper
    display flex
    justify-content center
    align-items flex-start
    margin 0 auto

    @media (min-width $MQMobile)
      padding 0 1rem

    @media (min-width $MQNarrow)
      padding 0 2rem

    @media (min-width $MQWide)
      padding 0

    .blog-list
      max-width 780px
      flex 1

      @media (min-width $MQMobile)
        margin 0 15px

      .article-title
        font-size 1.8rem
        margin 10px 15px
</style>
