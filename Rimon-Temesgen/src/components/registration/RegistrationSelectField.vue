<script setup>
defineProps({
  label: { type: String, required: true },
  modelValue: { type: String, default: '' },
  placeholder: { type: String, required: true },
  options: { type: Array, required: true },
  error: { type: String, default: ' ' },
  invalid: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'blur'])
</script>

<template>
  <label class="form-field">
    <span class="form-label">
      {{ label }}
      <em v-if="required">*</em>
    </span>
    <div class="select-wrap">
      <select
        :value="modelValue"
        class="form-control"
        :class="{ invalid }"
        @change="emit('update:modelValue', $event.target.value)"
        @blur="emit('blur')"
      >
        <option value="">{{ placeholder }}</option>
        <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
      </select>
    </div>
    <small class="form-error">{{ error }}</small>
  </label>
</template>
