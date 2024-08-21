<template>
  <div class="">
    <h1 class="text-lg font-semibold md:text-2xl">Orders</h1>
  </div>
  <template v-if="marketplaceLoadingStates.allOrders === API_STATES.LOADING">
    <div class="my-4 w-full grid-cols-3 gap-4 lg:grid lg:w-[96%]">
      <div class="my-2 grid w-full gap-4 lg:hidden">
        <div
          class="relative grid w-full grid-cols-[40px,1fr] justify-start gap-4"
          v-for="i in 3"
        >
          <Skeleton class="h-[209px] w-full bg-gray-200" />
          <div class="flex gap-4 overflow-x-auto">
            <div
              class="min-w-[256px] max-w-[256px] animate-pulse overflow-x-auto rounded-lg bg-gray-200 p-2"
              v-for="i in 2"
            >
              <Skeleton class="my-3 h-4 w-4/6 rounded-lg" v-for="i in 3" />
              <div class="flex w-full items-center gap-x-1">
                <Skeleton class="min-h-12 min-w-12 rounded-[50%]" />
                <div class="w-fit">
                  <Skeleton
                    class="my-3 h-4 w-[180px] rounded-lg"
                    v-for="i in 2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hidden w-full flex-col gap-2 md:flex" v-for="i in 3">
        <Skeleton class="h-12 w-full bg-gray-200" />
        <div class="mt-1 animate-pulse bg-gray-200 p-2" v-for="i in 4">
          <Skeleton class="my-3 h-4 w-4/6 rounded-lg" v-for="i in 3" />
          <div class="flex w-full items-center gap-x-5">
            <Skeleton class="h-12 w-12 rounded-[50%]" />
            <div class="w-fit">
              <Skeleton class="my-3 h-4 w-[200px] rounded-lg" v-for="i in 2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <template
    v-else-if="marketplaceLoadingStates.allOrders === API_STATES.SUCCESS"
  >
    <div class="my-2 hidden w-[96%] grid-cols-3 gap-4 lg:grid">
      <div class="flex w-full flex-col gap-2" v-for="order in marketOrders">
        <Button :class="order.buttonClass">
          {{ order.label }} ({{ order.orders.length }})</Button
        >

        <div class="flex flex-col gap-4" v-if="order.orders.length > 0">
          <OrderCard
            :order="ord"
            v-for="ord in order.orders"
            :type="ord.activeStatus"
          />
        </div>
        <DisplayState :message="order.message" hide-button v-else />
      </div>
    </div>

    <div class="my-2 grid gap-4 lg:hidden">
      <div
        class="relative grid w-full grid-cols-[40px,1fr] items-center justify-start gap-4"
        v-for="order in marketOrders"
      >
        <Button
          :class="order.buttonClass"
          class="sticky left-4 z-50 flex !h-[209px] w-10 rotate-0 items-center"
        >
          <span class="block -rotate-90">
            {{ order.label }} ({{ order.orders.length }})</span
          ></Button
        >

        <div
          class="hide-scrollbars flex gap-4 overflow-x-auto"
          v-if="order.orders.length > 0"
        >
          <OrderCard
            :order="ord"
            class="min-w-[256px] max-w-[256px]"
            v-for="ord in order.orders"
            :type="ord.activeStatus"
          />
        </div>

        <DisplayState
          :message="order.message"
          class="mr-auto !h-[209px] justify-self-start"
          hide-button
          v-else
        />
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { Search } from "lucide-vue-next";
import { useMarketPlaceStore } from "~/store/useMarketplace";
import type { IOrders } from "~/types/modules/marketPlaceModel";
import { API_STATES } from "~/services/constants";

const marketplaceStore = useMarketPlaceStore();
const { orders, marketplaceLoadingStates } = storeToRefs(marketplaceStore);
type OrderTypes = "created" | "accepted" | "shipped";
const marketOrders = computed(() => {
  return [
    {
      label: "New",
      buttonClass: "w-full bg-[#7C13FF] hover:bg-[#7C13FF]",
      message: "No new orders, kindly check back!",
      orders: orders.value.filter(
        ({ activeStatus }) => activeStatus === "created",
      ),
    },
    {
      label: "Kitchen",
      buttonClass: "w-full bg-[#0250C6] hover:bg-[#0250C6]",
      message: "No current orders, accept orders or check back for new order!",
      orders: orders.value.filter(
        ({ activeStatus }) => activeStatus === "accepted",
      ),
    },
    {
      label: "Delivery",
      buttonClass: "w-full bg-[#006D48] hover:bg-[#006D48]",
      message: "No shipped orders, ship orders or check back for new order!",
      orders: orders.value.filter(
        ({ activeStatus }) => activeStatus === "shipped",
      ),
    },
  ];
});
onMounted(() => {
  marketplaceStore.getVendorOrders();
});
</script>

<style scoped>
.router-link {
  @apply flex w-40 justify-center border-b-2 border-transparent p-2 text-black;
}
.router-link-exact-active {
  @apply border-b-2 border-black font-medium text-black;
}
</style>
