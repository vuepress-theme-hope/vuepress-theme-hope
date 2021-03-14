<template>
  <span
    v-if="text"
    class="reading-time-info"
    :aria-label="hint"
    data-balloon-pos="down"
  >
    <TimerIcon />
    <span v-text="text" />
    <meta property="timeRequired" :content="readingTime" />
  </span>
</template>

<script src="./ReadingTimeInfo" />
