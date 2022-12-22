<script setup>
const themeStore = useThemeStore()

const checked = ref(themeStore.isDark)

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
    <div class="flex flex-row">
        <div class="flex-none px-1">
            <label class="swap swap-rotate mt-1.5">
                <input type="checkbox" v-model="checked" />
                <IconSun className="swap-on fill-current w-7 h-7 text-gray-500 dark:text-white" />
                <IconMoon className="swap-off fill-current w-7 h-7 text-gray-500 dark:text-white" />
            </label>
        </div>
        <div class="flex-1 px-1 cursor-pointer">
            <div class="mt-1.5">
                <IconMonitorMultiple className="fill-current w-7 h-7 text-gray-500 dark:text-white" title="New Tab" />
            </div>
        </div>
        <div class="flex-1 flex flex-row rounded-full cursor-pointer hover:bg-gray-100  dark:hover:bg-gray-600">
            <div class="flex-none px-1">
                <div class="avatar">
                    <div class="w-9 rounded-full">
                        <img alt="avatar" src="/images/avatars/avatar.png" />
                    </div>
                </div>
            </div>
            <div class="flex-1 px-1">
                <h6 class="text-gray-500 text-sm text-center mt-2 dark:text-white">2703172</h6>
            </div>
        </div>
    </div>
</template>