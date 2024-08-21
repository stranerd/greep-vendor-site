<template>
  <h2 class="text-2xl font-semibold">Orders > {{ activeOrderTab.name }}</h2>
  <div class="mt-[25px] flex items-center justify-between">
    <form class="w-full max-w-[570px]">
      <div class="relative flex w-full">
        <Search
          class="absolute left-4 top-[50%] h-[24px] w-[24px] translate-y-[-50%] text-muted-foreground"
        />
        <Separator orientation="vertical" />
        <Input
          type="search"
          placeholder="Search "
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
    <component :is="activeOrderTab.component" />
  </div>
</template>

<script setup lang="ts">
import ActiveOrders from "~/components/section/Orders/ActiveOrders/index.vue";
import OrderHistory from "~/components/section/Orders/OrderHistory/index.vue";

import { Search } from "lucide-vue-next";
import { GP_ROUTES } from "~/constants/route-names";
definePageMeta({
  layout: "dashboard",
  middleware: ["authenticated", "vendor-foods"],
  name: GP_ROUTES.VENDOR.FOOD.ORDERS,
});

const orderTabs = shallowRef([
  { name: "Active", component: ActiveOrders },
  { name: "History", component: OrderHistory },
]);

const activeOrderTab = shallowRef(orderTabs.value[0]);
</script>

<style scoped>
.tab-link {
  @apply flex w-40 justify-center border-b-2 border-transparent p-2 text-black;
}
.active-tab-link {
  @apply border-b-2 border-black font-medium text-black;
}
</style>
