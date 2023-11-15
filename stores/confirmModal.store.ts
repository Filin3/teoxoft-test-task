/*
  Этот store управляет состоянием ConfirmModal: отображение модального окна, отображаемое сообщение и функции обратного вызова,
  которые выполняются, когда пользователь подтверждает или отменяет действие.
*/

export const useConfirmModalStore = defineStore("confirmModal", () => {
  const show = ref<boolean>(false);
  const messageRef = ref<string | null>(null);
  const onConfirmRef = ref<Function | null>(null);
  const onCancelRef = ref<Function | null>(null);

  function openConfirmModal(message: string, onConfirm: Function, onCancel?: Function) {
    messageRef.value = message;
    onConfirmRef.value = onConfirm;
    onCancelRef.value = onCancel ?? null;
    show.value = true;
  }

  function closeConfrimModal() {
    messageRef.value = null;
    onConfirmRef.value = null;
    onCancelRef.value = null;
    show.value = false;
  }

  return {
    show,
    onConfirm: onConfirmRef,
    onCancel: onCancelRef,
    message: messageRef,
    openConfirmModal,
    closeConfrimModal
  };
});
