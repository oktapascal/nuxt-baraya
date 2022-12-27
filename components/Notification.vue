<template>
  <div class="mx-1 relative">
    <button class="btn btn-circle border-0">
      <IconBell className="h-7 w-7" />
    </button>
    <span class="badge">0</span>
  </div>
</template>

<style scoped>
  .badge {
    @apply absolute text-white right-1.5 top-1 rounded-lg bg-blue-700 py-0.5 px-1 dark:bg-gray-700;
    font-size: 0.6875rem;
    line-height: 0.625rem;
  }
</style>