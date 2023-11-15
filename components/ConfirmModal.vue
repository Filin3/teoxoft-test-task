<template>
  <Teleport to="body">
    <!-- 
      Телепорт модалка в body
     -->
    <v-modal :show="show">
      <!-- 
        Передача в slot компонента v-modal содержимое модального окна "подтверждения действия"
       -->
      <div class="confirm-modal">
        <p class="confirm-modal__p">{{ message }}</p>
        <button class="confirm-modal__button" @click="confirm()">Да</button>
        <button class="confirm-modal__button" @click="cancel()">Нет</button>
      </div>
    </v-modal>
  </Teleport>
</template>

<script lang="ts" setup>
/*
  Инициализация константы хранилища и дальнейшая её деструктуризация
*/
const confirmModalStore = useConfirmModalStore();
const { show, message, onConfirm, onCancel } = storeToRefs(confirmModalStore);
const { closeConfrimModal } = confirmModalStore;

function confirm() {
  // вызов callback функции из хранилища
  if (onConfirm.value) onConfirm.value();
  // вызов функции закрытия модалки
  closeConfrimModal();
}

function cancel() {
  // вызов callback функции из хранилища
  if (onCancel.value) onCancel.value();
  // вызов функции закрытия модалки
  closeConfrimModal();
}
</script>

<style lang="scss" scoped>
.confirm-modal {
  background-color: $primary-color;
  color: $tertiary-color;
  margin: 1.5rem;
  font-size: 1.125rem;
  border-radius: 0.75rem;
  max-width: 48rem;
  transition-duration: 0.3s;
  overflow: hidden;

  &:hover {
    box-shadow: 0 0 5rem $primary-color;
  }
}

.confirm-modal__p {
  text-align: center;
  padding: 1rem;
  word-break: break-all;
}

.confirm-modal__button {
  $border: 1px solid $secondary-color;
  background-color: $primary-color;
  border-top: $border;
  color: $tertiary-color;
  padding: 0.5rem;
  width: 50%;

  &:hover {
    background-color: $secondary-color;
  }

  &:last-child {
    border-left: $border;
  }
}
</style>
