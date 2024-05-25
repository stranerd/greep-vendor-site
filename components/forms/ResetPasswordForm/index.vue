<template>
  <form>
    <div class="mx-auto grid w-[402px] gap-4">
      <img
        src="/images/logos/greep.svg"
        alt="Greep"
        class="mx-auto w-[45.45px] h-[45.45px] object-contain mb-2"
      />
      <div class="grid gap-2">
        <h1 class="text-[22px] text-center font-semibold">Reset Password</h1>
        <p class="text-left text-[14px] text-muted-foreground">
          We have sent an email with password reset token to
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
                    class="flex gap-2 items-center mt-1"
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
          <div class="grid gap-2">
            <FormField v-slot="{ componentField }" name="password">
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <div class="relative">
                    <Input
                      :type="showPassword ? 'text' : 'password'"
                      class="py-[24px] rounded-[12px]"
                      v-bind="componentField"
                    />
                    <div
                      class="absolute right-[16px] top-[50%] translate-y-[-50%] cursor-pointer"
                      @click="showPassword = !showPassword"
                    >
                      <Eye v-if="!showPassword" />
                      <EyeOff v-else />
                    </div>
                  </div>
                </FormControl>
                <!-- <FormDescription>
                      This is your public display name.
                    </FormDescription> -->
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          <div class="grid gap-2">
            <FormField v-slot="{ componentField }" name="confirmPassword">
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div class="relative">
                    <Input
                      :type="showConfirmPassword ? 'text' : 'password'"
                      class="py-[24px] rounded-[12px]"
                      v-bind="componentField"
                    />
                    <div
                      class="absolute right-[16px] top-[50%] translate-y-[-50%] cursor-pointer"
                      @click="showConfirmPassword = !showConfirmPassword"
                    >
                      <Eye v-if="!showConfirmPassword" />
                      <EyeOff v-else />
                    </div>
                  </div>
                </FormControl>
                <!-- <FormDescription>
                      This is your public display name.
                    </FormDescription> -->
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          <Button
            type="submit"
            class="w-full py-6 rounded-[12px] mt-4"
            size="lg"
            :loading="apiLoadingStates.resetPassword === API_STATES.LOADING"
          >
            Send
          </Button>
        </div>
      </form>
      <hr />
      <div class="grid gap-2">
        <p class="text-left text-[14px]">
          Didn’t receive an email? Check your spam or promotion folder or resend
          mail
        </p>
        <Button variant="secondary" class="w-full py-6 rounded-[12px] mt-4">
          Resend Email
        </Button>
      </div>
      <Button variant="outline" class="w-full py-6 rounded-[12px] mt-4">
        Back to login
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { nextTick } from "vue";
const router = useRouter();
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { API_STATES } from "~/services/constants";
import { useAuthStore } from "@/store/useAuthStore";
import { maskEmail } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-vue-next";

const authStore = useAuthStore();
const { apiLoadingStates } = storeToRefs(authStore);
const { triggerResetPassword } = authStore;

const userEmail = ref<any>("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const formSchema = toTypedSchema(
  z
    .object({
      token: z.array(z.coerce.string()).length(6, { message: "Invalid input" }),
      password: z.string({
        required_error: "Password cannot be empty",
      }),
      confirmPassword: z.string({
        required_error: "Please confrim your password",
      }),
    })
    .refine(
      (data: { token: any; password: string; confirmPassword: string }) =>
        data.password === data.confirmPassword,
      {
        message: "Passwords don't match",
        path: ["confirmPassword"], // path of error
      }
    )
);

const timerInterval = ref<any>(null);
const timeLimit = ref(20);
const timePassed = ref(0);

const { handleSubmit, resetForm, setFieldValue } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((values: any) => {
  triggerResetPassword({
    password: values.password,
    token: values.token.join(""),
  });
});

const startTimer = () => {
  timerInterval.value = setInterval(
    () => (timePassed.value < 300 ? (timePassed.value += 1) : clearInterval()),
    1000
  );
};
const timeLeft = computed(() => {
  return timeLimit.value - timePassed.value;
});

const clearInterval = () => {};

const formattedTimeLeft = computed(() => {
  const timeLeft = timeLeft.value;
  const minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
});

onMounted(() => {
  if (process.client) {
    userEmail.value = localStorage.getItem("resetPasswordEmail");
  }
});
</script>

<style></style>
