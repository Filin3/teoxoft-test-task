<template>
  <input
    class="v-input"
    :class="{ 'v-input--error': error }"
    :value="modelValue"
    @input="(e) => $emit('update:modelValue', (e.target as HTMLInputElement).value)"
  />
</template>

<script lang="ts" setup>
defineProps<{
  modelValue: unknown;
  error?: boolean;
}>();

defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>

<style lang="scss" scoped>
.v-input {
  padding: 0.2rem;
  min-height: 1.5rem;
  border: 2px solid $secondary-color;
  background-color: $tertiary-color;
  color: $primary-color;
  border-radius: 0.25rem;
}

.v-input--error {
  border: 2px solid rgb(253, 64, 64);
}
</style>
