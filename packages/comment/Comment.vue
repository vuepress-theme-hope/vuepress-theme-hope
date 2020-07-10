<template>
  <div v-show="pluginEnable" class="comments-wrapper">
    <Valine v-if="options.type === 'valine'" :valine-config="options" />
    <Vssue v-else-if="options.type === 'vssue'" :title="$title" />
  </div>
</template>

<script src="./Comment" />
