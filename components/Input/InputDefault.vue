<script setup>
const props = defineProps({
    type: {
        type: String,
        default: "text"
    },
    name: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
});
</script>

<template>
    <div class="flex flex-col w-full py-1">
        <VField :name="props.name" v-slot="{ field, meta }">
            <label 
                class="label" 
                :for="props.name" 
                :class="{
                    'error': !meta.valid && meta.touched
                }">
                    {{ props.name }}
                </label>
            <input 
                class="input input-bordered w-full dark:text-white" 
                autocomplete="off"
                :type="props.type" 
                :placeholder="props.placeholder" 
                v-bind="field"
                :class="{
                    'error': !meta.valid && meta.touched
                }"/>
        </VField>
        <VErrorMessage :name="props.name" as="p" class="error-text" />
    </div>
</template>

<style scoped>
.error-text {
    @apply text-red-500 dark:text-red-700 pl-1 text-sm font-semibold;
}
.label.error {
    @apply font-semibold text-red-500 dark:text-red-700;
}
.input.error {
    @apply border-2 border-red-500 dark:border-red-700;
}
.input.error {
    @apply border-2 border-red-500 dark:border-red-700;
}
</style>