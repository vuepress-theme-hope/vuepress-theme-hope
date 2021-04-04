<template>
  <span
    v-if="enableVisitor"
    class="visitor-info"
    :aria-label="hint"
    data-balloon-pos="down"
  >
    <EyeIcon v-if="count < 1000" />
    <FireIcon v-else />
    <span
      :id="visitorID"
      :data-flag-title="$page.title"
      class="leancloud_visitors"
    >
      <span class="leancloud-visitors-count">...</span>
    </span>
  </span>
</template>

<script src="./VisitorInfo" />
