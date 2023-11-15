/*
  Этот store управляет состоянием EmployeeModal: отображение модального окна и идентификатор сотрудника.
*/

export const useEmployeeModalStore = defineStore("employeeModal", () => {
  const show = ref<boolean>(false);
  const idEmployeeRef = ref<number | null>(null);

  function openEmployeeModal(idEmployee?: number) {
    idEmployeeRef.value = idEmployee ?? null;
    show.value = true;
  }

  function closeEmployeeModal() {
    idEmployeeRef.value = null;
    show.value = false;
  }

  return {
    show,
    idEmployee: idEmployeeRef,
    openEmployeeModal,
    closeEmployeeModal
  };
});
