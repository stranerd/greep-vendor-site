<template>
  <div>
    <form>
      <div class="mx-auto grid gap-4 lg:w-[402px]">
        <img
          src="/images/logos/greep.svg"
          alt="Greep"
          class="mx-auto mb-2 h-[45.45px] w-[45.45px] object-contain"
        />
        <div class="grid gap-2">
          <h1 class="text-center text-[22px] font-semibold">Confirm Email</h1>
          <p class="text-left text-[14px] text-muted-foreground">
            We have sent an email with token to
            {{ maskEmail(userEmail || "user@email.com") }}
          </p>
        </div>

        <form class="space-y-8" @submit="onSubmit">
          <div class="grid gap-4">
            <div class="grid gap-2">
              <FormField v-slot="{ componentField, value }" name="token">
                <FormItem>
                  <FormLabel>OTP</FormLabel>
                  <FormControl>
                    <PinInput
                      id="pin-input"
                      v-model="value!"
                      placeholder="-"
                      class="mt-1 flex items-center gap-2"
                      otp
                      type="number"
                      :name="componentField.name"
                      @update:model-value="
                        (arrStr) => {
                          setFieldValue('token', arrStr.filter(Boolean));
                        }
                      "
                    >
                      <PinInputGroup>
                        <PinInputInput
                          v-for="(id, index) in 6"
                          :key="id"
                          :index="index"
                        />
                      </PinInputGroup>
                    </PinInput>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
            <Button
              type="submit"
              class="mt-4 w-full rounded-[12px] py-6"
              size="lg"
              :loading="apiLoadingStates.verifyEmail === API_STATES.LOADING"
            >
              Send
            </Button>
          </div>
        </form>
        <hr />
        <div class="grid gap-2">
          <p class="text-left text-[14px]">
            Didn’t receive an email? Check your spam or promotion folder or
            resend mail
          </p>
        </div>
      </div>
    </form>
    <Button
      variant="secondary"
      class="mt-4 w-full rounded-[12px] py-6"
      :disabled="timerCount"
      :loading="apiLoadingStates.sendVerificationMail === API_STATES.LOADING"
      @click="resendEmail"
    >
      Resend Email <span v-if="timerCount">({{ timerCount }})</span>
    </Button>
    <Button
      variant="outline"
      class="mt-4 w-full rounded-[12px] py-6"
      @click="router.push('/signup')"
    >
      Back to signup
    </Button>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { API_STATES } from "~/services/constants";
import { useAuthStore } from "@/store/useAuthStore";
import { maskEmail } from "@/lib/utils";

const authStore = useAuthStore();
const { apiLoadingStates } = storeToRefs(authStore);
const { verifyEmail, sendVerificationMail } = authStore;

const userEmail = ref<any>("");
const formSchema = toTypedSchema(
  z.object({
    token: z.array(z.coerce.string()).length(6, { message: "Invalid input" }),
  }),
);

const { handleSubmit, resetForm, setFieldValue } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((values: any) => {
  verifyEmail({
    token: values.token.join(""),
  });
});

const resendEmail = async () => {
  await sendVerificationMail(false);
  timerCount.value = 30;
};

const timerCount = ref(30);

watch(
  timerCount,
  () => {
    if (timerCount.value > 0) {
      setTimeout(() => {
        timerCount.value--;
      }, 1000);
    }
  },
  { immediate: true },
);

onMounted(() => {
  if (process.client) {
    userEmail.value = localStorage.getItem("verifyEmail");
  }
});
</script>

<style></style>
