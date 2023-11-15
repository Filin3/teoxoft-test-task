<template>
  <button class="v-button">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.v-button {
  background-color: $tertiary-color;
  border-radius: 0.25rem;
  min-height: 2rem;
  transition-duration: 0.1s;
  color: $quaternary-color;

  &:hover {
    background-color: rgba($tertiary-color, 90%);
  }

  &:active {
    transform: scale(0.9);
  }
}
</style>
