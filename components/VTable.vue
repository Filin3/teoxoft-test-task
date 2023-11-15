<template>
  <div class="v-table">
    <table>
      <thead>
        <tr>
          <slot name="header" />
        </tr>
      </thead>
      <tbody>
        <slot name="body" />
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.v-table {
  background-color: $primary-color;
  padding: 2rem;
  border-radius: 1rem;
}

table,
:slotted(th),
:slotted(td) {
  border: 1px solid $tertiary-color;
  border-collapse: collapse;
}

:slotted(th),
:slotted(td) {
  padding: 1rem;
  color: $tertiary-color;
}

:slotted(td) {
  text-align: center;
  font-size: 1.2rem;
  word-break: break-all;
}
</style>
