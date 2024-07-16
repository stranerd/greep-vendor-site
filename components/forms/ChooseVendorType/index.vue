<template>
  <form class="space-y-8" @submit="chooseVendorType">
    <div class="mx-auto grid w-[402px] gap-4">
      <img
        src="/images/logos/greep.svg"
        alt="Greep"
        class="mx-auto mb-2 block h-[45.45px] w-[45.45px] object-contain"
      />
      <div
        class="grid gap-2 text-center"
        v-if="ActiveTab === VendorFormCards.STORE_TYPE"
      >
        <h1 class="text-[22px] font-semibold">Choose Vendor Type</h1>
        <p class="text-balance text-muted-foreground">Who are you?</p>
      </div>
      <div class="grid gap-2 text-center" v-else>
        <h1 class="text-[22px] font-semibold">Store Details</h1>
        <p class="text-balance text-muted-foreground">
          Tell us about your store?
        </p>
      </div>

      <template v-if="ActiveTab === VendorFormCards.STORE_TYPE">
        <Card
          v-for="vendor in vendorTypes"
          @click="vendorType = vendor"
          :class="{ 'border-green-500': vendorType === vendor }"
          class="cursor-pointer border-2 p-4"
        >
          <component :is="vendor.icon" class="h-6 w-6" />
          <CardTitle class="!my-2 text-xl">{{ vendor.type }}</CardTitle>
          <CardDescription> {{ vendor.hint }}</CardDescription>
        </Card>
      </template>

      <template v-else>
        <div class="grid gap-4">
          <FormField
            v-slot="{ componentField, handleChange }"
            :name="field.name"
            v-for="(field, index) in vendorTypeForm"
            :key="index"
          >
            <FormItem>
              <FormLabel>{{ field.label }}</FormLabel>
              <FormControl>
                <Input
                  v-if="field.name === 'banner'"
                  :type="field.type"
                  v-model="banner"
                  class="rounded-[12]"
                  @change="handleChange"
                />
                <Input
                  v-else
                  :type="field.type"
                  :placeholder="field?.placeholder"
                  :class="{ 'rounded-[12px] py-[24px]': field.type !== 'file' }"
                  v-bind="componentField"
                  @change="handleChange"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
      </template>

      <Button
        v-if="ActiveTab === VendorFormCards.STORE_TYPE"
        type="button"
        class="mt-4 w-full rounded-[12px] py-6"
        size="lg"
        @click.prevent="ActiveTab = VendorFormCards.STORE_DETAILS"
        :disabled="vendorType === null"
      >
        Next
      </Button>
      <Button
        v-else
        type="submit"
        class="mt-4 w-full rounded-[12px] py-6"
        size="lg"
        @click.prevent="chooseVendorType"
        :disabled="Object.keys(errors).length > 0 || banner === null"
        :loading="isSubmitting"
      >
        Get Started
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import * as z from "zod";
import { ShopIcon, WindIcon } from "@placetopay/iconsax-vue/outline";
import { API_STATES } from "~/services/constants";
import { useAuthStore } from "@/store/useAuthStore";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { GP_ROUTES } from "~/constants/route-names";

const authStore = useAuthStore();
const { apiLoadingStates } = storeToRefs(authStore);

const emits = defineEmits(["completed"]);
const router = useRouter();

const vendorType = ref<Vendor | null>(null);
const VendorFormCards = ref({
  STORE_TYPE: "store-type",
  STORE_DETAILS: "store-details",
});
const banner = ref<File | null>(null);

const ActiveTab = ref(VendorFormCards.value.STORE_TYPE);

interface Vendor {
  type: string;
  icon: Component;
  hint: string;
  value: "items" | "foods";
}
const vendorTypes = ref<Vendor[]>([
  {
    type: "Food Vendor",
    icon: WindIcon,
    hint: "Restaurant, chef, bakery, etc; selling food.",
    value: "foods",
  },
  {
    type: "Market Vendor",
    icon: ShopIcon,
    hint: "Supermarket, store, shop, etc; selling goods.",
    value: "items",
  },
]);

const vendorTypeForm = ref([
  {
    name: "name",
    type: "text",
    label: "Store's Name",
    placeholder: "Goodies Store",
  },
  {
    name: "email",
    type: "email",
    label: "Store's Email",
    placeholder: "suppor@goodies-store.com",
  },
  { name: "banner", type: "file", label: "Store's Banner" },
  {
    name: "website",
    type: "text",
    label: "Store's Website",
    placeholder: "www.goodies-store.com",
  },
]);

const vendorTypeSchema = toTypedSchema(
  z.object({
    name: z.string({ message: "store name is required" }).min(3, {
      message: "store name cannot be less than 3 characters",
    }),
    email: z
      .string({
        message: "Store email is required",
      })
      .email({ message: "please enter a valid email address" }),

    banner: z.any({
      required_error: "Image is required",
    }),

    website: z
      .string({ message: "store website is required" })
      .url({ message: "please enter a valid URL" }),
  }),
);

const { handleSubmit, resetForm, setFieldValue, errors, isSubmitting } =
  useForm({
    validationSchema: vendorTypeSchema,
  });

const chooseVendorType = handleSubmit(async (values: any) => {
  const form = new FormData();

  Object.keys({ ...values }).forEach((item) => {
    form.append(item, values[item]);
  });

  form.append("type", "vendor");
  form.append("vendorType", vendorType.value?.value ?? "");
  form.append(
    "location",
    JSON.stringify({
      coords: [9.065482399999999, 7.4419364],
      location: "KKTC",
      description: "Location",
    }),
  );
  const formFields: any = {};
  for (let [key, value] of form.entries()) {
    formFields[key] = value;
  }
  console.log(formFields);

  await authStore.updateVendorRoles(form);

  if ((apiLoadingStates.value.updateVendorProfile = API_STATES.SUCCESS)) {
    router.replace({ name: GP_ROUTES.VENDOR.DASHBOARD });
  }
});
</script>

<style></style>
