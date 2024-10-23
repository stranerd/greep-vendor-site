<template>
  <div class="hidden border-r bg-[#FFFFFF] md:block">
    <div class="flex h-full max-h-screen flex-col gap-2">
      <div class="flex h-14 items-center border-b px-4 lg:h-[76px] lg:px-6">
        <nuxt-link to="/vendor" class="">
          <img
            src="/images/logos/logo-full-black.svg"
            alt="Greep"
            class="h-auto w-[157px] object-contain"
          />
        </nuxt-link>
      </div>
      <div class="flex-1">
        <div class="mb-2 flex h-[44px] items-center px-2 lg:px-3">
          <h4 class="ml-4 text-[16px] font-bold leading-[28px]">
            {{ userProfile.vendor?.name }}
          </h4>
        </div>

        <nav class="grid items-start px-2 text-sm font-medium lg:px-3">
          <div v-for="(navItem, i) in navLinks" :key="i">
            <nuxt-link
              v-if="navItem.to"
              :to="{ name: navItem.to }"
              :class="
                route.meta.name && route.meta.name.includes(navItem.to)
                  ? 'bg-[#001726] !text-[#fff]'
                  : ''
              "
              class="mb-2 flex items-center gap-4 rounded-[4px] px-6 py-2 text-[16px] leading-[28px] text-muted-foreground transition-all hover:text-primary"
            >
              <component :is="navItem.icon" class="h-6 w-6" />

              {{ navItem.name }}
            </nuxt-link>
            <div
              v-else
              class="!hover:text-[#ffffff] flex cursor-pointer items-center gap-4 rounded-[4px] px-6 py-2 text-[16px] leading-[28px] !text-[#FF5656] text-muted-foreground transition-all"
              @click="showLogoutModal = true"
            >
              <component :is="navItem.icon" class="h-6 w-6" />

              {{ navItem.name }}
            </div>
          </div>
        </nav>
      </div>
    </div>
    <AlertDialog v-model:open="showLogoutModal">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Do you really want to logout ?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction @click="logoutUser">Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<script setup lang="ts">
import {
  LineChart,
  ClipboardList,
  BookmarkMinus,
  Settings,
  MessageCircleQuestion,
  LogOut,
} from "lucide-vue-next";

import {
  TicketDiscountIcon,
  Wallet1Icon,
} from "@placetopay/iconsax-vue/outline";

import { GP_CONSTANTS } from "~/constants";
import { GP_ROUTES } from "~/constants/route-names";
import { useAuthStore } from "@/store/useAuthStore";

const authStore = useAuthStore();
const showLogoutModal = ref(false);

const { userProfile } = storeToRefs(useAuthStore());
const { getUserProfile, updateUserProfile, logoutUser } = authStore;

const userType = computed(() =>
  JSON.parse(localStorage.getItem(GP_CONSTANTS.USER_TYPE) as string),
);

const router = useRouter();
const route = useRoute();

const navLinks = ref([
  {
    to: GP_ROUTES.VENDOR.DASHBOARD,
    name: "Sales",
    icon: LineChart,
  },
  {
    to:
      userType.value?.vendorType === "foods"
        ? GP_ROUTES.VENDOR.FOOD.ORDERS
        : GP_ROUTES.VENDOR.ITEMS.ORDERS,
    name: "Orders",
    icon: ClipboardList,
  },
  {
    to:
      userType.value?.vendorType === "foods"
        ? GP_ROUTES.VENDOR.FOOD.MENU
        : GP_ROUTES.VENDOR.ITEMS.ITEMS_MANAGER,
    name: userType.value?.vendorType === "foods" ? "Menu" : "Items Manager",
    icon: BookmarkMinus,
  },

  {
    to: GP_ROUTES.VENDOR.PROMOTIONS,
    name: "Promo Manager",
    icon: TicketDiscountIcon,
  },
  {
    to: GP_ROUTES.VENDOR.WALLETS.OVERVIEW,
    name: "Wallet",
    icon: Wallet1Icon,
  },
  {
    to: GP_ROUTES.VENDOR.SETTINGS,
    name: "Settings",
    icon: Settings,
  },
  {
    to: GP_ROUTES.VENDOR.SUPPORT,
    name: "Support",
    icon: MessageCircleQuestion,
  },
  {
    name: "Logout",
    icon: LogOut,
    action: true,
  },
]);
</script>

<style></style>
