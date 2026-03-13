<script setup>
defineProps({
  modelValue: { type: String, default: 'female' },
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="form-field field-span">
    <span class="form-label">Gender</span>
    <div class="form-control radio-group">
      <label class="radio-option">
        <input
          :checked="modelValue === 'male'"
          type="radio"
          value="male"
          @change="emit('update:modelValue', 'male')"
        />
        <span class="radio-mark"></span>
        <span>Male</span>
      </label>

      <label class="radio-option">
        <input
          :checked="modelValue === 'female'"
          type="radio"
          value="female"
          @change="emit('update:modelValue', 'female')"
        />
        <span class="radio-mark"></span>
        <span>Female</span>
      </label>
    </div>
    <small class="form-error"> </small>
  </div>
</template>
