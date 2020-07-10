<template>
  <span v-if="time" class="time-info" :title="hint">
    <CalendarIcon />
    <span v-text="time" />
  </span>
</template>

<script src="./TimeInfo" />
