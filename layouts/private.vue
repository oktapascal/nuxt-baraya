<script setup>
const themeStore = useThemeStore()
const breakpointStore = useBreakpointStore()

const openMenu = ref(false)
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
        <div class="navbar-start">
            <label class="swap swap-rotate">
                <input type="checkbox" v-model="openMenu" />
                <IconMenu className="swap-off fill-current h-7 w-7 dark:text-white" />
                <IconMenuOpen className="swap-on fill-current h-7 w-7 dark:text-white" />
            </label>
        </div>
        <div class="navbar-center">
            <img alt="logo" src="/images/logo.jpeg" class="h-10" />
        </div>
        <div class="navbar-end">
            <button class="btn btn-circle border-0">
                <div class="avatar">
                    <div class="w-10 rounded-full">
                        <img alt="avatar" src="/images/avatars/avatar.png" />
                    </div>
                </div>
            </button>
        </div>
    </Navbar>
    <main>
        <NuxtPage />
    </main>
</template>