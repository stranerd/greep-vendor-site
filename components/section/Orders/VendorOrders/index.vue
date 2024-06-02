<template>
  <div class="flex mt-[25px] justify-between items-center">
    <form class="w-full max-w-[576px]">
      <div class="relative flex w-full">
        <Search
          class="absolute left-4 top-[50%] h-[24px] w-[24px] translate-y-[-50%] text-muted-foreground"
        />
        <Separator orientation="vertical" />
        <Input
          type="search"
          placeholder="Search "
          class="w-full appearance-none bg-background px-[48px] rounded-[99px] h-[48px] shadow-none lg:w-full"
        />
        <Separator orientation="vertical" />
        <img
          class="absolute right-4 top-[50%] translate-y-[-50%] h-[24px] w-[24px] text-muted-foreground"
          src="/images/icons/arrangevertical.svg"
          alt="Arrange"
        />
      </div>
    </form>
    <div class="flex">
      <p
        class="flex items-center gap-[10px] text-[14px] leading-[21px] mr-[31px]"
      >
        <span class="bg-[#000] rounded-full h-[7px] w-[7px]"> </span>
        Sort by: Latest Item
      </p>
      <Button
        variant="primary"
        size="lg"
        rounded="md"
        @click="isDialogOpen = true"
        ><CirclePlus class="h-5 w-5 mr-[10px]" /> Create Order</Button
      >
      <client-only>
        <CreateOrderModal
          :isOpen="isDialogOpen"
          @close="isDialogOpen = false"
          @completed="
            isDialogOpen = false;
            getVendorOrders({});
          "
        />
      </client-only>
    </div>
  </div>
  <Skeleton
    v-if="
      marketplaceLoadingStates.allOrders === API_STATES.LOADING &&
      orders.length === 0
    "
    class="h-[500px] w-full"
  />
  <div v-else>
    <DisplayState
      v-if="marketplaceLoadingStates.allOrders === API_STATES.ERROR"
      message="Something went wrong, Please retry"
      button-text="Get Orders"
      @action="getVendorOrders()"
    />
    <VendorHistoryTable v-else source="page" :items="orders" />
  </div>
</template>

<script lang="ts" setup>
import { Search, CirclePlus } from "lucide-vue-next";
import { API_STATES } from "~/services/constants";

import { useMarketPlaceStore } from "~/store/useMarketplace";
const marketPlaceStore = useMarketPlaceStore();

const { orders, marketplaceLoadingStates } = storeToRefs(marketPlaceStore);
const { getVendorOrders } = useMarketPlaceStore();

const isDialogOpen = ref(false);

onMounted(() => {
  console.log({ marketPlaceStore });

  getVendorOrders({});
});
</script>

<style></style>
