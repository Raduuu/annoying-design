<template>
  <div
    ref="modalRef"
    v-if="showError"
    class="fixed inset-0 flex items-center justify-center bg-black/50"
  >
    <div
      class="relative bg-white p-6 rounded-xl shadow-xl animate-shake animate-infinite w-80"
    >
      <div
        @click="closeError"
        class="absolute cursor-pointer bg-transparent top-2 right-2 text-gray-500 hover:text-gray-800 text-xs font-bold"
      >
        ✕
      </div>

      <h2 class="text-lg font-bold text-red-600">❌ Error!</h2>
      <p class="mt-2 text-gray-700">
        Something went wrong. Please try again.
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const { showError } = defineProps<{
  showError: boolean,
}>();

const emit = defineEmits<{
  (e: 'close-error-modal'): void
}>();

const modalRef = ref<HTMLDivElement | null>(null);

function closeError() {
  emit('close-error-modal');
}

defineExpose({ modalRef });
</script>
