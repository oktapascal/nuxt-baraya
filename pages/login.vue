<script setup>
import { configure } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'
import * as zod from 'zod'

useHead({
    title: 'Sign In Page'
});

configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: false,
});

const alertStore = useAlertStore()

const initialValues = { username: "", password: "" }

const validationSchema = toFormValidator(
    zod.object({
        username: zod.string().min(1, 'Wajib diisi'),
        password: zod.string().min(1, 'Wajib diisi')
    })
);

const isSecret = ref(true)

const togglePassword = () => {
    isSecret.value = !isSecret.value
}

const memoType = computed(() => isSecret.value ? 'password' : 'text')
const memoIcon = computed(() => isSecret.value ? 'mdi:eye' : 'mdi:eye-off')

const onSubmit = (values) => {
    console.info(values)
}
</script>

<template>
    <div class="flex justify-center mt-16">
        <BoxDefault>
            <template #box-header>
                <img alt="logo" src="/images/logo.jpeg" class="h-16 lg:h-20" />
            </template>
            <template #box-body>
                <VForm :initial-values="initialValues" :validation-schema="validationSchema" v-slot="{ meta: formMeta }" @submit="onSubmit">
                  <InputDefault name="username" label="Username" placeholder="Username..." />
                  <InputAppend name="password" label="Password" placeholder="Password" :type="memoType" :icon="memoIcon" @click-append="togglePassword" />
                  <ButtonDefault type="submit">
                    <template #default>
                        Sign In
                    </template>
                  </ButtonDefault>
                </VForm>
            </template>
        </BoxDefault>
        <Teleport to="body">
            <AlertDefault v-if="alertStore.getAlert.show">
                <template #default>
                    ini alert message
                </template>
            </AlertDefault>
        </Teleport>
    </div>
</template>