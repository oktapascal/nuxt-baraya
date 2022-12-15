<script setup>
import { Icon } from '@iconify/vue'

let time = ref(null)

const breakpointStore = useBreakpointStore()
const alertStore = useAlertStore()

onMounted(() => {
    time = setTimeout(() => {
        alertStore.hideAlert()  
    }, 2000)
})

onBeforeUnmount(() => {
    clearTimeout(time)
})

const memoPosition = computed(() => {
    return breakpointStore.checkIsMobile ? 'top-center' : ' bottom-right'
})

const memoIcon = computed(() => {
    if(alertStore.getAlert.type === 'success') {
        return 'mdi:check-circle'
    }

    if(alertStore.getAlert.type === 'error') {
        return 'mdi:alert'
    }   
    
    if (alertStore.getAlert.type === 'warning') {
        return 'mdi:alert-circle'
    }

    return 'mdi:alert-box'
})

const memoText = computed(() => {
    if (alertStore.getAlert.type === 'success') {
        return 'Success Message'
    }

    if (alertStore.getAlert.type === 'error') {
        return 'Error Message'
    }

    if (alertStore.getAlert.type === 'warning') {
        return 'Warning Message'
    }

    return 'Information'
})

const onClose = () => {
    alertStore.hideAlert()
}
</script>

<template>
    <client-only>
        <div class="alert shadow-lg fixed w-auto" :class="[memoPosition, alertStore.getAlert.type]">
            <div>
                <Icon :icon="memoIcon" class="flex-shrink-0 w-6 h-6 text-white"/>
                <div>
                    <h3 class="font-bold text-white">{{ memoText }}</h3>
                    <div class="text-xs text-white">
                        <slot />
                    </div>
                </div>
            </div>  
            <div class="flex-none" v-if="!breakpointStore.checkIsMobile">
                <button class="btn btn-circle border-0" @click="onClose">
                    <Icon icon="mdi:close-circle" class="w-6 h-6 text-white"/>
                </button>
            </div>
        </div>
    </client-only>
</template>

<style scoped>
.alert.top-center {
    @apply top-8 left-1/4;
}
.alert.bottom-right {
    @apply bottom-2 right-4;
}
.alert.error {
    @apply bg-red-600 dark:bg-red-700;
}
.alert.success {
    @apply bg-green-600 dark:bg-green-700;
}
.alert.warning {
    @apply bg-orange-500 dark:bg-orange-700;
}
.alert.info {
    @apply bg-gray-500 dark:bg-gray-700;
}
</style>