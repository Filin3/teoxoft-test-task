/*
  Этот store выполняет функцию модели в концепции MVC.
*/

import type { IEmployee } from "~/types";

export const useEmployeesStore = defineStore("employees", () => {
  const employees = ref<IEmployee[]>([]);

  function addEmployee(payload: IEmployee) {
    employees.value.push(payload);
  }

  function editEmployee(id: number, payload: IEmployee) {
    employees.value[id] = payload;
  }

  function deleteEmployee(id: number) {
    employees.value.splice(id, 1);
  }

  return {
    employees,
    addEmployee,
    editEmployee,
    deleteEmployee
  };
});
