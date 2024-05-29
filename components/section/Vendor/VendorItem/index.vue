<template>
  <div class="min-h-[80vh]">
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
          ><CirclePlus class="h-5 w-5 mr-[10px]" /> Create Item</Button
        >

        <client-only>
          <CreateProductModal
            :isOpen="isDialogOpen"
            @close="isDialogOpen = false"
            @completed="
              isDialogOpen = false;
              getAllProducts({});
            "
          />
        </client-only>
      </div>
    </div>
    <div class="mt-6">
      <!-- <div class="p-[10px] flex items-center gap-[10px] mb-1 cursor-pointer">
      <img src="/images/icons/arrow-down.svg" alt="Arrow" />
      <p class="text-[14px] text-[#999999]">
        <strong class="mr-[10px] text-[#000]"> Grains </strong>
        4 items
      </p>
    </div> -->
      <div
        v-if="
          marketplaceLoadingStates.getProducts === API_STATES.LOADING &&
          products?.length === 0
        "
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div
          v-for="(_, i) in 12"
          :key="i"
          class="rounded-[8px] overflow-hidden min-h-[280px] border-[#EBEBEB] border-[0px]"
        >
          <Skeleton class="h-[140px]" />
          <div class="px-4">
            <Skeleton class="h-[20px] mt-4 w-[50%]" />
            <Skeleton class="h-[15px] mt-3 w-[60%]" />
            <Skeleton class="h-[15px] mt-3 w-[80%]" />
            <div class="flex justify-between">
              <Skeleton class="h-[25px] mt-4 w-[25%]" />
              <Skeleton class="h-[25px] mt-4 w-[25%]" />
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <DisplayState
          v-if="marketplaceLoadingStates.getProducts === API_STATES.ERROR"
          class="my-[80px]"
          message="Something went wrong, Please refresh"
          buttonText="Refresh"
          @action="getAllProducts()"
        />
        <div v-else>
          <div
            v-if="products?.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <ItemCard v-for="(item, i) in products" :key="i" :cardData="item" />
          </div>
          <DisplayState
            v-else
            class="my-[80px]"
            message="No items to display. Start creating or uploading items to manage them here!"
            hideButton
          />
        </div>
      </div>
    </div>

    <!-- <div>
    <div class="p-[10px] flex items-center gap-[10px] mb-1 cursor-pointer">
      <img src="/images/icons/arrow-down.svg" alt="Arrow" />
      <p class="text-[14px] text-[#999999]">
        <strong class="mr-[10px] text-[#000]"> Seasonings </strong>
        5 items
      </p>
    </div>
    <div class="grid grid-cols-4 gap-4">
      <ItemCard v-for="(item, i) in seasonings" :key="i" :cardData="item" />
    </div>
  </div> -->
  </div>
</template>

<script lang="ts" setup>
import { Search, CirclePlus } from "lucide-vue-next";
import { API_STATES } from "~/services/constants";
import { useMarketPlaceStore } from "@/store/useMarketplace";

const marketplaceStore = useMarketPlaceStore();
const { products, marketplaceLoadingStates } = storeToRefs(marketplaceStore);
const { getAllProducts } = marketplaceStore;

const isDialogOpen = ref(false);

onMounted(() => {
  getAllProducts({});
});
</script>

<style></style>
