<template>
  <Transition>
    <div v-if="show" class="v-modal">
      <slot />
    </div>
  </Transition>
</template>

<script lang="ts" setup>
defineProps<{
  show: boolean;
}>();
</script>

<style lang="scss" scoped>
.v-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  background-color: rgba(0 0 0 / 50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 500;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
