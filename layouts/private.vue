<script setup>
const openMenu = ref(false)
</script>

<template>
    <Navbar>
        <div class="flex-none">
            <label class="swap swap-rotate">
                <input type="checkbox" v-model="checked" />
                <IconMenu className="swap-on fill-current h-7 w-7 dark:text-white" />
                <IconMenuOpen className="swap-off fill-current h-7 w-7 dark:text-white" />
            </label>
        </div>
    </Navbar>
    <main>
        <NuxtPage />
    </main>
</template>

<style scoped>

</style>