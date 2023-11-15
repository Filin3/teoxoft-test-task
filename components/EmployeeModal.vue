<template>
  <Teleport to="body">
    <!-- 
      Телепорт модалка в body
    -->
    <v-modal :show="show">
      <!-- 
        Передача в slot компонента v-modal содержимое модального окна "подтверждения действия"
      -->
      <div class="employee-modal">
        <!-- Закрытие модалки нажатии -->
        <Icon class="employee-modal__close" name="ep:close" size="1.5rem" @click="closeEmployeeModal()" />
        <v-input type="text" placeholder="Имя" v-model="name" />
        <v-input type="text" placeholder="Фамилия" v-model="secondName" />
        <v-input type="number" placeholder="Стаж" min="0" v-model="workExperience" />
        <v-input type="number" placeholder="Возраст" min="0" v-model="age" />
        <v-input type="text" placeholder="Адрес" v-model="address" />
        <!-- 
          Условная отрисовка кнопки переводящая компонент в режим добавления/редактирования
        -->
        <v-button v-if="idEmployee === null" @click="add()">Добавить</v-button>
        <v-button v-else @click="save()">Сохранить</v-button>
      </div>
    </v-modal>
  </Teleport>
</template>

<script lang="ts" setup>
import type { IEmployee } from "types";

/*
  Инициализация константы хранилища модального окна сотрудника и дальнейшая её деструктуризация
*/
const employeeModalStore = useEmployeeModalStore();
const { show, idEmployee } = storeToRefs(employeeModalStore);
const { closeEmployeeModal } = employeeModalStore;

/*
  Инициализация константы хранилища сотрудников и дальнейшая её деструктуризация
*/
const employeesStore = useEmployeesStore();
const { employees } = storeToRefs(employeesStore);
const { addEmployee, editEmployee } = employeesStore;

/*
  Инициализация переменных полей для формы
*/
const name = ref<string | null>(null);
const secondName = ref<string | null>(null);
const workExperience = ref<number | null>(null);
const age = ref<number | null>(null);
const address = ref<string | null>(null);

/*
  Обработчик события "добавления сотрудника" 
*/
function add() {
  //добавление сотрудника
  addEmployee(collectData());
  //вызов функции закрытия модального окна
  closeEmployeeModal();
}

/*
  Обработчик события "сохранить изменения сотрудника" 
*/
function save() {
  editEmployee(idEmployee.value!, collectData());
  closeEmployeeModal();
}

/*
  Функция сбора данных из полей и объединения их в один объект со значениями по умолчанию
*/
function collectData(): IEmployee {
  return {
    name: name.value ?? "",
    secondName: secondName.value ?? "",
    workExperience: workExperience.value ?? 0,
    age: age.value ?? 0,
    address: address.value ?? ""
  };
}

/*
  Функция очистки полей
*/
function clearFilelds() {
  name.value = null;
  secondName.value = null;
  workExperience.value = null;
  age.value = null;
  address.value = null;
}

/*
  Наблюдатель за режимом компонента.
  В случае если режим редактирования присваивает данные сотрудника к форме
*/
watch(idEmployee, (value) => {
  if (value !== null && show.value) {
    const employee = employees.value[value];
    name.value = employee.name;
    secondName.value = employee.secondName;
    workExperience.value = employee.workExperience;
    age.value = employee.age;
    address.value = employee.address;
  }
});

/*
  Наблюдатель за отображения компонента.
  Если модальное окно "закрывается" очищает поля формы
*/
watch(show, (value) => {
  if (!value) {
    clearFilelds();
  }
});
</script>

<style lang="scss" scoped>
.employee-modal {
  position: relative;
  background-color: $primary-color;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 2rem;
  border-radius: 1rem;
  transition-duration: 0.3s;

  &:hover {
    box-shadow: 0 0 5rem $primary-color;
  }
}

.employee-modal__close {
  position: absolute;
  top: 5px;
  right: 5px;
  transition-duration: 0.2s;
  clip-path: circle();
  color: $tertiary-color;

  &:hover {
    background-color: $secondary-color;
  }
}
</style>
