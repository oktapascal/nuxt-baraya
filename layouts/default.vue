<script setup>
import { Icon } from "@iconify/vue"

const themeStore = useThemeStore()
const breakpointStore = useBreakpointStore()

const toggleTheme = (newMode) => {
  themeStore.toggleMode(newMode)

  if (newMode === 'light') {
    document.documentElement.classList.remove("dark")
  } else {
    document.documentElement.classList.add("dark")
  }
}

const memoIcon = computed(() => {
  return themeStore.getMode === 'light' ? 'mdi:white-balance-sunny' : 'mdi:weather-night'
})

const memoParameter = computed(() => {
  return themeStore.getMode === 'light' ? 'dark' : 'light'
})

const onResize = () => {
  const width = window.screen.width

  if (320 <= width && 768 >= width) {
    breakpointStore.updateCheckMobile(true)
  } else {
    breakpointStore.updateCheckMobile(false)
  }
}

onMounted(() => {
  if (localStorage.getItem("theme") == null) {
    document.documentElement.classList.remove("dark")
  } else {
    if (localStorage.getItem("theme") === 'light') {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
    }
  }

  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <Navbar>
    <div class="flex-1"></div>
    <div class="flex-none">
      <button class="btn btn-circle border-0" @click="toggleTheme(memoParameter)">
        <Icon :icon="memoIcon" class="h-7 w-7 text-neutral dark:text-neutral-dark" />
      </button>
    </div>
  </Navbar>
  <main>
    <NuxtPage />
  </main>
</template>