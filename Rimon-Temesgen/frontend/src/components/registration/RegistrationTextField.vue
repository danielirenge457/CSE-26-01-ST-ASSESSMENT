<script setup>
defineProps({
  label: { type: String, required: true },
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '' },
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
    <input
      :value="modelValue"
      class="form-control"
      :class="{ invalid }"
      type="text"
      :placeholder="placeholder"
      @input="emit('update:modelValue', $event.target.value)"
      @blur="emit('blur')"
    />
    <small class="form-error">{{ error }}</small>
  </label>
</template>
