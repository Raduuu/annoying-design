<template>
  <button
    v-bind="$attrs"
    @mouseover="handleHover"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">

const emit = defineEmits<{
  (e: 'click'): void;
  (e: 'hover'): void
}>();

function handleClick() {
  emit('click');
}

function handleHover() {
  emit('hover');
}
</script>

<style scoped>
button:disabled {
  opacity: 0.6;
  outline: none;
}
</style>