<template>
  <div class="theme-options">
    <ul v-if="themeColorEnabled" class="themecolor-select">
      <label for="themecolor-select" v-text="`${text.themeColor}:`" />
      <li>
        <a class="default-theme" href="#" @click.prevent="setTheme()" />
      </li>
      <li v-for="color in themeColor.list" :key="color">
        <a
          :style="{ background: themeColor.picker[color] }"
          href="#"
          @click.prevent="setTheme(color)"
        />
      </li>
    </ul>
    <div v-if="switchEnabled" class="darkmode-toggle">
      <label class="desc" for="darkmode-toggle" v-text="`${text.themeMode}:`" />
      <DarkmodeSwitch />
      <ScreenFull />
    </div>
  </div>
</template>

<script src="./ThemeOptions" />

<style lang="stylus">
.theme-options
  font-size 14px

  .themecolor-select
    display flex
    justify-content space-around

    label
      padding-right 8px

    li
      &:first-child
        margin-right 8px

      a
        width 15px
        height 15px
        border-radius 2px
        margin 0 2px

        &.default-theme
          background-color $accentColor // must be fixed to the original accent-color

  .darkmode-toggle
    display flex
    align-items center
    margin-top 8px

    .desc
      line-height 1.5
      padding-right 8px
</style>
