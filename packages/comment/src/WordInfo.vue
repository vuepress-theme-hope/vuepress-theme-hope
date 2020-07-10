<template>
  <span v-if="words" class="words-info" :title="hint">
    <WordIcon />
    <span v-text="words" />
  </span>
</template>

<script src="./WordInfo" />
