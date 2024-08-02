<template>
  <div class="">
    <h1 class="text-lg font-semibold md:text-2xl">Orders</h1>
  </div>
  <div
    class="my-4 grid w-[96%] grid-cols-3 gap-4"
    v-if="marketplaceLoadingStates.allOrders === API_STATES.LOADING"
  >
    <div class="flex w-full flex-col gap-2" v-for="i in 3">
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
  <div
    class="my-2 grid w-[96%] grid-cols-3 gap-4"
    v-else-if="marketplaceLoadingStates.allOrders === API_STATES.SUCCESS"
  >
    <div class="flex w-full flex-col gap-2">
      <Button class="w-full bg-[#7C13FF] hover:bg-[#7C13FF]">
        New ({{
          orders.filter(({ activeStatus }) => activeStatus === "created")
            .length
        }})</Button
      >

      <div
        class=""
        v-if="
          orders.filter(({ activeStatus }) => activeStatus === 'created')
            .length > 0
        "
      >
        <OrderCard
          :order="order"
          v-for="order in orders.filter(
            ({ activeStatus }) => activeStatus === 'created',
          )"
          :type="order.activeStatus"
        />
      </div>
      <DisplayState
        message="No new orders, kindly check back!"
        hide-button
        v-else
      />
    </div>
    <div class="flex w-full flex-col gap-2">
      <Button class="hover:bg-bg-[#0250C6] w-full bg-[#0250C6]">
        Kitchen ({{
          orders.filter(({ activeStatus }) => activeStatus === "accepted")
            .length
        }})</Button
      >
      <div
        class=""
        v-if="
          orders.filter(({ activeStatus }) => activeStatus === 'accepted')
            .length > 0
        "
      >
        <OrderCard
          :order="order"
          v-for="order in orders.filter(
            ({ activeStatus }) => activeStatus === 'accepted',
          )"
          :type="order.activeStatus"
        />
      </div>
      <DisplayState
        message="No current orders, accept orders or check back for new order!"
        hide-button
        v-else
      />
    </div>
    <div class="flex w-full flex-col gap-2">
      <Button class="w-full bg-[#006D48] hover:bg-[#006D48]">
        Delivery ({{
          orders.filter(({ activeStatus }) => activeStatus === "shipped")
            .length
        }})</Button
      >
      <div
        class=""
        v-if="
          orders.filter(({ activeStatus }) => activeStatus === 'shipped')
            .length > 0
        "
      >
        <OrderCard
          :order="order"
          v-for="order in orders.filter(
            ({ activeStatus }) => activeStatus === 'shipped',
          )"
          :type="order.activeStatus"
        />
      </div>
      <DisplayState
        message="No shipped orders, ship orders or check back for new order!"
        hide-button
        v-else
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from "lucide-vue-next";
import { useMarketPlaceStore } from "~/store/useMarketplace";
import type { IOrders } from "~/types/modules/marketPlaceModel";
import { API_STATES } from "~/services/constants";
const marketplaceStore = useMarketPlaceStore();
const { orders, marketplaceLoadingStates } = storeToRefs(marketplaceStore);
type OrderTypes = "created" | "accepted" | "shipped";

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
