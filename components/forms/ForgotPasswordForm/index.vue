<template>
  <div class="mx-auto grid w-[402px] gap-4">
    <img
      src="/images/logos/greep.svg"
      alt="Greep"
      class="mx-auto w-[45.45px] h-[45.45px] object-contain mb-2"
    />
    <div class="grid gap-2 text-center">
      <h1 class="text-[22px] font-semibold">Forgot Password</h1>
      <p class="text-balance text-left text-[14px] text-muted-foreground">
        Enter the email you used to create your account so we can send you
        instructions on how to reset your password
      </p>
    </div>

    <form class="space-y-8" @submit="onSubmit">
      <div class="grid gap-4">
        <div class="grid gap-2">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  class="py-[24px] rounded-[12px]"
                  v-bind="componentField"
                />
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
          :loading="apiLoadingStates.forgotPassword === API_STATES.LOADING"
        >
          Send
        </Button>
      </div>
    </form>
    <Button
      variant="outline"
      class="w-full py-6 rounded-[12px] mt-4"
      @click="router.push('/login')"
    >
      Back to login
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

const authStore = useAuthStore();
const { apiLoadingStates } = storeToRefs(authStore);
const { triggerForgotPassword } = authStore;

const formSchema = toTypedSchema(
  z.object({
    email: z
      .string({
        required_error: "Email cannot be empty",
      })
      .email(),
  })
);

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((values: any) => {
  triggerForgotPassword(values);
});
</script>

<style></style>
