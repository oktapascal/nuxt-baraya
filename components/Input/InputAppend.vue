<script setup>
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
                {{ props.label }}
            </label>
            <div class="relative">
                <input class="input input-bordered w-full pr-10 dark:text-white" :type="props.type"
                    :placeholder="props.placeholder" :readonly="props.readonly" v-bind="field" :class="{
                        'error': !meta.valid && meta.touched
                    }">
                <span class="absolute right-3 top-2.5" @click="clickAppend">
                    <slot :isError="!meta.valid && meta.touched" />
                </span>
            </div>
        </VField>
        <VErrorMessage :name="props.name" as="p" class="error-text" />
    </div>
</template>