<script setup>
defineProps({
  message: { type: String, required: true },
})

const emit = defineEmits(['close'])
</script>

<template>
  <div class="success-banner" role="status" aria-live="polite">
    <span>{{ message }}</span>
    <button type="button" class="success-close" @click="emit('close')">x</button>
  </div>
</template>
