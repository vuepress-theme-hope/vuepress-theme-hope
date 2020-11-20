<template>
  <span
    v-if="words"
    class="words-info"
    :aria-label="hint"
    data-balloon-pos="down"
  >
    <WordIcon />
    <span v-text="words" />
  </span>
</template>

<script src="./WordInfo" />
