<template>
    <input 
      :value="inputValue" 
      @input="handleInput"
      @keydown.enter.prevent 
    />
</template>

<script lang="ts" setup>
const inputValue = defineModel<string>();

const emit = defineEmits<{
  (e: 'handle-input', event: Event): void
}>();

function handleInput(e: Event) {
  emit('handle-input', e);
  const target = e.target as HTMLInputElement;
  inputValue.value = target.value;
}
</script>
