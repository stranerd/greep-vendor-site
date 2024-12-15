<template>
  <div class="max-w-[155px]">
    <Select v-model="date">
      <SelectTrigger>
        <SelectValue placeholder="Select time range" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Date Range</SelectLabel>
          <SelectItem value="month"> This Month </SelectItem>
          <SelectItem value="lastMonth"> Last Month </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>

  <div
    v-if="marketplaceLoadingStates.dashBoardData === API_STATES.LOADING"
    class=""
  >
    <div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Skeleton v-for="(_, i) in 4" :key="i" class="h-[130px]" />
    </div>
    <div class="mt-[28px] grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <Skeleton class="h-[348px] w-full xl:col-span-2" />
      <Skeleton class="h-[348px] w-full" />
    </div>
  </div>
  <div v-else class="">
    <div class="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
      <Card v-for="(card, i) in overview" :key="i" style="overflow: hidden">
        <CardHeader
          class="flex flex-row items-center justify-between space-y-0 pb-[10px]"
        >
          <CardTitle
            class="text-[14px] font-medium text-[#6F727A]"
            :class="card.titleColor"
          >
            {{ card.title }}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-[24px] font-semibold text-[#000000]">
            {{ card.value }}
          </div>
          <!-- <p class="text-xs text-muted-foreground">+20.1% from last month</p> -->
        </CardContent>
      </Card>
    </div>
    <div class="mt-[28px] grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <client-only> <VendorLineChart /></client-only>
      <Card class="border-[0px] bg-[#FBFBFB]">
        <CardHeader>
          <CardTitle class="text-[14px]">Most sold</CardTitle>
        </CardHeader>
        <CardContent class="grid max-h-[280px] gap-3 overflow-y-scroll">
          <div v-if="dashBoardData.products.length > 0">
            <div
              v-for="(product, i) in dashBoardData.products"
              :key="i"
              class="mb-4 flex items-center justify-between rounded-[12px] border-[2px] border-[#F1F3F7] px-4 py-3"
            >
              <div class="flex items-center">
                <h6 class="mr-3 text-[16px] font-semibold">{{ i + 1 }}</h6>
                <Avatar class="mr-3">
                  <AvatarImage :src="product?.banner?.link" alt="Product" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h6 class="text-[14px] font-semibold leading-[21px]">
                    {{ product.title }}
                  </h6>
                  <p
                    class="text-[12px] font-light leading-[21px] text-[#999999]"
                  >
                    {{ product?.description?.slice(0, 15) }}...
                  </p>
                </div>
              </div>

              <div>
                <p class="text-right text-[14px] leading-[21px] text-[#001726]">
                  {{ product?.meta?.orders }}
                </p>
                <img
                  src="/images/icons/arrow-up.svg"
                  alt="Arrow"
                  class="ml-auto"
                />
              </div>
            </div>
          </div>
          <DisplayState
            v-else
            message="Nothing's hot off the press yet! Check back soon for our best-sellers"
            hide-button
          />
        </CardContent>
      </Card>
    </div>
  </div>
  <Skeleton
    v-if="marketplaceLoadingStates.recentOrders === API_STATES.LOADING"
    class="h-[300px] w-full"
  />

  <VendorHistoryTable
    v-else-if="marketplaceLoadingStates.recentOrders === API_STATES.SUCCESS"
    :items="recentOrders"
  />
  <DisplayState
    v-else
    message="Something went wrong, Please retry"
    button-text="Get Recent Orders"
    @action="getRecentOrders()"
  />
  <!-- <div
      class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
    >
      <div class="flex flex-col items-center gap-1 text-center">
        <h3 class="text-2xl font-bold tracking-tight">You have no products</h3>
        <p class="text-sm text-muted-foreground">
          You can start selling as soon as you add a product.
        </p>
        <Button class="mt-4"> Add Product </Button>
      </div>
    </div> -->
</template>

<script setup lang="ts">
const date = ref("month");
import { currencyConverter } from "~/lib/utils";
import { API_STATES } from "~/services/constants";
import { useAuthStore } from "~/store/useAuthStore";
import { useMarketPlaceStore } from "~/store/useMarketplace";
const { $moment } = useNuxtApp();

const authStore = useAuthStore();
const marketPlaceStore = useMarketPlaceStore();

const { user } = storeToRefs(authStore);
const { recentOrders, dashBoardData, products, marketplaceLoadingStates } =
  storeToRefs(marketPlaceStore);
const { getRecentOrders, getDashboardData } = marketPlaceStore;

const overview = computed(() => [
  {
    title: "Total Sales",
    value: currencyConverter(
      "TRY",
      recentOrders.value
        .filter((order) => order.status.completed !== null)
        .map((order) => order.fee.payable)
        .reduce((accumulator, current) => accumulator + current, 0),
    ),
  },
  {
    title: "Total Orders",
    value: recentOrders.value.length,
    titleColor: "text-primary",
  },
  {
    title: "Total Cancelled",
    value: recentOrders.value.filter((order) => order.status.cancelled !== null)
      .length,
    titleColor: "text-orange-500",
  },
  {
    title: "Total Products",
    value: products.value.length,
    // titleColor: "text-blue-600",
  },
]);

watch(date, () => {
  updateRange();
});

const updateRange = () => {
  if (date.value === "lastMonth") {
    getDashboardData({
      start: new Date($moment().startOf("M").subtract(30, "D")),
      end: new Date($moment().endOf("M").subtract(30, "D")),
    });
  } else {
    getDashboardData({
      start: new Date($moment().startOf("M")),
      end: new Date($moment().endOf("M")),
    });
  }
};

onMounted(() => {});
</script>

<style></style>
