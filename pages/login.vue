<script setup>
import {configure} from "vee-validate";
import {toFormValidator} from "@vee-validate/zod";
import * as zod from "zod";

definePageMeta({
  layout: "default",
  middleware: "guest",
});

useHead({
  title: "Sign In Page",
});

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: false,
});

const router = useRouter();

const loading = ref(false);

const alertStore = useAlertStore();

const initialValues = {username: "", password: ""};

const validationSchema = toFormValidator(
    zod.object({
      username: zod.string().min(1, "Wajib diisi"),
      password: zod.string().min(1, "Wajib diisi"),
    }),
);

const isSecret = ref(true);

const togglePassword = () => {
  isSecret.value = !isSecret.value;
};

const memoType = computed(() => isSecret.value ? "password" : "text");

const onSubmit = async (values, actions) => {
  loading.value = true;

  const {error, pending} = await useFetch("/api/login", {
    method: "POST",
    body: values,
  });

  loading.value = pending.value;

  if (error.value === null) {
    router.push("/dashboard");
  }

  let statusCodeError;

  if (error.value !== null) {
    statusCodeError = error.value.statusCode;
  }

  if (statusCodeError === 422) {
    const {data} = error.value.data;

    const json = JSON.parse(data);
    const field = Object.keys(json);

    actions.setFieldError(field[0], json[field[0]].message);
  }

  if (statusCodeError === 500) {
    const alert = {
      show: true,
      type: "error",
      text: error.value.statusMessage,
    };

    alertStore.showAlert(alert);
  }
};
</script>

<template>
  <div class="flex justify-center mt-16">
    <BoxDefault>
      <template #box-header>
        <img alt="logo" src="/images/logo.jpeg" class="h-16 lg:h-20"/>
      </template>
      <template #box-body>
        <VForm :initial-values="initialValues" :validation-schema="validationSchema" v-slot="{ meta: formMeta }"
               @submit="onSubmit">
          <InputDefault name="username" label="Username" placeholder="Username..." :readonly="loading"/>
          <InputAppend name="password" label="Password" placeholder="Password" :readonly="loading"
                       :type="memoType" @click-append="togglePassword" v-slot="slotProps">
            <IconEye v-if="isSecret" className="h-7 w-7 cursor-pointer icon" :class="{
                            'error': slotProps.isError
                        }"/>
            <IconEyeOff v-else className="h-7 w-7 cursor-pointer icon" :class="{
                            'error': slotProps.isError
                        }"/>
          </InputAppend>
          <ButtonDefault type="submit" :waiting="loading">
            <template #default>
              Sign In
            </template>
          </ButtonDefault>
        </VForm>
      </template>
    </BoxDefault>
    <client-only>
      <AlertDefault>
        <template #default>
          {{ alertStore.getAlert.text }}
        </template>
      </AlertDefault>
    </client-only>
  </div>
</template>