<script setup>
let time = ref(null)

const breakpointStore = useBreakpointStore()
const alertStore = useAlertStore()

onMounted(() => {
    time = setTimeout(() => {
        alertStore.hideAlert()
    }, 5000)
})

onBeforeUnmount(() => {
    clearTimeout(time)
})

const memoPosition = computed(() => {
    return breakpointStore.checkIsMobile ? 'top-center' : ' bottom-right'
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
        <Teleport to="body">
            <Transition enter-active-class="animate__animated animate__fadeInRight"
                leave-active-class="animate__animated animate__fadeOutRight">
                <div class="alert shadow-lg fixed w-auto" :class="[memoPosition, alertStore.getAlert.type]"
                    v-if="alertStore.getAlert.show">
                    <div>
                        <template v-if="alertStore.getAlert.type === 'success'">
                            <IconCheckCircle className="flex-shrink-0 w-6 h-6 text-white" />
                        </template>
                        <template v-else-if="alertStore.getAlert.type === 'error'">
                            <IconAlert className="flex-shrink-0 w-6 h-6 text-white" />
                        </template>
                        <template v-else-if="alertStore.getAlert.type === 'warning'">
                            <IconAlertCircle className="flex-shrink-0 w-6 h-6 text-white" />
                        </template>
                        <template v-else>
                            <IconAlertBox className="flex-shrink-0 w-6 h-6 text-white" />
                        </template>
                        <div>
                            <h3 class="font-bold text-white">{{ memoText }}</h3>
                            <div class="text-xs text-white">
                                <slot />
                            </div>
                        </div>
                    </div>
                    <div class="flex-none" v-if="!breakpointStore.checkIsMobile">
                        <button class="btn btn-circle border-0" @click="onClose">
                            <IconCloseCircle className="w-6 h-6 text-white" />
                        </button>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </client-only>
</template>