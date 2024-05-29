<template>
  <form @submit="onVendorSubmit">
    <div class="grid gap-4 py-4">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel class="font-normal">Store name</FormLabel>
          <FormControl>
            <Input type="text" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel class="font-normal">Store Email</FormLabel>
          <FormControl>
            <Input type="email" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="website">
        <FormItem>
          <FormLabel class="font-normal">Website</FormLabel>
          <FormControl>
            <Input type="text" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="location">
        <FormItem>
          <FormLabel class="font-normal">Location</FormLabel>
          <FormControl>
            <Input type="text" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <Button
      type="submit"
      @click="onVendorSubmit"
      class="mt-4 w-full"
      :loading="apiLoadingStates.updateVendorProfile === API_STATES.LOADING"
    >
      Save changes
    </Button>
  </form>
</template>

<script setup lang="ts">
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { API_STATES } from "~/services/constants";
import { useAuthStore } from "@/store/useAuthStore";

const authStore = useAuthStore();
const { apiLoadingStates, userProfile } = storeToRefs(authStore);
const { updateVendorProfile } = authStore;

const emit = defineEmits(["completed"]);

const vendorFormSchema = toTypedSchema(
  z.object({
    name: z.string().min(4, {
      message: "Store name cannot be less than 4 characters",
    }),
    email: z
      .string({
        required_error: "Store email address is required",
      })
      .email(),
    website: z
      .string()
      .regex(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
      )
      .optional(),
    location: z.string(),
  })
);

const vendorFormInstance = useForm({
  validationSchema: vendorFormSchema,
  initialValues: {
    name: userProfile.value.vendor?.name || "",
    email: userProfile.value.vendor?.email || "",
    website: userProfile.value.vendor?.website || "",
    location: userProfile.value.vendor?.location.location || "",
  },
});

const onVendorSubmit = vendorFormInstance.handleSubmit(async (values: any) => {
  console.log("Form submitted!", values);
  await updateVendorProfile({
    ...values,
    location: {
      coords: [9.065482399999999, 7.4419364],
      location: values.location, // map link copied
      description: "Location",
    },
  });
  emit("completed", "vendor");
});
</script>

<style></style>
