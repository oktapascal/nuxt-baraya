<script setup>
import { Icon } from "@iconify/vue"

const emits = defineEmits(['click-append'])

const clickAppend = () => {
    emits('click-append')
}

const props = defineProps({
    type: {
        type: String,
        default: "text"
    },
    placeholder: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    }
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
                {{ props.label }}
            </label>
            <div class="relative">
                <input 
                    class="input input-bordered w-full pr-10 dark:text-white" 
                    :type="props.type" 
                    :placeholder="props.placeholder" 
                    v-bind="field"
                    :class="{
                        'error': !meta.valid && meta.touched
                    }">
                <span class="absolute right-3 top-2.5" @click="clickAppend">
                    <Icon 
                        class="h-7 w-7 cursor-pointer icon"
                        :icon="props.icon" :class="{
                            'error': !meta.valid && meta.touched
                        }"/>
                </span>
            </div>
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
.icon {
    @apply transition duration-300 dark:text-white;
}
.icon.error {
    @apply text-red-500 dark:text-red-700;
}
</style>