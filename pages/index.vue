<template>
  <div class="employees-page">
    <div class="employees-page__add-wrapper">
      <!-- Открытие модалки добавления сотрудника при нажатии -->
      <Icon class="employees-page__add" name="ep:plus" size="3rem" @click="openEmployeeModal()" />
    </div>
    <v-table>
      <!-- 
        Передача в slot header компонента v-table заголовок таблица
       -->
      <template #header>
        <th>Имя</th>
        <th>Фамилия</th>
        <th>Стаж</th>
        <th>Возраст</th>
        <th>Адрес</th>
        <th>Редактирование</th>
        <th>Удаление</th>
      </template>
      <!-- 
        Передача в slot body компонента v-table содержимое таблицы
      -->
      <template #body>
        <!-- 
          создание строк таблицы путем перебора элементов в массисе employees
         -->
        <tr v-for="({ name, secondName, workExperience, age, address }, key) in employees" :key="key">
          <td>{{ name }}</td>
          <td>{{ secondName }}</td>
          <td>{{ workExperience }}</td>
          <td>{{ age }}</td>
          <td>{{ address }}</td>
          <td>
            <!-- Открытие модалки редактирования сотрудника при нажатии -->
            <v-button @click="openEmployeeModal(key)">Редактировать</v-button>
          </td>
          <td class="employees-list__td">
            <!-- Открытие модалки подтвержения об удалении сотрудника при нажатии -->
            <v-button @click="deleteHandler(key)">Удалить</v-button>
          </td>
        </tr>
      </template>
    </v-table>
    <ClientOnly>
      <!--
        Модальное окно находится в ClientOnly, чтобы не отображалось при SSR в SEO
        Модальное одно подключено в режиме динамического импорта, чтобы импортировалось только тогда оно необходимо, и ускоряла загрузку страницы
      -->
      <LazyEmployeeModal />
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
/*
  Деструктуризация хранилищ модалок для получения функциий открытия модалок
*/
const { openEmployeeModal } = useEmployeeModalStore();
const { openConfirmModal } = useConfirmModalStore();

/*
  Инициализация константы хранилища сотрудников и дальнейшая её деструктуризация
*/
const employeesStore = useEmployeesStore();
const { employees } = storeToRefs(employeesStore);
const { deleteEmployee } = employeesStore;

/*
  Обработчик события "удаления сотрудника" 
*/
function deleteHandler(id: number) {
  const employee = employees.value[id];
  const employeeFullName = `${employee.name} ${employee.secondName}`.trim();

  /*
    Открытие модального окна для подтверждения действия, и передача callback функции,
    которая будет выполнена при подтверждении действия
  */
  openConfirmModal(`Вы уверены, что хотите удалить сотрудника ${employeeFullName}?`, () => deleteEmployee(id));
}
</script>

<style lang="scss" scoped>
.employees-page {
  padding: 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
}

.employees-page__add-wrapper {
  width: 100%;
}

.employees-page__add {
  background-color: $primary-color;
  color: $tertiary-color;
  border-radius: 3rem;

  &:hover {
    box-shadow: 0 0 1rem $primary-color;
  }
}
</style>
