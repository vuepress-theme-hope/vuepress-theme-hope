<template>
  <Common :sidebar="false">
    <template #sidebar-bottom>
      <BlogInfo />
    </template>

    <Password
      v-if="currentPathEncrypted && !globalEncrypted"
      @password-verify="setPassword"
    />
    <div v-else class="page blog">
      <div class="blog-page-wrapper">
        <BlogPage />

        <MyTransition :delay="0.16">
          <BlogInfo />
        </MyTransition>
      </div>

      <!-- 页脚 -->
      <MyTransition :delay="0.28">
        <PageFooter :key="$route.path" />
      </MyTransition>
    </div>
  </Common>
</template>

<script src="./Blog" />

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
</style>
