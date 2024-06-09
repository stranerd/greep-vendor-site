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
    <div class="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-[28px]">
      <Skeleton class="w-full h-[348px] xl:col-span-2" />
      <Skeleton class="w-full h-[348px]" />
    </div>
  </div>
  <div v-else class="">
    <div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card v-for="(card, i) in overview" :key="i" style="overflow: hidden">
        <CardHeader
          class="flex flex-row items-center justify-between space-y-0 pb-[10px]"
        >
          <CardTitle
            class="text-[14px] text-[#6F727A] font-medium"
            :class="card.titleColor"
          >
            {{ card.title }}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-[#000000] text-[28px] font-semibold">
            {{ card.value }}
          </div>
          <!-- <p class="text-xs text-muted-foreground">+20.1% from last month</p> -->
        </CardContent>
      </Card>
    </div>
    <div class="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-[28px]">
      <client-only> <VendorLineChart /></client-only>
      <Card class="bg-[#FBFBFB] border-[0px]">
        <CardHeader>
          <CardTitle class="text-[14px]">Most sold</CardTitle>
        </CardHeader>
        <CardContent class="grid gap-3 max-h-[280px] overflow-y-scroll">
          <div v-if="dashBoardData.products.length > 0">
            <div
              v-for="(product, i) in dashBoardData.products"
              :key="i"
              class="border-[#F1F3F7] rounded-[12px] mb-4 flex items-center justify-between border-[2px] py-3 px-4"
            >
              <div class="flex items-center">
                <h6 class="text-[16px] mr-3 font-semibold">{{ i + 1 }}</h6>
                <Avatar class="mr-3">
                  <AvatarImage :src="product?.banner?.link" alt="Product" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h6 class="text-[14px] font-semibold leading-[21px]">
                    {{ product.title }}
                  </h6>
                  <p
                    class="text-[#999999] text-[12px] leading-[21px] font-light"
                  >
                    {{ product?.description?.slice(0, 15) }}...
                  </p>
                </div>
              </div>

              <div>
                <p class="text-right text-[#001726] leading-[21px] text-[14px]">
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
const { recentOrders, dashBoardData, marketplaceLoadingStates } =
  storeToRefs(marketPlaceStore);
const { getRecentOrders, getDashboardData } = marketPlaceStore;

const overview = computed(() => [
  {
    title: "Total Sales",
    value: currencyConverter(
      "TRY",
      dashBoardData?.value?.stats?.reduce(function (accumulator, curValue) {
        return accumulator + curValue.fee.total;
      }, 0) || 0
    ),
  },
  {
    title: "Total Orders",
    value: dashBoardData.value?.stats?.length || 0,
    titleColor: "text-[#249F5D]",
  },
  {
    title: "Total Visits",
    value: "0",
    titleColor: "text-[#FFB545]",
  },
  {
    title: "Total Canceled ",
    value:
      dashBoardData.value?.stats?.filter((order: any) => order.status.cancelled)
        ?.length || 0,
  },
]);

onMounted(() => {
  getDashboardData({
    start: new Date($moment().startOf("M")),
    end: new Date($moment().endOf("M")),
  });
  getRecentOrders();
});
</script>

<style></style>
