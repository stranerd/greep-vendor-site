<template>
  <BreadCrumb :routes="routes" />
  <div class="mt-[25px] flex items-center justify-between">
    <form class="w-full max-w-[570px]">
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
</template>

<script setup lang="ts">
import ActiveOrders from "~/components/section/Orders/ActiveOrders/index.vue";
import OrderHistory from "~/components/section/Orders/OrderHistory/index.vue";

import { Search } from "lucide-vue-next";
import { GP_ROUTES } from "~/constants/route-names";
import { useMarketPlaceStore } from "~/store/useMarketplace";

const { orders } = storeToRefs(useMarketPlaceStore());
definePageMeta({
  layout: "dashboard",
  middleware: ["authenticated", "vendor-foods"],
  name: GP_ROUTES.VENDOR.FOOD.ORDERS,
});
useHead({
  title: "Vendors Menu",
});

const searchTerm = ref("");

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
