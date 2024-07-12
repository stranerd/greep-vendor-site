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
          <h4 class="ml-4 text-[16px] font-bold leading-[28px]">Admin Board</h4>
        </div>

        <nav class="grid items-start px-2 text-sm font-medium lg:px-3">
          <div v-for="(navItem, i) in navLinks" :key="i">
            <nuxt-link
              v-if="navItem.to"
              :to="navItem.to"
              :class="{}"
              active-class="bg-[#001726] !text-[#fff]"
              class="mb-2 flex items-center gap-4 rounded-[4px] px-6 py-2 text-[16px] leading-[28px] text-muted-foreground transition-all hover:text-primary"
            >
              <component :is="navItem.icon" class="h-6 w-6" />

              {{ navItem.name }}
            </nuxt-link>
            <div
              v-else
              class="!hover:text-[#ffffff] flex cursor-pointer items-center gap-4 rounded-[4px] px-6 py-2 text-[16px] leading-[28px] !text-[#FF5656] text-muted-foreground transition-all"
              @click="logoutUser"
            >
              <component :is="navItem.icon" class="h-6 w-6" />

              {{ navItem.name }}
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Sidebar,
  Users,
  ClipboardList,
  BookmarkMinus,
  Settings,
  MessageCircleQuestion,
  LogOut,
} from "lucide-vue-next";
import { GP_CONSTANTS } from "~/constants";
import { useAuthStore } from "@/store/useAuthStore";

const authStore = useAuthStore();

const { getUserProfile, updateUserProfile, logoutUser } = authStore;

const userType = computed(() =>
  JSON.parse(localStorage.getItem(GP_CONSTANTS.USER_TYPE) as string),
);

const router = useRouter();

const navLinks = ref([
  {
    to: "/vendor",
    name: "Sales",
    icon: LineChart,
  },
  {
    to:
      userType.value?.vendorType === "foods"
        ? "/vendor/foods/orders"
        : "/vendor/items/orders",
    name: "Orders",
    icon: ClipboardList,
  },
  {
    to:
      userType.value?.vendorType === "foods"
        ? "/vendor/menu"
        : "/vendor/item-manager",
    name: userType.value?.vendorType === "foods" ? "Menu" : "Items Manager",
    icon: BookmarkMinus,
  },
  {
    to: "/vendor/settings",
    name: "Settings",
    icon: Settings,
  },
  {
    to: "/vendor/support",
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
