<template>
  <BreadCrumb :routes="routes" />
  <div
    class="mb-6 mt-[25px] flex w-full flex-col items-center justify-between gap-4 lg:flex-row"
  >
    <form class="w-full max-w-full lg:max-w-[576px]">
      <div class="relative flex w-full">
        <Search
          class="absolute left-4 top-[50%] h-[24px] w-[24px] translate-y-[-50%] text-muted-foreground"
        />
        <Separator orientation="vertical" />
        <Input
          type="search"
          placeholder="Search by location, name, order id, etc. "
          v-model="searchTerm"
          class="h-[48px] w-full appearance-none rounded-[99px] bg-background px-[48px] shadow-none lg:w-full"
        />
        <Separator orientation="vertical" />
        <img
          class="absolute right-4 top-[50%] h-[24px] w-[24px] translate-y-[-50%] text-muted-foreground"
          src="/images/icons/arrangevertical.svg"
          alt="Arrange"
        />
      </div>
    </form>

    <div class="grid w-full grid-cols-2 justify-between gap-3 lg:w-fit">
      <div class="flex items-center gap-[10px] text-[14px] leading-[21px]">
        <client-only>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button class="flex w-full justify-start gap-x-2 lg:w-44">
                <Arrow3Icon class="h-5 w-5 text-white" />
                <span class="flex-1 text-sm">{{
                  selectedSortOption.label
                }}</span></Button
              >
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <!-- <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator /> -->
              <DropdownMenuItem
                v-for="option in sortOptions"
                @click="
                  getRecentOrders({ sort: JSON.stringify(option.sortQuery) });
                  selectedSortOption = option;
                "
              >
                {{ option.label }}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </client-only>
      </div>

      <Button
        variant="primary"
        class="lg:w-44"
        rounded="md"
        @click="isDialogOpen = true"
        ><CirclePlus class="mr-[10px] h-5 w-5" /> Create Order</Button
      >
    </div>
  </div>
  <div class="my-5 flex w-full items-center justify-center gap-4">
    <button
      v-for="(tab, index) in orderTabs"
      key="index"
      class="tab-link"
      :class="activeOrderTab.name === tab.name ? 'active-tab-link' : ''"
      @click="activeOrderTab = tab"
    >
      {{ tab.name }}
    </button>
  </div>
  <div class="overflow-y-auto lg:h-[400px]">
    <component
      :is="activeOrderTab.component"
      :searchTerm="searchTerm"
      :orders="ordersList"
    />
  </div>
  <client-only>
    <CreateOrderModal
      v-if="isDialogOpen"
      vendorType="vendorFoods"
      @close="isDialogOpen = false"
      @completed="
        isDialogOpen = false;
        getVendorOrders({});
      "
    />
  </client-only>
</template>

<script setup lang="ts">
import { debounce } from "~/lib/utils";
import { Search, CirclePlus, LoaderCircle } from "lucide-vue-next";
import ActiveOrders from "~/components/section/Orders/ActiveOrders/index.vue";
import OrderHistory from "~/components/section/Orders/OrderHistory/index.vue";

import { GP_ROUTES } from "~/constants/route-names";
import { useMarketPlaceStore } from "~/store/useMarketplace";

import { Arrow3Icon } from "@placetopay/iconsax-vue/outline";
const marketPlaceStore = useMarketPlaceStore();

const { orders, marketplaceLoadingStates, orderMeta } =
  storeToRefs(marketPlaceStore);
const { getVendorOrders, getRecentOrders } = useMarketPlaceStore();

const isDialogOpen = ref(false);
definePageMeta({
  layout: "dashboard",
  middleware: ["authenticated", "vendor-foods"],
  name: GP_ROUTES.VENDOR.FOOD.ORDERS,
});
useHead({
  title: "Vendors Menu",
});

const searchTerm = ref("");

const sortOptions = ref([
  {
    label: "Latest Item",
    sortQuery: [{ field: "createdAt", desc: true }],
  },
  {
    label: "Most Sold",
    sortQuery: [{ field: "meta.orders", desc: true }],
  },
  {
    label: "Highest In Price",
    sortQuery: [{ field: "price.amount", desc: true }],
  },
  {
    label: "Lowest In Price",
    sortQuery: [{ field: "price.amount", desc: false }],
  },
]);

const selectedSortOption = ref(sortOptions.value[0]);

const searchOrders = debounce(async () => {
  await getVendorOrders({
    search: { value: searchTerm.value, fields: ["dropoffNote", "email"] },
  });
}, 1500);

const orderTabs = shallowRef([
  { name: "Active", component: ActiveOrders },
  { name: "History", component: OrderHistory },
]);

const activeOrderTab = shallowRef(orderTabs.value[0]);

const routes = computed(() => [
  { route: { name: GP_ROUTES.VENDOR.FOOD.ORDERS }, title: "Orders" },
  {
    route: { name: GP_ROUTES.VENDOR.FOOD.ORDERS },
    title: activeOrderTab.value.name,
  },
]);

const ordersList = computed(() => {
  const regex = new RegExp(searchTerm.value, "i");
  return orders.value.filter((item) => {
    const products = Object.values(item.users).map((user) => ({
      name: user.bio.name,
      publicName: user.publicName,
    }));

    const productTitle = Object.values(item.products)
      .map(({ title }) => title)
      .join(" ");
    const productUsers = Object.values(item.products).map(({ user }) => ({
      name: user.bio.name,
      publicName: user.publicName,
    }));

    const address = { from: item.from.location, to: item.to.location };
    const Searchable = `${address.from} ${address.to} `;
    const SearchableProduct = products
      .map((i) => `${Object.values(i.name).join(" ")} ${i.publicName}`)
      .join(" ");
    const SearchableProductUsers = productUsers
      .map((i) => `${Object.values(i.name).join(" ")} ${i.publicName}`)
      .join(" ");

    const st = [
      Searchable,
      SearchableProduct,
      SearchableProductUsers,
      productTitle,
      [item.id],
    ].join(" ");
    const checkOrder = st
      .toLowerCase()
      .includes(searchTerm.value.toLowerCase());

    if (checkOrder) return item;
  });
});
</script>

<style scoped>
.tab-link {
  @apply flex w-40 justify-center border-b-2 border-transparent p-2 text-black;
}
.active-tab-link {
  @apply border-b-2 border-black font-medium text-black;
}
</style>
