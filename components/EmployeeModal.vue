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
        <v-input type="text" placeholder="Имя" v-model="v.name.$model" :error="v.name.$error" />
        <v-input type="text" placeholder="Фамилия" v-model="v.secondName.$model" :error="v.secondName.$error" />
        <v-input type="number" placeholder="Стаж" min="0" v-model="v.workExperience.$model" :error="v.workExperience.$error" />
        <v-input type="number" placeholder="Возраст" min="14" v-model="v.age.$model" :error="v.age.$error" />
        <v-input type="text" placeholder="Адрес" v-model="v.address.$model" :error="v.address.$error" />
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
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, maxLength, minValue, maxValue, integer } from "@vuelidate/validators";

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
  Инициализация правил vuelidate
*/
const rules = computed(() => ({
  name: { required, minLength: minLength(2), maxLength: maxLength(40), alphaRu },
  secondName: { required, minLength: minLength(2), maxLength: maxLength(40), alphaRu },
  workExperience: { required, integer, minValue: minValue(0), maxVaue: maxValue(99) },
  age: { required, integer, minValue: minValue(14), maxVaue: maxValue(99) },
  address: { required, minLength: minLength(5), maxLength: maxLength(100) }
}));

const v = useVuelidate(rules, { name, secondName, workExperience, age, address });

/*
  Обработчик события "добавления сотрудника"
*/
async function add() {
  //валидация формы
  if (await v.value.$validate()) {
    //добавление сотрудника
    addEmployee(collectData());
    //вызов функции закрытия модального окна
    closeEmployeeModal();
  }
}

/*
  Обработчик события "сохранить изменения сотрудника"
*/
async function save() {
  //валидация формы
  if (await v.value.$validate()) {
    //cохранение изменений сотрудника
    editEmployee(idEmployee.value!, collectData());
    //вызов функции закрытия модального окна
    closeEmployeeModal();
  }
}

/*
  Функция сбора данных из полей и объединения их в один объект
*/
function collectData(): IEmployee {
  return {
    name: name.value!,
    secondName: secondName.value!,
    workExperience: workExperience.value!,
    age: age.value!,
    address: address.value!
  };
}

/*
  Функция очистки полей
*/
function clearFilelds() {
  v.value.$reset();
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
