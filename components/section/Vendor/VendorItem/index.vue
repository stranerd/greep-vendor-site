<template>
  <div class="min-h-[80vh] w-full">
    <div
      class="mt-[25px] flex w-full flex-col items-center justify-between gap-4 lg:flex-row"
    >
      <form class="w-full max-w-full lg:max-w-[576px]">
        <div class="relative flex w-full">
          <Search
            class="absolute left-4 top-[50%] h-[24px] w-[24px] translate-y-[-50%] text-muted-foreground"
          />
          <Separator orientation="vertical" />
          <Input
            type="search"
            placeholder="Search by item title "
            v-model="searchTerm"
            class="h-[48px] w-full appearance-none rounded-[99px] bg-background px-[48px] shadow-none lg:w-full"
            @input="searchProducts"
          />
          <Separator orientation="vertical" />
          <LoaderCircle
            v-if="marketplaceLoadingStates.getProducts === API_STATES.LOADING"
            class="absolute right-4 top-[12px] h-[24px] w-[24px] animate-spin"
          />
        </div>
      </form>
      <div class="grid w-full grid-cols-2 justify-between gap-3 lg:w-fit">
        <p class="flex items-center gap-[10px] text-[14px] leading-[21px]">
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
                    getAllProducts({ sort: JSON.stringify(option.sortQuery) });
                    selectedSortOption = option;
                  "
                >
                  {{ option.label }}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </client-only>
        </p>

        <Button
          variant="primary"
          class="lg:w-44"
          rounded="md"
          @click="isDialogOpen = true"
          ><CirclePlus class="mr-[10px] h-5 w-5" /> Create Item</Button
        >
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
        v-if="marketplaceLoadingStates.getProducts === API_STATES.LOADING"
        class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <div
          v-for="(_, i) in 12"
          :key="i"
          class="min-h-[280px] overflow-hidden rounded-[8px] border-[0px] border-[#EBEBEB]"
        >
          <Skeleton class="h-[140px]" />
          <div class="px-4">
            <Skeleton class="mt-4 h-[20px] w-[50%]" />
            <Skeleton class="mt-3 h-[15px] w-[60%]" />
            <Skeleton class="mt-3 h-[15px] w-[80%]" />
            <div class="flex justify-between">
              <Skeleton class="mt-4 h-[25px] w-[25%]" />
              <Skeleton class="mt-4 h-[25px] w-[25%]" />
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
          <div v-if="productsList?.length > 0">
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <ItemCard
                v-for="(item, i) in productsList"
                :key="i"
                :cardData="item"
                @triggerEdit="triggerEdit"
              />
            </div>
            <Pagination
              :meta="productsMeta"
              :loading="
                marketplaceLoadingStates.getProducts === API_STATES.LOADING
              "
              @paginate="paginateData"
            />
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
    <client-only>
      <CreateProductModal
        :isOpen="isDialogOpen"
        :mode="mode"
        :selectedProduct="selectedProduct"
        @close="isDialogOpen = false"
        @completedCreation="completeProductCreation"
      />
    </client-only>

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
import { debounce } from "~/lib/utils";
import { Search, CirclePlus } from "lucide-vue-next";
import { API_STATES } from "~/services/constants";
import { useMarketPlaceStore } from "@/store/useMarketplace";
import { SortIcon, Arrow3Icon } from "@placetopay/iconsax-vue/outline";

const marketplaceStore = useMarketPlaceStore();
const { products, marketplaceLoadingStates, productsMeta } =
  storeToRefs(marketplaceStore);
const { getAllProducts } = marketplaceStore;

const isDialogOpen = ref(false);

const mode = ref("create");
const selectedProduct = ref({});
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

const searchProducts = debounce(async () => {
  await getAllProducts({
    search: { value: searchTerm.value, fields: ["dropoffNote", "email"] },
  });
}, 1500);

const productsList = computed(() => {
  const regex = new RegExp(searchTerm.value, "i");
  return products.value.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.value.toLowerCase()),
  );
});

const paginateData = (params: { page: number }) => {
  let payload = { ...params } as Record<string, any>;
  if (searchTerm.value) {
    payload = {
      ...payload,
      search: { value: searchTerm.value, fields: ["title", "description"] },
    };
  }
  getAllProducts({
    ...payload,
  });
};

const completeProductCreation = () => {
  isDialogOpen.value = false;
  mode.value = "create";
  getAllProducts({});
};

const triggerEdit = (product: any) => {
  mode.value = "edit";
  console.log({ product }, "here");

  selectedProduct.value = product;
  isDialogOpen.value = true;
};
</script>

<style></style>
