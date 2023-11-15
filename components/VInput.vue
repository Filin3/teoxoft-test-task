<template>
  <input
    class="v-input"
    :value="modelValue"
    @input="(e) => $emit('update:modelValue', (e.target as HTMLInputElement).value)"
  />
</template>

<script lang="ts" setup>
defineProps<{
  modelValue: unknown;
}>();

defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>

<style lang="scss" scoped>
.v-input {
  padding: 0.2rem;
  min-height: 1.5rem;
  border: 1px solid $secondary-color;
  background-color: $tertiary-color;
  color: $primary-color;
  border-radius: 0.25rem;
}
</style>
