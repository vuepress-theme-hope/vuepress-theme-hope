<template>
  <div id="install-modal-wrapper">
    <div class="background" @click="$emit('toogle', false)" />

    <div class="install-modal">
      <div class="header">
        <button
          class="close-button"
          :aria-label="i18n.close"
          @click="$emit('toogle', false)"
        >
          <CloseIcon />
        </button>
        <div class="logo">
          <img
            v-if="manifest.icons"
            :src="manifest.icons[0].src"
            alt="App Logo"
          />
          <div class="title">
            <h1>{{ manifest.short_name || manifest.name }}</h1>
            <p class="desc">{{ i18n.explain }}</p>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="highlight">
          <div v-if="manifest.features" class="feature-wrapper">
            <h3>{{ i18n.feature }}</h3>
            <ul v-if="manifest.features">
              <li
                v-for="feature in manifest.features"
                :key="feature"
                v-text="feature"
              />
            </ul>
          </div>

          <div v-if="manifest.screenshots" class="screenshot-wrapper">
            <button :aria-label="i18n.prevImage" @click="scrollToLeft">
              <ArrowLeftIcon />
            </button>
            <section class="screenshot">
              <div
                v-for="screenshot in manifest.screenshots"
                :key="screenshot.src"
              >
                <img alt="App Screenshot" :src="screenshot.src" />
              </div>
            </section>
            <button :aria-label="i18n.nextImage" @click="scrollToRight">
              <ArrowRightIcon />
            </button>
          </div>
        </div>
        <div class="description">
          <h3 v-text="i18n.desc" />
          <p v-text="manifest.description" />
        </div>
      </div>

      <div v-if="useHint" class="ios-text" @click="hint">
        <p>{{ i18n.iOSInstall }}</p>
        <button class="success">Got it!</button>
      </div>
      <div v-else class="button-wrapper">
        <button class="install-button" @click="install">
          {{ i18n.install }} <span>{{ manifest.short_name }}</span>
        </button>
        <button class="cancel-button" @click="$emit('toogle', false)">
          {{ i18n.cancel }}
        </button>
      </div>
    </div>
  </div>
</template>

<script src="./PWAInstallModal" />

<style lang="stylus">
@require '~@mr-hope/vuepress-shared/styles/reset'

@keyframes opened
  from
    transform scale(0.8, 0.8)
    opacity 0.4

  to
    transform scale(1, 1)
    opacity 1

@keyframes mobile
  from
    opacity 0.6

  to
    opacity 1

@keyframes fadein
  from
    opacity 0.2

  to
    opacity 1

#install-modal-wrapper
  display flex
  justify-content center
  align-items center
  width 100vw
  height 100vh
  position fixed
  top 0
  left 0
  overflow auto
  z-index 997

  button
    button()
    outline none

  .background
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    backdrop-filter blur(10px)
    z-index 998
    animation 0.25s fadein

  .install-modal
    display flex
    flex-direction column
    position absolute
    z-index 999
    max-width 56em
    border-radius 10px
    background var(--bgcolor, #fff)
    font-family sans-serif
    animation 0.15s opened

    @media (max-width $MQNormal)
      width 92%
      animation 0.25s mobile

    @media (max-width $MQMobileNarrow)
      max-height 80%
      overflow-y scroll

      &::-webkit-scrollbar
        display none

  .header
    margin 40px 40px 32px

    @media (max-width $MQNarrow)
      margin-bottom 24px

    @media (max-width $MQMobile)
      margin 20px

    .close-button
      float right
      color var(--grey3, #333)

      &:hover, &:focus
        color var(--dark-grey, #666)

    .logo
      display flex

    h1
      margin-top 0
      margin-bottom 7px
      color var(--dark-gery, #666)
      font-size 34px

      @media (max-width $MQNarrow)
        margin-bottom 0

      @media (max-width $MQMobileNarrow)
        font-size 26px

    img
      width 122px
      height 122px
      margin-right 24px
      padding 12px
      border-radius 24px
      background #eee

      .theme-dark &
        background #444

      @media (max-width $MQNarrow)
        width 60px
        height 60px

      @media (max-width $MQMobile)
        margin-right 12px
        padding 8px

      @media (max-width $MQMobileNarrow)
        width 40px
        height 40px
        padding 6px

    .desc
      max-width 40em
      color var(--grey, #888)
      font-size 14px
      text-overflow ellipsis
      white-space pre-wrap
      overflow hidden

      @media (max-width $MQNarrow)
        display none

  .content
    margin 0 40px
    color var(--grey3, #333)
    flex 1

    @media (max-width $MQMobile)
      margin 0 20px

    h3
      font-size 22px
      margin-bottom 12px

    p
      font-size 14px

  .highlight
    display flex
    justify-content space-around
    align-items center
    margin-right 20px

    @media (max-width $MQMobile)
      flex-direction column
      align-items flex-start
      margin-right 0px

    h3
      margin-top 0px
      font-size 22px
      font-weight 600
      line-height 225%

      @media (max-width $MQMobileNarrow)
        margin-bottom 0px
        font-size 18px

  .feature-wrapper
    padding-right 2em
    overflow hidden

    ul
      padding-inline-start 22px
      margin-block-start 12px

      @media (max-width $MQMobileNarrow)
        margin-top 0px

    li
      font-size 16px
      font-weight 600
      line-height 29px
      color var(--dark-grey, #666)

  .screenshot-wrapper
    max-width 30em
    max-height 220px
    display flex

    @media (max-width $MQMobile)
      width 100%

    button
      width 4em
      transition background 0.2s

      &:hover, &:focus
        background #bbb

      svg
        width 28px
        fill #6b6969

  .screenshot
    width 22em
    max-height 220px
    display flex
    flex-wrap wrap
    flex-direction column
    overflow-x scroll
    -webkit-overflow-scrolling touch
    scroll-snap-type x mandatory

    @media (max-width $MQNormal)
      justify-content center

    &::-webkit-scrollbar
      display none

    div
      display flex
      justify-content center
      align-items center
      width 100%
      height 14em
      background #efefef
      scroll-snap-align start

    img
      height 100%
      object-fit contain

      @media (max-width $MQMobile)
        height 180px

  .description
    margin-bottom 3em

  .button-wrapper
    width 100%
    text-align right
    padding 1rem 0

    @media (max-width $MQMobile)
      text-align center

  .install-button, .cancel-button
    display inline-block
    flex 0 0 auto
    min-width 80px
    margin 0.5rem 1rem
    padding 0.5rem 1rem
    border solid 2px var(--accent-color, $accentColor)
    border-radius 20px
    font-size 14px
    font-weight 600

  .install-button
    background var(--accent-color, $accentColor)
    color var(--white, #fff)

    &:hover, &:focus
      background var(--accent-color-l10, $accentColor)

    @media (max-width $MQMobileNarrow)
      span
        display none

  .cancel-button
    background transparent
    color var(--accent-color, $accentColor)

    &:hover, &:focus
      background var(--accent-color-l10, $accentColor)
      color var(--white, #fff)

  .ios-text
    position fixed
    bottom 0
    box-sizing border-box
    width 92%
    margin 2em auto
    padding 0.5em 2em
    border-radius 8px
    background var(--white, #fff)
    text-align center
    font-size 14px
    font-weight bold
    box-shadow 0 2px 12px 0 var(--card-shadow-color, rgba(0, 0, 0, 0.15))

    &::after
      content ' '
      position absolute
      left calc(50% - 0.8em)
      bottom -1em
      width 0
      height 0
      border-top 1em solid var(--white, #fff)
      border-left 0.8em solid transparent
      border-right 0.8em solid transparent

    p
      margin 0 0 0.5em

    .success
      padding 0.5em 1em
      margin-bottom 0.5em
      background #07c160
      color var(--white, #fff)
      border none
      border-radius 1em
</style>
