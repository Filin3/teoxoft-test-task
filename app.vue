<template>
  <div>
    <NuxtPage />
    <ClientOnly>
      <!--
        Модальное окно находится в ClientOnly, чтобы не отображалось при SSR в SEO
        Модальное одно подключено в режиме динамического импорта, чтобы импортировалось только тогда оно необходимо, и ускоряла загрузку страницы
      -->
      <LazyConfirmModal />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  background-color: $tertiary-color;
}
</style>
