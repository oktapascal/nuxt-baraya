<script setup>
const props = defineProps({
    type: {
        type: String,
        default: 'button'
    },
    waiting: {
        type: Boolean,
        default: false
    }
})
</script>
<template>
    <div class="flex flex-col w-full py-4">
        <button 
            class="btn btn-block border-0 bg-blue-600 dark:bg-gray-700 text-white hover:bg-blue-700 dark:hover:bg-gray-800"
            :class="{
                'loading': props.waiting
            }"
            :type="props.type">
            <slot />
        </button>
    </div>
</template>