<template>
  <div>
    <div class="flex items-center space-x-4">
      <Skeleton class="h-12 w-12 rounded-full" />
      <div class="space-y-2">
        <Skeleton class="h-4 w-[250px]" />
        <Skeleton class="h-4 w-[200px]" />
      </div>
    </div>
    <Skeleton class="h-12 w-12 rounded-full" />
  </div>
  <div v-if="apiLoadingStates.getUserProfile === API_STATES.required_error">
    <div class="flex justify-between">
      <div class="relative h-auto flex align-center justify-center">
        <div class="relative mt-auto">
          <Avatar size="lg" class="w-[153px] h-[153px]">
            <AvatarImage
              src="/images/avatar/article-writer.png"
              alt="Product"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div
            class="absolute flex items-center justify-center bg-[#000000] p-[14px] rounded-full bottom-0 right-0"
          >
            <Camera class="text-[#fff]" />
          </div>
        </div>
      </div>

      <Card class="border-[#E0E2E4] border-[2px] min-w-[368px]">
        <CardHeader class="pt-4 pb-1">
          <CardTitle class="text-[22px]">Estimated Balance</CardTitle>
        </CardHeader>
        <CardContent class="grid gap-1 max-h-[280px] pb-4">
          <div class="flex">
            <h6 class="text-[22px]">₺ 6,250.00</h6>
          </div>
          <small class="text-[12px]">TL Rate: ₺1 = 41</small>
          <div class="flex gap-6">
            <div class="flex flex-col justify-center items-center">
              <Button size="icon" variant="secondary">
                <Plus class="h-[20px] w-[20px]" />
              </Button>
              <small class="text-[12px] font-semibold mt-[6px] block"
                >Deposit</small
              >
            </div>
            <div class="flex flex-col justify-center items-center">
              <Button size="icon" variant="secondary">
                <MoveRight class="h-[20px] w-[20px]" />
              </Button>
              <small class="text-[12px] font-semibold mt-[6px] block"
                >Transfer</small
              >
            </div>
            <div class="flex flex-col justify-center items-center">
              <Button size="icon" variant="secondary">
                <Minus class="h-[20px] w-[20px]" />
              </Button>
              <small class="text-[12px] font-semibold mt-[6px] block"
                >Withdraw</small
              >
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    <div>
      <h1 class="text-lg font-medium md:text-2xl mb-2">African Market</h1>
      <div class="flex gap-[13px] mb-[20px]">
        <MapPin />
        <p class="text-[14px] leading-[21px]">80, Tzon Kennenty Avenue</p>
      </div>
      <div class="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
        <div
          v-for="(profileItem, i) in Object.keys(profileDetails)"
          :key="i"
          class="p-5"
        >
          <h4 class="text-[16px] leading-[20px] font-medium mb-[30px]">
            {{ profileItem }}
          </h4>
          <div class="flex flex-col gap-[35px]">
            <div
              v-for="(item, index) in profileDetails[profileItem]"
              :key="index"
              class="flex items-center justify-between"
            >
              <p class="font-medium text-[14px] leading-[20px]">
                {{ item.title }}
              </p>
              <p
                v-if="item.disabled"
                class="flex font-light cursor-pointer leading-[20px] text-[14px]"
              >
                {{ item.value }}
              </p>
              <p
                v-else
                class="flex font-light cursor-pointer leading-[20px] text-[14px]"
                @click="openDialog(item)"
              >
                {{ item.value }} <FilePenLine class="ml-2" />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="grid gap-4 mt-8 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
        <div
          v-for="(profileItem, i) in Object.keys(authOptions)"
          :key="i"
          class="p-5"
        >
          <h4 class="text-[16px] leading-[20px] font-medium mb-[30px]">
            {{ profileItem }}
          </h4>
          <div class="flex flex-col gap-[35px]">
            <div
              v-for="(item, index) in authOptions[profileItem]"
              :key="index"
              class="flex items-center justify-between"
            >
              <p class="font-medium text-[14px] leading-[20px]">
                {{ item.title }}
              </p>

              <p
                v-if="item.disabled"
                class="flex font-light cursor-pointer leading-[20px] text-[14px]"
              >
                {{ item.value }}
              </p>
              <p
                v-else
                class="flex font-light leading-[20px] text-[14px]"
                @click="openDialog(item)"
              >
                {{ item.value }} <FilePenLine class="ml-2" />
              </p>
            </div>
          </div>
        </div>
      </div>
      <Alert variant="warning" class="">
        <CircleAlert class="w-4 h-4" />
        <!-- <AlertTitle>Error</AlertTitle> -->
        <AlertDescription class="text-[14px] flex justify-between items-center">
          <strong>Secure Your Account </strong>: Two-factor authentication adds
          an extra layer of security to your account. To log in, in addition
          you'll need to provide a 6 digit code
          <Button class="ml-auto">Enable</Button>
        </AlertDescription>
      </Alert>
      <div class="grid gap-4 mt-8 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
        <div
          v-for="(profileItem, i) in Object.keys(otherOptions)"
          :key="i"
          class="p-5"
        >
          <h4 class="text-[16px] leading-[20px] font-medium mb-[30px]">
            {{ profileItem }}
          </h4>
          <div class="flex flex-col gap-[35px]">
            <div
              v-for="(item, index) in otherOptions[profileItem]"
              :key="index"
              class="flex items-center justify-between"
            >
              <p class="font-medium text-[14px] leading-[20px]">
                {{ item.title }}
              </p>

              <p class="flex font-light leading-[20px] text-[14px]">
                {{ item.value }} <FilePenLine class="ml-2" />
              </p>
            </div>
          </div>
        </div>
      </div>
      <Dialog :open="isDialogOpen">
        <DialogContent class="sm:max-w-[425px]" :hideClose="true">
          <DialogHeader>
            <DialogTitle>Edit {{ editDetails.title }}</DialogTitle>

            <X
              class="absolute right-4 top-4 rounded-sm opacity-70 cursor-pointer ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none h-4 2-4 data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
              @click="isDialogOpen = false"
            />
          </DialogHeader>
          <div class="grid gap-4 py-4">
            <div class="grid items-center gap-4">
              <FormField v-slot="{ componentField }" :name="editDetails.title">
                <FormItem>
                  <FormControl>
                    <Input :type="editDetails.field" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit"> Save changes </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Plus,
  Minus,
  MoveRight,
  Camera,
  MapPin,
  FilePenLine,
  CircleAlert,
  X,
} from "lucide-vue-next";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { API_STATES } from "~/services/constants";
import { useAuthStore } from "@/store/useAuthStore";

const authStore = useAuthStore();
const { apiLoadingStates, userProfile } = storeToRefs(authStore);
const { getUserProfile } = authStore;

const editDetails = ref({
  title: "",
  value: "",
});

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(4, {
      message: "Password cannot be less than 4 characters",
    }),
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
  console.log("Form submitted!", values);
});

const isDialogOpen = ref(false);

const openDialog = (details: any) => {
  editDetails.value = details;
  isDialogOpen.value = true;
  console.log({ details });
};

const profileDetails = ref({
  "Vendor Details": [
    {
      title: "Store Name",
      value: "",
      type: "vendor",
      field: "text",
    },
    {
      title: "Store’s Email",
      value: "",
      type: "vendor",
      field: "email",
    },
    {
      title: "Store’s site",
      value: "",
      type: "vendor",
      field: "text",
    },
    {
      title: "Location",
      value: "",
      type: "vendor",
      field: "text",
    },
  ],
  "Personal Details": [
    {
      title: "First Name",
      value: "",
      type: "user",
      field: "text",
    },
    {
      title: "Middle Name",
      value: "",
      type: "user",
      field: "text",
    },
    {
      title: "Surname",
      value: "",
      type: "user",
      field: "text",
    },
    {
      title: "Contact Info",
      value: "",
      type: "user",
      field: "text",
    },
    {
      title: "Email Info",
      value: "johndoe@gmail.com",
      type: "user",
      disabled: true,
    },
  ],
});

const authOptions = ref({
  "Sign In method": [
    {
      title: "Email",
      value: "johndoe@gmail.com",
      disabled: true,
      field: "email",
    },
  ],
  "-": [
    {
      title: "Email",
      value: "johndoe@gmail.com",
      disabled: true,
      field: "email",
    },
  ],
});

const otherOptions = ref({
  Authentication: [
    {
      title: "Passport",
      value: "Add your passport",
      type: "user",
    },
    {
      title: "Residents Permit",
      value: "Add your permit",
      type: "user",
    },
    {
      title: "Email Info",
      value: "johndoe@gmail.com",
      type: "user",
    },
  ],
});

onMounted(() => {
  getUserProfile();
});
</script>

<style></style>
