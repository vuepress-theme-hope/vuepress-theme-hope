<template>
  <span
    v-if="time"
    class="time-info"
    :aria-label="hint"
    data-balloon-pos="down"
  >
    <CalendarIcon />
    <span v-text="time" />
  </span>
</template>

<script src="./TimeInfo" />
