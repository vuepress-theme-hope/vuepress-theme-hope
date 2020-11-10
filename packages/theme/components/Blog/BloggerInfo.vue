<template>
  <div class="blogger-info-wrapper">
    <div class="blogger-info">
      <div class="blogger-wrapper">
        <div
          class="blogger"
          :class="{ hasIntro }"
          :aria-label="hasIntro ? i18n.intro : ''"
          :data-balloon-pos="hasIntro ? 'down' : ''"
          @click="jumpIntro"
        >
          <img
            v-if="bloggerAvatar"
            class="avatar"
            alt="blogger-avatar"
            :src="$withBase(bloggerAvatar)"
          />
          <div v-if="bloggerName" class="name" v-text="bloggerName" />
        </div>
      </div>
      <div class="num-wrapper">
        <div @click="navigate('/article/')">
          <div class="num">{{ articleNumber }}</div>
          <div>{{ i18n.article }}</div>
        </div>
        <div @click="navigate('/category/')">
          <div class="num">{{ $category.list.length }}</div>
          <div>{{ i18n.category }}</div>
        </div>
        <div @click="navigate('/tag/')">
          <div class="num">{{ $tag.list.length }}</div>
          <div>{{ i18n.tag }}</div>
        </div>
        <div @click="navigate('/timeline/')">
          <div class="num">{{ $timelineItems.length }}</div>
          <div>{{ i18n.timeline }}</div>
        </div>
      </div>
    </div>
    <MediaLinks class="bottom-media-link" />
  </div>
</template>

<script src="./BloggerInfo" />

<style lang="stylus">
.blogger-info-wrapper
  .page &
    background var(--bgcolor)

  .blogger-info
    .blogger-wrapper
      padding 8px 0
      text-align center

      .blogger
        display inline-block

        &.hasIntro
          cursor pointer

        .name
          margin 16px auto
          font-size 22px

        .avatar
          display block
          width 128px
          height 128px
          border-radius 50%

    .num-wrapper
      display flex
      margin 0 auto 16px
      width 80%

      > div
        width 25%
        text-align center
        font-size 13px
        cursor pointer

        &:hover
          color var(--accent-color)

        .num
          position relative
          margin-bottom 8px
          font-weight 600
          font-size 20px

  .bottom-media-link
    display flex
</style>
