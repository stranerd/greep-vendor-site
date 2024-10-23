<template>
  <header
    class="sticky top-0 z-[20] flex h-14 w-full items-center gap-4 border-b-[1px] border-b-[#E0E2E4] bg-[#FFFFFF] lg:h-[76px]"
  >
    <Sheet>
      <SheetTrigger as-child>
        <Button variant="outline" size="icon" class="ml-4 shrink-0 md:hidden">
          <Menu class="h-5 w-5" />
          <span class="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" class="flex flex-col">
        <nav class="mt-12 grid gap-2 text-lg font-medium">
          <SheetClose as-child v-for="(navItem, i) in navLinks" :key="i">
            <nuxt-link
              v-if="navItem.to"
              :to="{ name: navItem.to }"
              :class="
                route.meta.name && route.meta.name.includes(navItem.to)
                  ? 'bg-[#001726] !text-[#fff]'
                  : ''
              "
              class="mb-2 flex items-center gap-4 rounded-[4px] px-2 py-2 text-[16px] leading-[28px] text-muted-foreground transition-all hover:text-primary"
            >
              <component :is="navItem.icon" class="h-6 w-6" />

              {{ navItem.name }}
            </nuxt-link>
            <div
              v-else
              class="!hover:text-[#ffffff] flex cursor-pointer items-center gap-4 rounded-[4px] px-2 py-2 text-[16px] leading-[28px] !text-[#FF5656] text-muted-foreground transition-all"
              @click="logoutUser"
            >
              <component :is="navItem.icon" class="h-6 w-6" />

              {{ navItem.name }}
            </div>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
    <div class="container flex items-center px-[20px] md:px-[2rem]">
      <div class="w-full flex-1">
        <!-- <form>
          <div class="relative">
            <Search
              class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
            />
            <Input
              type="search"
              placeholder="Search products..."
              class="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form> -->
      </div>
      <div class="flex items-center">
        <div>
          <Button variant="outline" size="icon" class="ml-auto h-8 w-8">
            <img
              src="/images/icons/notification.svg"
              alt="Notifications"
              class="h-[20px] w-[20px]"
            />
            <span class="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div class="ml-3 mr-[36px] grow">
          <h6
            class="text-right text-[14px] font-medium leading-[20px] text-[#212B36]"
          >
            {{ displayName }}
          </h6>
          <p class="text-right text-[12px] leading-[14px] text-[#637381]">
            Vendor
          </p>
        </div>
        <client-only>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <div class="flex">
                <Button variant="secondary" size="icon" class="rounded-full">
                  <Avatar>
                    <AvatarImage :src="user?.photo?.link" alt="user" />
                    <AvatarFallback>{{ displayName[0] }}</AvatarFallback>
                  </Avatar>
                  <span class="sr-only">Toggle user menu</span>
                </Button>

                <!-- <img src="/images/icons/chevron-down.svg" alt="chevron" /> -->
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem @click="router.push('/vendor/settings')"
                >Settings</DropdownMenuItem
              >
              <DropdownMenuItem @click="router.push('/vendor/support')"
                >Support</DropdownMenuItem
              >
              <DropdownMenuSeparator />
              <DropdownMenuItem @click="logoutUser">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </client-only>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
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
  Users,
  ClipboardList,
  BookmarkMinus,
  Settings,
  MessageCircleQuestion,
  LogOut,
} from "lucide-vue-next";

import { TicketDiscountIcon , Wallet1Icon} from "@placetopay/iconsax-vue/outline";
import { GP_CONSTANTS } from "~/constants";
import { GP_ROUTES } from "~/constants/route-names";
import { useAuthStore } from "@/store/useAuthStore";

const authStore = useAuthStore();
const { apiLoadingStates, userProfile, user } = storeToRefs(authStore);
const { getUserProfile, updateUserProfile, logoutUser } = authStore;

const displayName = computed(
  () => user.value?.allNames?.first || user.value?.username,
);

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
