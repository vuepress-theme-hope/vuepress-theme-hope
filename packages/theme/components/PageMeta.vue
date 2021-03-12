<template>
  <footer class="page-meta">
    <div v-if="editLink" class="edit-link">
      <EditIcon />
      <a :href="editLink" target="_blank" rel="noopener noreferrer">{{
        editLinkText
      }}</a>
    </div>

    <div v-if="updateTime" class="meta-item update-time">
      <span class="label">{{ updateTimeText }}:</span>
      <span class="info">{{ updateTime }}</span>
    </div>

    <div
      v-if="contributors && contributors.length"
      class="meta-item contributors"
    >
      <span class="label">{{ contributorsText }}: </span>
      <span class="info">
        <template v-for="(contributor, index) in contributors">
          <!-- eslint-disable vue/no-v-for-template-key-on-child -->
          <span
            :key="index"
            class="contributor"
            :title="`email: ${contributor.email}`"
          >
            {{ contributor.name }}
          </span>
          <template v-if="index !== contributors.length - 1">, </template>
        </template>
      </span>
    </div>
  </footer>
</template>

<script src="./PageMeta" />

<style lang="stylus">
@require '~@mr-hope/vuepress-shared/styles/wrapper'

.page-meta
  @extend $wrapper
  padding-top 12px
  padding-bottom 12px
  font-family Arial, Helvetica, sans-serif
  overflow auto

  .meta-item
    .label
      font-weight 500
      color var(--text-color-l25)

    .info
      font-weight 400
      color var(--dark-grey)

  .edit-link
    display inline-block
    font-size 14px

    .icon
      position relative
      bottom -0.125em
      width 1em
      height 1em
      color var(--accent-color)

    @media (max-width $MQMobile)
      margin-bottom 8px

    a
      color var(--accent-color-l10)

  .update-time
    float right
    font-size 14px

    @media (max-width $MQMobile)
      float none
      font-size 13px
      text-align left

  .contributors
    font-size 14px
    text-align right

    @media (max-width $MQMobile)
      font-size 13px
      text-align left
</style>
