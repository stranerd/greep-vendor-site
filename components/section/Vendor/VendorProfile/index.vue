<template>
  <div v-if="apiLoadingStates.getUserProfile === API_STATES.LOADING">
    <Skeleton class="w-[153px] h-[153px] mb-2 rounded-full" />
    <Skeleton class="h-7 w-[250px] mb-9" />
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
  <div v-else-if="apiLoadingStates.getUserProfile === API_STATES.SUCCESS">
    <div class="flex justify-between">
      <div class="relative h-auto flex align-center justify-center">
        <div class="relative mt-auto">
          <Avatar size="lg" class="w-[153px] h-[153px]">
            <AvatarImage src="/images/placeholder.png" alt="User" />
            <AvatarFallback>CNx</AvatarFallback>
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
            <h6 class="text-[22px]">
              {{ wallet?.balance?.currency }} {{ wallet?.balance?.amount }}
            </h6>
          </div>
          <!-- <small class="text-[12px]">TL Rate: ₺1 = 41</small> -->
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

    <!-- Vendor image part -->
    <div>
      <h1 class="text-lg font-medium md:text-2xl mb-2">
        {{ userProfile.vendor?.name || "----" }}
      </h1>
      <div class="flex gap-[13px] mb-[20px]">
        <MapPin />
        <p class="text-[14px] leading-[21px]">
          {{ userProfile.vendor?.location?.location || "Location not set" }}
        </p>
      </div>

      <!-- Container for vendor Details -->
      <div class="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
        <div
          v-for="(profileItem, i) in Object.keys(profileDetails)"
          :key="i"
          class="p-5"
        >
          <div class="flex mb-[30px] justify-between items-center">
            <h4 class="text-[16px] leading-[20px] font-medium">
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
              <p class="font-medium text-[14px] leading-[20px] flex gap-2">
                <component :is="item.icon" class="text-primary h-5 w-5" />

                {{ item.title }}
              </p>
              <p
                @click.prevent="openDialog(profileItem)"
                class="flex font-light gap-2 cursor-pointer leading-[20px] text-[14px]"
              >
                {{ item.value || "--" }}

                <EditIcon class="h-5 w-5 hidden" />
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Other Options -->
      <div
        class="grid gap-4 mt-8 border-2 border-gray-100 rounded-lg md:gap-8 lg:grid-cols-1 xl:grid-cols-1"
      >
        <div
          v-for="(profileItem, i) in Object.keys(otherOptions)"
          :key="i"
          class="p-5"
        >
          <h4 class="text-[16px] leading-[20px] font-medium mb-[30px]">
            {{ profileItem }}
          </h4>
          <div class="grid grid-cols-2 w-full gap-[35px]">
            <div
              v-for="(item, index) in otherOptions[profileItem]"
              :key="index"
              class="flex items-center justify-between"
            >
              <p class="font-medium text-[14px] leading-[20px] flex gap-2">
                <component
                  :is="DocumentText1Icon"
                  class="text-primary h-5 w-5"
                />

                {{ item.title }}
              </p>
              <p
                class="flex font-light gap-2 cursor-pointer leading-[20px] text-[14px]"
              >
                {{ item.value || "--" }}

                <EditIcon class="h-5 w-5" />
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Auth Options -->
      <div class="grid gap-4 mt-8 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
        <div
          v-for="(profileItem, i) in Object.keys(authOptions)"
          :key="i"
          class="p-5"
        >
          <div class="flex justify-between">
            <h4 class="text-[16px] leading-[20px] font-medium mb-[30px]">
              {{ profileItem }}
            </h4>
          </div>

          <div class="flex flex-col gap-[35px]">
            <div
              v-for="(item, index) in authOptions[profileItem]"
              :key="index"
              class="flex items-center justify-between"
            >
              <component :is="item.icon" class="text-primary h-5 w-5" />
              <p class="font-medium text-[14px] leading-[20px]">
                {{ item.title }}
              </p>

              <p
                class="flex font-light cursor-pointer leading-[20px] text-[14px]"
              >
                {{ item.value || "--" }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Alert variant="warning" class="">
        <CircleAlert class="w-4 h-4" />
        <!-- <AlertTitle>Error</AlertTitle> -->
        <AlertDescription
          class="text-[14px] flex gap-10 justify-between items-center"
        >
          <strong>Secure Your Account </strong>: Two-factor authentication adds
          an extra layer of security to your account. To log in, in addition
          you'll need to provide a 6 digit code
          <Button class="ml-auto">Enable</Button>
        </AlertDescription>
      </Alert>
    </div>
  </div>

  <Dialog :open="isProfileDialogOpen">
    <DialogContent class="sm:max-w-[425px]" :hideClose="true">
      <DialogHeader>
        <DialogTitle>Edit {{ editDetails.title }}</DialogTitle>

        <X
          class="absolute right-4 top-4 rounded-sm opacity-70 cursor-pointer ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none h-4 2-4 data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          @click="isProfileDialogOpen = false"
        />
      </DialogHeader>
      <UserProfileForm @completed="closeDialog" />
    </DialogContent>
  </Dialog>
  <Dialog :open="isDialogOpen">
    <DialogContent class="sm:max-w-[425px]" :hideClose="true">
      <DialogHeader>
        <DialogTitle>Edit {{ editDetails.title }}</DialogTitle>

        <X
          class="absolute right-4 top-4 rounded-sm opacity-70 cursor-pointer ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none h-4 2-4 data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          @click="isDialogOpen = false"
        />
      </DialogHeader>
      <VendorDetailsForm @completed="closeDialog" />
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

import { API_STATES } from "~/services/constants";
import { useAuthStore } from "@/store/useAuthStore";
import { usePaymentStore } from "@/store/usePayment";

const authStore = useAuthStore();
const paymentStore = usePaymentStore();
const { apiLoadingStates, userProfile, user } = storeToRefs(authStore);
const { getUserProfile } = authStore;
const { getUserWallet } = paymentStore;
const { wallet } = storeToRefs(paymentStore);

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

const profileDetails = computed(() => {
  return {
    "Vendor Details": [
      {
        icon: BuildingIcon,
        title: "Store Name",
        value: userProfile.value.vendor?.name || "",
      },
      {
        icon: SmsIcon,
        title: "Store’s Email",
        value: userProfile.value.vendor?.email || "",
      },
      {
        icon: GlobalIcon,
        title: "Store’s site",
        value: userProfile.value.vendor?.website || "",
      },
      {
        icon: LocationTickIcon,
        title: "Location",
        value: userProfile.value.vendor?.location.location || "",
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
        title: user.value?.authTypes?.includes["email"]
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
  return {
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
      // {
      //   title: 'Email Info',
      //   value: 'johndoe@gmail.com',
      //   type: 'user',
      // },
    ],
  };
});

const closeDialog = (dialog: "vendor" | "user") => {
  if (dialog === "vendor") {
    isDialogOpen.value = false;
  } else {
    isProfileDialogOpen.value = false;
  }
  getUserProfile();
};

onMounted(() => {
  getUserProfile();
  getUserWallet();
});
</script>

<style></style>
