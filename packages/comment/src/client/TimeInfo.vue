<template>
  <span
    v-if="time"
    class="time-info"
    :aria-label="hint"
    data-balloon-pos="down"
  >
    <CalendarIcon />
    <span property="datePublished" v-text="time" />
  </span>
</template>

<script src="./TimeInfo" />
