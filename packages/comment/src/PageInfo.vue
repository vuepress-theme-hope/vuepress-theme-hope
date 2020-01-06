<!--
 * @Author: Mr.Hope
 * @Date: 2019-10-10 09:51:24
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-22 20:08:19
 * @Description: 页面信息
-->
<template>
  <div class="page-title">
    <h1>{{ $page.title }}</h1>
    <div v-if="author||visitor" class="page-info">
      <svg v-if="author" class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M649.6 633.6c86.4-48 147.2-144 147.2-249.6 0-160-128-288-288-288s-288 128-288 288c0 108.8
          57.6 201.6 147.2 249.6-121.6 48-214.4 153.6-240 288-3.2 9.6 0 19.2 6.4 25.6 3.2 9.6 12.8 12.8
          22.4 12.8h704c9.6 0 19.2-3.2 25.6-12.8 6.4-6.4 9.6-16 6.4-25.6-25.6-134.4-121.6-240-243.2-288z"
          fill="currentColor"
        />
      </svg>
      <span v-if="author" v-text="author" />
      <svg v-if="visitor" class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <path
          v-if="count < 1000"
          d="M992 512.096c0-5.76-0.992-10.592-1.28-11.136-0.192-2.88-1.152-8.064-2.08-10.816-0.256-0.672-0.544-1.376-0.832-2.08-0.48-1.568-1.024-3.104-1.6-4.32C897.664 290.112 707.104 160 512 160 316.928 160 126.368
            290.016 38.24 482.592c-1.056 2.112-1.792 4.096-2.272 5.856-0.224 0.544-0.448 1.088-0.64
            1.6-1.76 5.088-1.792 8.64-1.632 7.744-0.832 3.744-1.568 11.168-1.568 11.168-0.224 2.272-0.224
            4.032 0.032 6.304 0 0 0.736 6.464 1.088 7.808 0.128 1.824 0.576 4.512 1.12 6.976l-0.032 0c0.448
            2.08 1.12 4.096 1.984 6.08 0.48 1.536 0.992 2.976 1.472 4.032C126.432 733.856 316.992 864 512
            864c195.136 0 385.696-130.048 473.216-321.696 1.376-2.496 2.24-4.832 2.848-6.912 0.256-0.608
            0.48-1.184 0.672-1.728 1.536-4.48 1.856-8.32 1.728-8.32 0 0 0 0-0.032 0.032C991.04 522.272 992
            517.632 992 512.096zM512 672c-88.224 0-160-71.776-160-160s71.776-160 160-160 160 71.776 160
            160S600.224 672 512 672z"
          fill="currentColor"
        />
        <path
          v-else
          d="M726.4 201.6c-12.8-9.6-28.8-6.4-38.4 0-9.6 9.6-16 25.6-9.6 38.4 6.4 12.8 9.6 28.8 12.8
            44.8-86.4-201.6-230.4-246.4-236.8-249.6-9.6-3.2-22.4 0-28.8 6.4-9.6 6.4-12.8 19.2-9.6 28.8
            12.8 86.4-25.6 188.8-115.2 310.4-6.4-25.6-16-51.2-32-80-9.6-9.6-22.4-16-35.2-12.8-16 3.2-25.6
            12.8-25.6 28.8-3.2 48-25.6 92.8-51.2 140.8-22.4 41.6-44.8 86.4-54.4 134.4-32 150.4 99.2
            329.6 233.6 380.8 9.6 3.2 19.2 6.4 32 9.6-25.6-19.2-41.6-51.2-48-96-25.6-195.2 185.6-246.4
            195.2-425.6 153.6 105.6 224 336 137.6 505.6 3.2 0 6.4-3.2 9.6-3.2 0 0 3.2 0 3.2-3.2 163.2-89.6
            252.8-208 259.2-345.6 16-211.2-163.2-390.4-198.4-412.8z"
          fill="currentColor"
        />
      </svg>
      <span
        v-if="visitor"
        :id="visitorID"
        :data-flag-title="$page.title"
        class="leancloud_visitors"
      >
        <span :style="numStyle" class="leancloud-visitors-count">...</span>
      </span>
      <svg v-if="time" class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M511.99730176 70.56849042c-243.79770498 0-441.42881133 197.63290459-441.42881133 441.43420783 0 243.79770498 197.63110635 441.42881133 441.42881133 441.42881132s441.43420781-197.63110635 441.43420781-441.42881133C953.43150958 268.20589238 755.79500674 70.56849042 511.99730176 70.56849042L511.99730176 70.56849042zM662.15499453 679.66072578l-15.60531972 15.60981623c-8.62065527 8.61525878-22.59538066 8.61525878-31.21513594-2e-8L472.19658682 552.12629434c-4.95024346-4.94394786-4.33955742-14.88850576-4.33955742-24.67746827L467.85702852 247.14037461c0-12.18943565 9.8816001-22.07013662 22.07013661-22.07013662l22.07013663 0c12.18943565 0 22.07013662 9.8816001 22.07013662 22.07013662l0 273.2176582 128.08755703 128.08755704C670.77564981 657.06534599 670.77564981 671.04097051 662.15499453 679.66072578L662.15499453 679.66072578zM662.15499453 679.66072578"
          fill="currentColor"
        />
      </svg>
      <span v-if="time" v-text="time" />
    </div>
  </div>
</template>

<script>
/* global COMMENT_OPTIONS */
export default {
  name: 'PageInfo',

  data: () => ({
    valineConfig: COMMENT_OPTIONS,
    numStyle: { color: '#999' },
    count: 0
  }),

  computed: {
    /** 是否启用 Valine */
    valineEnable() {
      const { valineConfig } = this;

      return (
        valineConfig &&
        valineConfig.type === 'valine' &&
        valineConfig.appId &&
        valineConfig.appKey
      );
    },

    /** 作者 */
    author() {
      const { author } = this.$frontmatter;

      return author || (author === false ? '' : this.valineConfig.author || '');
    },

    /** 访问量 */
    visitor() {
      if (!this.valineEnable) return false;
      const globalEnable = this.valineConfig.visitor !== false;
      const pageConfig = this.$frontmatter.visitor;

      return (
        (globalEnable && pageConfig !== false) ||
        (!globalEnable && pageConfig === true)
      );
    },

    /** 访客标识符，使用当前网页路径 */
    visitorID() {
      const { base } = this.$site;

      return `${base.slice(0, base.length - 1)}${this.$page.path}`;
    },

    /** 发表时间 */
    time() {
      const { time } = this.$frontmatter;

      if (time) {
        if (time.indexOf('T') !== -1) {
          const [date, temp] = time.split('T');
          const [moment] = temp.split('.');

          return `${date} ${moment === '00:00:00' ? '' : moment}`;
        }

        return time;
      }

      return '';
    }
  },

  watch: {
    $route(to, from) {
      if (to.path !== from.path && this.valineEnable)
        setTimeout(() => {
          this.getCount();
        }, 500);
    }
  },

  mounted() {
    if (this.valineEnable)
      setTimeout(() => {
        this.getCount();
      }, 1500);
  },

  methods: {
    // 获得评论并根据数量显示火热图标
    getCount() {
      const countElement = document.querySelector(
        '.leancloud_visitors .leancloud-visitors-count'
      );

      if (countElement) {
        const count = countElement.textContent;

        if (count && !isNaN(Number(count))) this.count = count;
      } else
        setTimeout(() => {
          this.getCount();
        }, 500);
    }
  }
};
</script>

<style lang="stylus">
@require '~@vuepress/theme-default/styles/wrapper.styl'

.page
  .page-title
    @extend $wrapper
    padding-bottom 0

  .page-title + .theme-default-content:not(.custom)
    padding-top 0

  .page-info
    color desaturate(lighten($textColor, 25%), 25%)
    display flex
    align-items center
    font-size 15px
    color #777

    .icon
      width 16px
      height 16px
      margin 0 6px 0 10px

      &:first-child
        margin-left 0

      h1
        margin-top -3.1rem !important
        padding-top 4.6rem !important
        margin-bottom 1rem

  .theme-default-content:not(.custom) h1:first-child
    display none
</style>
