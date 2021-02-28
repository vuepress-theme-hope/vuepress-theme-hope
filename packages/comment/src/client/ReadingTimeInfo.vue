<template>
  <span
    v-if="readtime"
    class="reading-time-info"
    :aria-label="hint"
    data-balloon-pos="down"
  >
    <TimeIcon />
    <span v-text="readtime" />
  </span>
</template>

<script src="./ReadingTimeInfo" />
