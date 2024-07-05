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
          v-model="searchTerm"
          class="w-full appearance-none bg-background px-[48px] rounded-[99px] h-[48px] shadow-none lg:w-full"
          @input="searchOrders"
        />
        <Separator orientation="vertical" />
        <LoaderCircle
          v-if="marketplaceLoadingStates.allOrders === API_STATES.LOADING"
          class="absolute right-4 top-[12px] h-[24px] w-[24px] animate-spin"
        />
        <!-- <img
          class=" text-muted-foreground"
          src="/images/icons/arrangevertical.svg"
          alt="Arrange"
        /> -->
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
    <div v-else class="flex flex-col h-full justify-between">
      <div class="h-full max-h-[67vh] min-h-[66vh] overflow-y-scroll">
        <VendorHistoryTable source="page" :items="orders" />
      </div>
      <Pagination
        :meta="orderMeta"
        :loading="marketplaceLoadingStates.allOrders === API_STATES.LOADING"
        @paginate="paginateData"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { debounce } from "~/lib/utils";
import { Search, CirclePlus, LoaderCircle } from "lucide-vue-next";
import { API_STATES } from "~/services/constants";

import { useMarketPlaceStore } from "~/store/useMarketplace";
const marketPlaceStore = useMarketPlaceStore();

const { orders, marketplaceLoadingStates, orderMeta } =
  storeToRefs(marketPlaceStore);
const { getVendorOrders } = useMarketPlaceStore();

const isDialogOpen = ref(false);

const searchTerm = ref("");

const searchOrders = debounce(async () => {
  await getVendorOrders({
    search: { value: searchTerm.value, fields: ["dropoffNote", "email"] },
  });
}, 1500);

const paginateData = (params: { page: number }) => {
  let payload = { ...params } as Record<string, any>;
  if (searchTerm.value) {
    payload = {
      ...payload,
      search: { value: searchTerm.value, fields: ["dropoffNote", "email"] },
    };
  }
  getVendorOrders({
    ...payload,
  });
};

onMounted(() => {
  getVendorOrders({
    page: 1,
  });
});
</script>

<style></style>
