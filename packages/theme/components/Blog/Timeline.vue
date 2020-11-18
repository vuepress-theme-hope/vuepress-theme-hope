<template>
  <div class="timeline-wrapper">
    <ul class="timeline-content">
      <MyTransition>
        <li class="desc">{{ hint }}</li>
      </MyTransition>
      <MyTransition
        v-for="(item, index) in $timeline"
        :key="index"
        :delay="0.08 * (index + 1)"
      >
        <li>
          <h3 class="year">{{ item.year }}</h3>
          <ul class="year-wrapper">
            <li
              v-for="(article, articleIndex) in item.articles"
              :key="articleIndex"
            >
              <span class="date">{{ article.frontmatter.parsedDate }}</span>
              <span class="title" @click="navigate(article.path)">
                {{ article.title }}
              </span>
            </li>
          </ul>
        </li>
      </MyTransition>
    </ul>
  </div>
</template>

<script src="./Timeline" />

<style lang="stylus">
.timeline-wrapper
  max-width 740px
  margin 0 auto
  padding 40px 0
  --dot-color #fff

  .theme-dark &
    --dot-color #505050

  .timeline-content
    box-sizing border-box
    position relative
    list-style none

    &::after
      content ' '
      position absolute
      top 14px
      left 0
      z-index -1
      width 4px
      height calc(100% - 38px)
      margin-left -2px
      background var(--border-color)

    .desc
      position relative
      color var(--text-color)
      font-size 18px

      @media (min-width $MQNormal)
        font-size 20px

      &:before
        content ' '
        position absolute
        z-index 2
        left -20px
        top 50%
        width 8px
        height 8px
        margin-left -4px
        margin-top -4px
        background var(--dot-color)
        border 1px solid var(--border-color)
        border-radius 50%

    .year
      position relative
      color var(--text-color)
      font-size 16px

      &:before
        content ' '
        position absolute
        z-index 2
        left -21px
        top 50%
        width 8px
        height 8px
        margin-left -4px
        margin-top -4px
        background var(--dot-color)
        border 2px solid var(--border-color)
        border-radius 50%

    .year
      margin 80px 0 0px
      color var(--text-color)
      font-size 26px
      font-weight 700

    .year-wrapper
      padding-left 0 !important

      li
        position relative
        display flex
        padding 30px 0 10px
        border-bottom 1px dashed var(--border-color)
        list-style none

        &:hover
          cursor pointer

          .date
            color var(--accent-color)

            &::before
              background var(--accent-color)
              border-color var(--dot-color)

          .title
            color var(--accent-color)

        .date
          width 40px
          font-size 12px
          line-height 30px

          &::before
            content ' '
            position absolute
            left -20px
            top 41px
            width 6px
            height 6px
            margin-left -4px
            background var(--dot-color)
            border-radius 50%
            border 2px solid var(--border-color)
            z-index 2

        .title
          font-size 16px
          line-height 30px

@media (max-width $MQMobile)
  .timeline-wrapper
    margin 0 1.2rem
</style>
D
