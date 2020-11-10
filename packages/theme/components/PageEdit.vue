<template>
  <footer class="page-edit">
    <div v-if="editLink" class="edit-link">
      <a :href="editLink" target="_blank" rel="noopener noreferrer">{{
        editLinkText
      }}</a>
      <OutboundLink />
    </div>

    <div v-if="lastUpdated" class="last-updated">
      <span class="prefix">{{ lastUpdatedText }}:</span>
      <span class="time">{{ lastUpdated }}</span>
    </div>
  </footer>
</template>

<script src="./PageEdit" />

<style lang="stylus">
@require '~@theme/styles/wrapper.styl'

.page-edit
  @extend $wrapper
  padding-top 12px
  padding-bottom 12px
  font-family Arial, Helvetica, sans-serif
  overflow auto

  .edit-link
    display inline-block
    font-size 14px

    a
      color var(--accent-color-l10)

  .last-updated
    float right
    font-size 14px

    .prefix
      font-weight 500
      color var(--text-color-l25)

    .time
      font-weight 400
      color var(--dark-grey)

@media (max-width $MQMobile)
  .page-edit
    .edit-link
      margin-bottom 8px

    .last-updated
      float none
      font-size 13px
      text-align left
</style>
