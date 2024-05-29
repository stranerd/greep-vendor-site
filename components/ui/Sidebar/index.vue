<template>
  <div class="hidden border-r bg-[#FFFFFF] md:block">
    <div class="flex h-full max-h-screen flex-col gap-2">
      <div class="flex h-14 items-center border-b px-4 lg:h-[76px] lg:px-6">
        <nuxt-link to="/admin" class="">
          <img
            src="/images/logos/logo-full-black.svg"
            alt="Greep"
            class="w-[157px] h-auto object-contain"
          />
        </nuxt-link>
      </div>
      <div class="flex-1">
        <div class="px-2 lg:px-3 h-[44px] flex items-center mb-2">
          <h4 class="ml-4 text-[16px] font-bold leading-[28px]">Admin Board</h4>
        </div>

        <nav class="grid items-start px-2 text-sm font-medium lg:px-3">
          <div v-for="(navItem, i) in navLinks" :key="i">
            <nuxt-link
              v-if="navItem.to"
              :to="navItem.to"
              active-class="bg-[#001726] !text-[#fff]"
              class="flex items-center gap-4 mb-2 rounded-[4px] px-6 py-2 text-[16px] leading-[28px] text-muted-foreground transition-all hover:text-primary"
            >
              <component :is="navItem.icon" class="h-6 w-6" />

              {{ navItem.name }}
            </nuxt-link>
            <div
              v-else
              class="flex items-center !text-[#FF5656] cursor-pointer gap-4 rounded-[4px] px-6 py-2 text-[16px] leading-[28px] text-muted-foreground transition-all !hover:text-[#ffffff]"
              @click="router.push('/login')"
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

const router = useRouter();

const navLinks = ref([
  {
    to: "/vendor",
    name: "Sales",
    icon: LineChart,
  },
  {
    to: "/vendor/orders",
    name: "Orders",
    icon: ClipboardList,
  },
  {
    to: "/vendor/item-manager",
    name: "Item Manager",
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
