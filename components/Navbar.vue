<template>
  <div class="flex items-center p-2 min-h-nav w-full shadow-md bg-white dark:bg-gray-700">
    <slot />
  </div>
</template>

<style scoped>
.min-h-nav {
  min-height: 4rem;
}
</style>