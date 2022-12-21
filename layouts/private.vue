<script setup>
import { Icon } from "@iconify/vue"

const openMenu = ref(false)

const memoMenu = computed(() => {
    return openMenu ? 'mdi:menu-open' : 'mdi:menu'
})
</script>

<template>
    <Navbar>
        <div class="flex-none">
            <Icon :icon="memoMenu" class="h-7 w-7 dark:text-white" />
        </div>
    </Navbar>
    <main>
        <NuxtPage />
    </main>
</template>

<style scoped>

</style>