<template>
  <div class="">
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

      <div class="grid w-full grid-cols-2 justify-between gap-3 lg:w-fit">
        <p
          class="flex items-center gap-[10px] text-[14px] leading-[21px] lg:mr-[31px]"
        >
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
        </p>
        <Button
          variant="primary"
          class="lg:w-44"
          rounded="md"
          @click="isDialogOpen = true"
          ><CirclePlus class="mr-[10px] h-5 w-5" /> Create Order</Button
        >
      </div>
    </div>
    <Skeleton
      v-if="
        marketplaceLoadingStates.allOrders === API_STATES.LOADING &&
        ordersList.length === 0
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
      <div v-else class="flex h-full flex-col justify-between">
        <div class="h-full max-h-[67vh] min-h-[66vh] overflow-y-scroll">
          <VendorHistoryTable source="page" :items="ordersList" />
        </div>
        <Pagination
          :meta="orderMeta"
          :loading="marketplaceLoadingStates.allOrders === API_STATES.LOADING"
          @paginate="paginateData"
        />
      </div>
    </div>
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
</template>

<script lang="ts" setup>
import { debounce } from "~/lib/utils";
import { Search, CirclePlus, LoaderCircle } from "lucide-vue-next";
import { API_STATES } from "~/services/constants";

import { useMarketPlaceStore } from "~/store/useMarketplace";
import { Arrow3Icon } from "@placetopay/iconsax-vue/outline";
const marketPlaceStore = useMarketPlaceStore();

const { orders, marketplaceLoadingStates, orderMeta } =
  storeToRefs(marketPlaceStore);
const { getVendorOrders, getRecentOrders } = useMarketPlaceStore();

const isDialogOpen = ref(false);

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
    const Searchable = `${address.from} ${address.to}`;
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
    ].join(" ");
    const checkOrder = st
      .toLowerCase()
      .includes(searchTerm.value.toLowerCase());

    if (checkOrder) return item;
  });
});

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
