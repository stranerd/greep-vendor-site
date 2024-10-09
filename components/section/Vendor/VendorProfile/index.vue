<template>
  <div v-if="apiLoadingStates.getUserProfile === API_STATES.LOADING">
    <div class="relative mb-0 flex flex-col">
      <Skeleton class="mb-2 h-[153px] w-full" />
      <Skeleton
        class="relative -top-20 left-10 h-[153px] w-[153px] rounded-full border-8 border-white lg:left-20"
      />
    </div>
    <Skeleton class="mb-9 h-7 w-[250px]" />
    <div class="flex justify-between">
      <div class="flex items-center space-x-4">
        <div class="flex flex-col space-y-4">
          <Skeleton v-for="(_, i) in 4" :key="i" class="h-7 w-[350px]" />
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <div class="flex flex-col space-y-4">
          <Skeleton v-for="(_, i) in 4" :key="i" class="h-7 w-[350px]" />
        </div>
      </div>
    </div>
  </div>

  <!--  -->
  <div
    v-else-if="apiLoadingStates.getUserProfile === API_STATES.SUCCESS"
    class="duration-500"
  >
    <div class="flex flex-col justify-between md:flex-row">
      <div
        :style="{
          backgroundImage:
            userProfile.type.banner !== null
              ? `url(${userProfile.type.banner.link})`
              : `url('/images/vendor-profile.png')`,
        }"
        class="align-center relative mb-20 flex h-28 w-full justify-start rounded-lg bg-cover object-cover pt-10 lg:h-auto"
      >
        <div
          class="absolute bottom-4 right-4 flex items-center justify-center rounded-full bg-[#000000] p-[14px]"
        >
          <Camera class="text-[#fff]" @click="updateCoverImage" />
        </div>
        <div class="relative left-10 top-4 mt-auto lg:left-20 lg:top-20">
          <Avatar
            size="lg"
            class="h-32 w-32 border-8 border-white lg:h-[153px] lg:w-[153px]"
          >
            <AvatarImage :src="user.photo.link" alt="User" />
            <AvatarFallback class="text-black">CNx</AvatarFallback>
          </Avatar>
          <div
            class="absolute bottom-0 right-0 flex items-center justify-center rounded-full bg-[#000000] p-[14px]"
          >
            <Camera class="text-[#fff]" @click="updateProfilePicture" />
          </div>
        </div>
      </div>

      <Card hidden class="my-4 border-[2px] border-[#E0E2E4] lg:min-w-[368px]">
        <CardHeader class="pb-1 pt-4">
          <CardTitle class="text-[22px]">Estimated Balance</CardTitle>
        </CardHeader>
        <CardContent class="grid max-h-[280px] gap-1 pb-4">
          <div class="flex">
            <h6 class="text-[22px]">
              {{
                gpNumbers.formatCurrency(
                  Number(wallet?.balance?.amount),
                  wallet?.balance?.currency,
                )
              }}
            </h6>
          </div>
          <!-- <small class="text-[12px]">TL Rate: ₺1 = 41</small> -->
          <div class="flex gap-6">
            <div class="flex flex-col items-center justify-center">
              <Button size="icon" variant="secondary">
                <Plus class="h-[20px] w-[20px]" />
              </Button>
              <small class="mt-[6px] block text-[12px] font-semibold"
                >Deposit</small
              >
            </div>
            <div class="flex flex-col items-center justify-center">
              <Button size="icon" variant="secondary">
                <MoveRight class="h-[20px] w-[20px]" />
              </Button>
              <small class="mt-[6px] block text-[12px] font-semibold"
                >Transfer</small
              >
            </div>
            <div class="flex flex-col items-center justify-center">
              <Button size="icon" variant="secondary">
                <Minus class="h-[20px] w-[20px]" />
              </Button>
              <small class="mt-[6px] block text-[12px] font-semibold"
                >Withdraw</small
              >
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Vendor image part -->
    <div class="">
      <div class="flexs my-4 justify-between lg:my-8 lg:block">
        <h1 class="mb-2 text-lg font-medium md:text-2xl lg:flex">
          {{ userProfile.type?.name || "----" }}
        </h1>
        <div class="flex gap-[13px] lg:mb-[20px]">
          <MapPin class="text-primary" />
          <p class="text-[14px] leading-[21px]">
            {{ userProfile.type?.location?.location || "Location not set" }}
          </p>
        </div>
      </div>

      <!-- Container for vendor Details -->
      <div class="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
        <div
          v-for="(profileItem, i) in Object.keys(profileDetails)"
          :key="i"
          class="p-5"
        >
          <div class="mb-[30px] flex items-center justify-between">
            <h4 class="text-[16px] font-medium leading-[20px]">
              {{ profileItem }}
            </h4>
            <Button class="" size="icon" @click="openDialog(profileItem)">
              <EditIcon class="h-5 w-5"
            /></Button>
          </div>

          <!-- Tabs for Vendor Details -->

          <div class="flex flex-col gap-[35px]">
            <div
              v-for="(item, index) in profileDetails[profileItem]"
              :key="index"
              class="flex items-center justify-between"
            >
              <p class="flex gap-2 text-[14px] font-medium leading-[20px]">
                <component :is="item.icon" class="h-5 w-5 text-primary" />

                {{ item.title }}
              </p>
              <p
                @click.prevent="openDialog(profileItem)"
                class="flex cursor-pointer gap-2 text-[14px] font-light leading-[20px]"
              >
                {{ item.value || "--" }}

                <EditIcon class="hidden h-5 w-5" />
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Other Options -->
      <div
        class="mt-8 grid gap-4 rounded-lg border-2 border-gray-100 md:gap-8 lg:grid-cols-1 xl:grid-cols-1"
      >
        <div
          v-for="(profileItem, i) in Object.keys(otherOptions)"
          :key="i"
          class="p-5"
        >
          <div class="mb-[30px] flex items-center justify-between">
            <h4 class="text-[16px] font-medium leading-[20px]">
              {{ profileItem }}
            </h4>
            <Button class="hidden" size="icon" @click="openDialog(profileItem)">
              <EditIcon class="h-5 w-5"
            /></Button>
          </div>

          <div class="grid w-full gap-[35px] lg:grid-cols-2">
            <div
              v-for="(item, index) in otherOptions[profileItem]"
              :key="index"
              class="flex items-center justify-between"
            >
              <p class="flex gap-2 text-[14px] font-medium leading-[20px]">
                <component
                  :is="DocumentText1Icon"
                  class="h-5 w-5 text-primary"
                />

                {{ item.title }}
              </p>
              <p
                class="flex cursor-pointer gap-2 whitespace-nowrap text-[14px] font-light leading-[20px]"
              >
                {{ item.value || "--" }}
                <EditIcon class="h-5 w-5" @click="item.uploadFunction" />
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Auth Options -->
      <div class="mt-8 grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
        <div
          v-for="(profileItem, i) in Object.keys(authOptions)"
          :key="i"
          class="p-5"
        >
          <div class="flex justify-between">
            <h4 class="mb-[30px] text-[16px] font-medium leading-[20px]">
              {{ profileItem }}
            </h4>
          </div>

          <div class="flex flex-col gap-[35px]">
            <div
              v-for="(item, index) in authOptions[profileItem]"
              :key="index"
              class="flex items-center justify-between"
            >
              <div class="flex gap-2 text-[14px] font-medium leading-[20px]">
                <component :is="item.icon" class="h-5 w-5 text-primary" />
                <p class="text-[14px] font-medium leading-[20px]">
                  {{ item.title }}
                </p>
              </div>

              <p
                class="flex cursor-pointer text-[14px] font-light leading-[20px]"
              >
                {{ item.value || "--" }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <BusinessHours />

      <Alert variant="warning" class="">
        <CircleAlert class="h-4 w-4" />
        <!-- <AlertTitle>Error</AlertTitle> -->
        <AlertDescription
          class="flex flex-col items-center justify-between gap-10 text-[14px]"
        >
          <span class="flex">
            <span class="">
              <strong class="inline">Secure Your Account </strong>: Two-factor
              authentication adds an extra layer of security to your account. To
              log in, in addition you'll need to provide a 6 digit code
            </span>
            <Button class="hidden md:ml-auto lg:block">Enable</Button>
          </span>
        </AlertDescription>
        <Button class="mt-2 w-full lg:hidden">Enable</Button>
      </Alert>
    </div>
  </div>

  <div
    v-if="isDialogOpen"
    class="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center overflow-hidden bg-black/50"
  >
    <transition name="fade" appear>
      <Card class="w-[400px] px-5 py-4" v-if="isDialogOpen">
        <div
          class="relative mb-5 flex items-center justify-between text-xl font-semibold"
        >
          <h2 class="flex items-center justify-start">
            Edit {{ editDetails.title }}
          </h2>

          <X
            class="2-4 absolute right-4 h-4 cursor-pointer rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            @click="isDialogOpen = false"
          />
        </div>
        <VendorDetailsForm @completed="closeDialog" />
      </Card>
    </transition>
  </div>

  <Dialog :open="isProfileDialogOpen">
    <DialogContent class="sm:max-w-[425px]" :hideClose="true">
      <DialogHeader>
        <DialogTitle>Edit {{ editDetails.title }}</DialogTitle>

        <X
          class="2-4 absolute right-4 top-4 h-4 cursor-pointer rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          @click="isProfileDialogOpen = false"
        />
      </DialogHeader>
      <UserProfileForm @completed="closeDialog" />
    </DialogContent>
  </Dialog>
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

import {
  SmsIcon,
  BuildingIcon,
  GlobalIcon,
  LocationTickIcon,
  EditIcon,
  Frame1Icon,
  // ,GoogleIcon,
  BagCrossIcon,
  CallIcon,
  DocumentText1Icon,
} from "@placetopay/iconsax-vue/outline";

import { useUploadStore } from "~/store/useUploadStore";
import { API_STATES } from "~/services/constants";
import { useAuthStore } from "@/store/useAuthStore";
import { usePaymentStore } from "@/store/usePayment";
import { useToast } from "@/components/library/toast/use-toast";

const uploadStore = useUploadStore();
const authStore = useAuthStore();
const paymentStore = usePaymentStore();
const { apiLoadingStates, userProfile, user } = storeToRefs(authStore);
const { getUserProfile, updateUserProfile, updateVendorRoles } = authStore;

const { wallet } = storeToRefs(paymentStore);
const { toast } = useToast();
const editDetails = ref<{
  title: string;
}>({
  title: "",
});

const isDialogOpen = ref(false);
const isProfileDialogOpen = ref(false);

const openDialog = (modalType: any) => {
  editDetails.value = { title: modalType };
  if (modalType === "Vendor Details") {
    isDialogOpen.value = true;
  } else if (modalType === "Personal Details") {
    isProfileDialogOpen.value = true;
  }
};

const updateProfilePicture = () => {
  const { name, username, phone } = user.value;
  fileUploader({
    fieldName: "photo",
    message: "Profile picture update successful",
    data: { firstName: name.first, lastName: name.last, username, phone },
    uploadFunction: updateUserProfile,
  });
};

const updateCoverImage = () => {
  const { banner, residentPermit, passport, ...data } = userProfile.value.type;
  fileUploader({
    fieldName: "banner",
    data,
    message: "Cover image update successful",
    uploadFunction: updateVendorRoles,
  });
};

const profileDetails = computed(() => {
  return {
    "Vendor Details": [
      {
        icon: BuildingIcon,
        title: "Store Name",
        value:
          userProfile.value.type?.name || userProfile.value.vendor?.name || "",
      },
      {
        icon: SmsIcon,
        title: "Store’s Email",
        value:
          userProfile.value.type?.email ||
          userProfile.value.vendor?.email ||
          "",
      },
      {
        icon: GlobalIcon,
        title: "Store’s site",
        value:
          userProfile.value.type?.website ||
          userProfile.value.vendor?.website ||
          "",
      },
      {
        icon: LocationTickIcon,
        title: "Location",
        value:
          userProfile.value.type?.location?.location ||
          userProfile.value.vendor?.location?.location ||
          "",
      },
    ],
    "Personal Details": [
      // {
      //   title: 'Username',
      //   value: userProfile.value?.bio?.username || '',
      //   icon: Frame1Icon,
      // },
      {
        title: "First Name",
        value: userProfile.value?.bio?.name?.first || "",
        icon: Frame1Icon,
      },
      {
        title: "Surname",
        value: userProfile.value?.bio?.name?.last || "",
        icon: Frame1Icon,
      },
      {
        title: "Contact Info",
        value: `${user.value?.phone?.code || ""}${
          user.value?.phone?.number || ""
        }`,
        icon: CallIcon,
      },
      {
        title: "Email Info",
        value: user.value?.email,
        icon: SmsIcon,
        disabled: true,
      },
    ],
  };
});

const authOptions = computed(() => {
  return {
    "Sign In method": [
      {
        title: user.value?.authTypes?.includes("email")
          ? "Email"
          : user.value?.authTypes?.[0],
        value: user.value?.email,
        disabled: true,
        field: "email",
        icon: BagCrossIcon,
      },
    ],
    // "": [
    //   {
    //     title: "Email",
    //     value: "johndoe@gmail.com",
    //     disabled: true,
    //     field: "email",
    //   },
    // ],
  };
});

const otherOptions = computed(() => {
  const { banner, passport, residentPermit, ...data } = userProfile.value.type;
  return {
    Authentication: [
      {
        title: "Passport",
        value: userProfile.value?.type?.passport?.name ?? "Add your passport",
        type: "user",

        uploadFunction: () =>
          fileUploader({
            fieldName: "passport",
            data,
            message: "passport update successful",
            uploadFunction: updateVendorRoles,
          }),
      },
      {
        title: "Residents Permit",
        value:
          userProfile.value?.type?.residentPermit?.name ?? "Add your permit",
        type: "user",
        uploadFunction: () =>
          fileUploader({
            fieldName: "residentPermit",
            data,
            message: "Residence permit update successful",
            uploadFunction: updateVendorRoles,
          }),
      },
      // {
      //   title: 'Email Info',
      //   value: 'johndoe@gmail.com',
      //   type: 'user',
      // },
    ],
  };
});

const closeDialog = async (dialog: "vendor" | "user") => {
  // if (dialog === "vendor") {
  //   isDialogOpen.value = false;
  // } else {
  isDialogOpen.value = false;
  isProfileDialogOpen.value = false;
  // }

  getUserProfile();
};

const fileUploader = async (data: {
  fieldName: string;
  uploadFunction: Function;
  message?: string;
  data?: object | any;
  callbacks?: Function[];
  dataTypes?: string | string[];
  acceptedTypes?: string | string[];
}) => {
  try {
    if (data.dataTypes) uploadStore.dataTypes = data.dataTypes;
    if (data.acceptedTypes) uploadStore.acceptedTypes = data.acceptedTypes;

    const result = await uploadStore.openModal({
      dataTypes: ["image/jpeg", "image/jpg", "image/png"],
      acceptedTypes: "image/jpeg,image/jpg,image/png",
    });
    if (result) {
      const formData = new FormData();
      if (data.data) {
        Object.keys(data.data).map((item) =>
          formData.append(item, JSON.stringify(data.data[item])),
        );
      }
      formData.append(data.fieldName, result[0]);

      const res = true;
      await data.uploadFunction(formData);
      if (res) {
        if (data.callbacks) data.callbacks.map((cb) => cb());

        toast({ description: data.message ?? " file upload successful" });
        uploadStore.uploadComplete();
      } else {
        toast({ description: "file upload failed" });
        uploadStore.uploadFailed();
        fileUploader(data);
      }
    }
  } catch (error) {}
};
</script>

<style></style>
