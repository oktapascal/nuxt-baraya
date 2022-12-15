<template>
    <div class="box border border-gray-500 rounded w-full mx-5 lg:w-96">
        <div class="flex justify-center p-1">
            <slot name="box-header" />
        </div>
        <hr class="border-t border-gray-500" />
        <div class="px-4">
            <slot name="box-body" />
        </div>
        <div class="px-4">
            <slot name="box-footer" />
        </div>
    </div>
</template>

<style scoped>
.box {
    min-height: 15rem;
}
</style>