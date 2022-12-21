<script setup>
const themeStore = useThemeStore()
const breakpointStore = useBreakpointStore()

const checked = ref(themeStore.isDark)

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

watch(checked, () => {
  if (process.client) {
    if (checked.value) {
      themeStore.toggleMode('dark')
      document.documentElement.classList.add("dark")
    } else {
      themeStore.toggleMode('light')
      document.documentElement.classList.remove("dark")
    }
  }
})
</script>

<template>
  <Navbar>
    <div class="navbar-start"></div>
    <div class="navbar-center"></div>
    <div class="navbar-end">
      <label class="swap swap-rotate">
        <input type="checkbox" v-model="checked" />
        <IconSun className="swap-on fill-current w-7 h-7 dark:text-white" />
        <IconMoon className="swap-off fill-current w-7 h-7 dark:text-white" />
      </label>
    </div>
  </Navbar>
  <main>
    <NuxtPage />
  </main>
</template>