<template>
  <span v-if="readtime" class="read-time-info" :title="hint">
    <TimeIcon />
    <span v-text="readtime" />
  </span>
</template>

<script src="./ReadingTimeInfo" />
