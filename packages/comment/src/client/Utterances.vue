<template>
  <div v-show="commentDisplay" class="utterances-wrapper">
    <div id="utterances-comment" />
  </div>
</template>

<script src="./Utterances" />

<style lang="scss">
.comments {
	position: relative;
	box-sizing: border-box;
	width: 100%;
	margin-left: auto;
	margin-right: auto;

	iframe {
		position: absolute;
		left: 0;
		right: 0;
		width: 1px;
		min-width: 100%;
		max-width: 100%;
		height: 100%;
		border: 0;
	}
}
</style>
