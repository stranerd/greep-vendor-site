<template>
  <form @submit="onSubmit">
    <div class="grid gap-4 py-4">
      <FormField v-slot="{ componentField }" name="username">
        <FormItem>
          <FormLabel class="font-normal">Username</FormLabel>
          <FormControl>
            <Input type="text" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="firstName">
        <FormItem>
          <FormLabel class="font-normal">First name</FormLabel>
          <FormControl>
            <Input type="text" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="lastName">
        <FormItem>
          <FormLabel class="font-normal">Last name</FormLabel>
          <FormControl>
            <Input type="text" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="phone">
        <FormItem>
          <FormLabel class="font-normal">Contact Info</FormLabel>
          <FormControl>
            <vue-tel-input
              v-bind="{ ...telProps, ...componentField }"
              class="!focus-visible:outline-none !focus-visible:ring-2 !focus-within:border-[#000] !focus-visible:ring-ring !focus-visible:ring-offset-2 !rounded-md !border !border-input py-1 !shadow-none !ring-offset-background"
              @validate="showOptions"
            ></vue-tel-input>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ handleChange }" name="photo">
        <FormItem>
          <FormLabel>Photo </FormLabel>
          <FormControl>
            <Input
              type="file"
              placeholder="File"
              accept="image/*"
              @change="handleChange"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button
        type="submit"
        @click="onSubmit"
        :loading="apiLoadingStates.updateUserProfile === API_STATES.LOADING"
      >
        Save changes
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { API_STATES } from "~/services/constants";
import { useAuthStore } from "@/store/useAuthStore";
import { useToast } from "@/components/library/toast/use-toast";

const authStore = useAuthStore();
const { apiLoadingStates, userProfile, user } = storeToRefs(authStore);
const { getUserProfile, updateUserProfile } = authStore;

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(2, {
      message: "First name cannot be less than 2 characters",
    }),
    firstName: z.string().min(2, {
      message: "First name cannot be less than 2 characters",
    }),
    lastName: z.string().min(2, {
      message: "Middle name cannot be less than 2 characters",
    }),
    phone: z.string(),
    photo: z.any().optional(),
  }),
);

const emit = defineEmits(["completed"]);

const phoneOptions = ref<any>(null);

const showOptions = (opts: any) => {
  phoneOptions.value = opts;
  console.log(opts);
};

const telProps = {
  preferredCountries: ["NG", "GB"],
  placeholder: "Enter your phone number",
  mode: "international",
  inputOptions: {
    showDialCode: true,
  },
  autoDefaultCountry: true,
  dropdownOptions: {
    showSearchBox: true,
    showFlags: true,
    searchBoxPlaceholder: "Search for country",
  },
};

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: {
    username: userProfile.value?.bio?.username || "",
    firstName: userProfile.value?.bio?.name?.first || "",
    lastName: userProfile.value?.bio?.name?.last || "",
    phone: `${user.value.phone?.code}${user.value.phone?.number}`,
  },
});

const onSubmit = handleSubmit(async (values: any) => {
  console.log("Form submitted!", values);
  if (!values.photo) {
    delete values.photo;
  }
  const { toast } = useToast();
  if (phoneOptions.value.valid) {
    const formData = new FormData();
    Object.keys({ ...values }).forEach((item) => {
      if (item === "phone") {
        formData.append(
          item,
          JSON.stringify({
            code: `+${phoneOptions.value.countryCallingCode}`,
            number: phoneOptions.value.nationalNumber,
          }),
        );
      } else {
        formData.append(item, values[item]);
      }
    });
    await updateUserProfile(formData);
    emit("completed", "user");
  } else {
    toast({
      variant: "destructive",
      title: "Validation Error",
      description: "The provided phone number is not valid",
    });
  }
});
</script>

<style></style>
