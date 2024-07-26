<template>
  <div class="container mb-[96px] px-[20px] md:px-[2rem]">
    <div class="rounded-[20px] bg-[#000E18] p-[24px] py-[48px] md:p-[48px]">
      <div class="mx-auto max-w-[1248px]">
        <div class="flex w-full items-center justify-center">
          <CursiveTitle> Let's Talk </CursiveTitle>
        </div>
        <h4
          class="mb-[12px] mt-[13px] text-center text-[20px] font-semibold leading-[41px] text-[#fff] md:mb-[0px] md:text-[24px] lg:text-[35px]"
        >
          Get in touch with us
        </h4>
        <p
          class="mx-auto max-w-[717px] text-center text-[14px] font-medium leading-[24px] text-[#fff] md:text-[16px]"
        >
          Leverage agile frameworks to provide a robust synopsis for strategy
          foster collaborative thinking to further the overall value.
        </p>
        <form class="mt-[46px]" @submit="onSubmit">
          <div class="grid grid-cols-1 gap-[24px] md:grid-cols-2 md:gap-[48px]">
            <FormField v-slot="{ componentField }" name="name">
              <FormItem>
                <FormLabel
                  class="mb-[12px] block text-[16px] font-bold leading-[24px] text-[#fff] md:mb-[19px] md:text-[18px] md:leading-[30px] lg:text-[20px]"
                  >Full name *</FormLabel
                >
                <FormControl>
                  <Input
                    placeholder="John David"
                    class="min-h-[55px] w-full rounded-[12px] border-[1px] border-[#DCDCDC] bg-transparent p-[16px] text-[14px] text-[#fff] placeholder-[#808080] md:min-h-[77px] md:rounded-[20px] md:p-[24px] md:text-[18px] lg:min-h-[96px] lg:p-[32px] lg:text-[20px]"
                    type="text"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="email">
              <FormItem>
                <FormLabel
                  class="mb-[12px] block text-[16px] font-bold leading-[24px] text-[#fff] md:mb-[19px] md:text-[18px] md:leading-[30px] lg:text-[20px]"
                  >Your email *</FormLabel
                >
                <FormControl>
                  <Input
                    placeholder="example@email.com"
                    class="min-h-[55px] w-full rounded-[12px] border-[1px] border-[#DCDCDC] bg-transparent p-[16px] text-[14px] text-[#fff] placeholder-[#808080] md:min-h-[77px] md:rounded-[20px] md:p-[24px] md:text-[18px] lg:min-h-[96px] lg:p-[32px] lg:text-[20px]"
                    type="email"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="company">
              <FormItem>
                <FormLabel
                  class="mb-[12px] block text-[16px] font-bold leading-[24px] text-[#fff] md:mb-[19px] md:text-[18px] md:leading-[30px] lg:text-[20px]"
                  >Company *</FormLabel
                >
                <FormControl>
                  <Input
                    placeholder="Your company name here"
                    class="min-h-[55px] w-full rounded-[12px] border-[1px] border-[#DCDCDC] bg-transparent p-[16px] text-[14px] text-[#fff] placeholder-[#808080] md:min-h-[77px] md:rounded-[20px] md:p-[24px] md:text-[18px] lg:min-h-[96px] lg:p-[32px] lg:text-[20px]"
                    type="text"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <div>
              <FormField v-slot="{ componentField }" name="subject">
                <FormItem>
                  <FormLabel
                    class="mb-[12px] block text-[16px] font-bold leading-[24px] text-[#fff] md:mb-[19px] md:text-[18px] md:leading-[30px] lg:text-[20px]"
                    >Subject *</FormLabel
                  >
                  <FormControl>
                    <Input
                      v-bind="componentField"
                      placeholder="How can we Help"
                      class="min-h-[55px] w-full rounded-[12px] border-[1px] border-[#DCDCDC] bg-transparent p-[16px] text-[14px] text-[#fff] placeholder-[#808080] md:min-h-[77px] md:rounded-[20px] md:p-[24px] md:text-[18px] lg:min-h-[96px] lg:p-[32px] lg:text-[20px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
          </div>
          <div class="mt-[24px] md:mt-[48px]">
            <FormField v-slot="{ componentField }" name="message">
              <FormItem>
                <FormLabel
                  class="mb-[12px] block text-[16px] font-bold leading-[24px] text-[#fff] md:mb-[19px] md:text-[18px] md:leading-[30px] lg:text-[20px]"
                  >Message *</FormLabel
                >
                <FormControl>
                  <Textarea
                    id="message"
                    name="message"
                    type="text"
                    rows="6"
                    placeholder="How can we Help"
                    class="w-full rounded-[12px] border-[1px] border-[#DCDCDC] bg-transparent p-[16px] text-[14px] text-[#fff] placeholder-[#808080] md:rounded-[20px] md:p-[24px] md:text-[18px] lg:p-[32px] lg:text-[20px]"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <div class="flex justify-center">
            <Button
              variant="withIcon"
              size="lg"
              rounded="lg"
              class="mx-auto mt-[46px]"
              type="submit"
              :loading="
                apiLoadingStates.sendContactMessage === API_STATES.LOADING
              "
              >Get Started
              <div
                class="ml-[10px] mr-[-20px] rounded-full bg-[#000E18] p-[14px]"
              >
                <img
                  src="/images/icons/mail-white.svg"
                  alt="Mail Icon"
                  class="h-[20px] w-[20px] object-contain"
                />
              </div>
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { API_STATES } from "~/services/constants";
import { useAuthStore } from "@/store/useAuthStore";
import { useToast } from "@/components/library/toast/use-toast";

const authStore = useAuthStore();
const { apiLoadingStates } = storeToRefs(authStore);
const { sendMessage } = authStore;

const formSchema = toTypedSchema(
  z.object({
    name: z.string({
      message: "Full name is required",
    }),
    email: z.string().email({ message: "please enter a valid email address" }),
    company: z.string(),
    subject: z.string(),
    message: z.string(),
  }),
);

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: {},
});

const onSubmit = handleSubmit(async (values: any) => {
  console.log("Form submitted!", values);

  await sendMessage(values);
  resetForm();
});
</script>

<style></style>
