<script setup>
const props = defineProps({
  total: {
    type: Number,
    default: 0
  }
})
</script>
<template>
  <div class="mx-1 relative">
    <button class="btn btn-circle border-0 h-4">
      <IconBell className="h-7 w-7 fill-current text-gray-500 dark:text-white" />
    </button>
    <span class="badge" v-if="props.total > 0">{{ props.total }}</span>
  </div>
</template>

<style scoped>
  .badge {
    @apply absolute text-white right-1.5 top-1 rounded-lg bg-blue-700 py-0.5 px-1 dark:bg-gray-800;
    font-size: 0.6875rem;
    line-height: 0.625rem;
  }
</style>