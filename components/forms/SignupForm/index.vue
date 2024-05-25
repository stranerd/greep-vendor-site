<template>
  <form>
    <div class="mx-auto grid w-[402px] gap-4">
      <img
        src="/images/logos/greep.svg"
        alt="Greep"
        class="mx-auto w-[45.45px] h-[45.45px] object-contain mb-2"
      />
      <div class="grid gap-2 text-center">
        <h1 class="text-[22px] font-semibold">Welcome!</h1>
        <p class="text-balance text-muted-foreground">Login to continue</p>
      </div>
      <Button variant="outline" class="w-full py-6 rounded-[12px] mt-4">
        Continue with Google
      </Button>
      <div class="relative mt-2">
        <div class="absolute inset-0 flex items-center">
          <span class="w-full border-t" />
        </div>
        <div class="relative flex justify-center text-xs uppercase">
          <span class="bg-background px-2 text-muted-foreground"> Or </span>
        </div>
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
          <div class="grid gap-2">
            <FormField v-slot="{ componentField }" name="password">
              <FormItem>
                <FormLabel class="font-normal">Password</FormLabel>
                <FormControl>
                  <div class="relative">
                    <Input
                      :type="showPassword ? 'text' : 'password'"
                      placeholder="m@example.com"
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
                <FormLabel class="font-normal">Confirm Password</FormLabel>
                <FormControl>
                  <div class="relative">
                    <Input
                      :type="showConfirmPassword ? 'text' : 'password'"
                      placeholder="m@example.com"
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
            :loading="apiLoadingStates.login === API_STATES.LOADING"
          >
            Sign up
          </Button>
        </div>
      </form>

      <div class="text-center text-[16px]">
        Have an account?
        <nuxt-link to="/login" class="text-[#0250C6]"> Login </nuxt-link>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
const router = useRouter();
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { Eye, EyeOff } from "lucide-vue-next";
import { API_STATES } from "~/services/constants";
import { useAuthStore } from "@/store/useAuthStore";

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const authStore = useAuthStore();
const { apiLoadingStates } = storeToRefs(authStore);
const { signUpUser } = authStore;

const formSchema = toTypedSchema(
  z
    .object({
      password: z.string().min(6, {
        message: "Password cannot be less than 6 characters",
      }),
      confirmPassword: z.string({
        required_error: "Please confrim your password",
      }),
      email: z
        .string({
          required_error: "Email cannot be empty",
        })
        .email(),
    })
    .refine(
      (data: { email: string; password: string; confirmPassword: string }) =>
        data.password === data.confirmPassword,
      {
        message: "Passwords don't match",
        path: ["confirmPassword"], // path of error
      }
    )
);

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((values: any) => {
  console.log("Form submitted!", values);
  signUpUser(values);
});

const accountFormSchema = toTypedSchema(
  z.object({
    name: z
      .string({
        required_error: "Required.",
      })
      .min(2, {
        message: "Name must be at least 2 characters.",
      })
      .max(30, {
        message: "Name must not be longer than 30 characters.",
      }),
    dob: z
      .string()
      .datetime()
      .optional()
      .refine(
        (date: Date) => date !== undefined,
        "Please select a valid date."
      ),
    language: z.string().min(1, "Please select a language."),
  })
);
</script>

<style></style>
