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
    readonly: {
        type: Boolean,
        default: false
    }
});
</script>

<template>
    <div class="flex flex-col w-full py-1">
        <VField :name="props.name" v-slot="{ field, meta }">
            <label class="label" :for="props.name" :class="{
                'error': !meta.valid && meta.touched
            }">
                {{ props.name }}
            </label>
            <input class="input input-bordered w-full dark:text-white" autocomplete="off" :type="props.type"
                :placeholder="props.placeholder" :readonly="props.readonly" v-bind="field" :class="{
                    'error': !meta.valid && meta.touched
                }" />
        </VField>
        <VErrorMessage :name="props.name" as="p" class="error-text" />
    </div>
</template>