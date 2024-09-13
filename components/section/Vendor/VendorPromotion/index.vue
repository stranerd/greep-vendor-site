<template>
  <template
    v-if="marketplaceLoadingStates.getAllPromotions === API_STATES.LOADING"
  >
    <div class="flex items-center justify-between">
      <Skeleton class="mb-6 h-14 w-40" v-for="i in 2" />
    </div>
    <div class="grid grid-cols-3 gap-8">
      <Skeleton class="mb-6 h-40 w-full" v-for="i in 3" />
    </div>
    <Skeleton class="h-[480px] w-full" />
  </template>
  <template v-else-if="promotions && promotions.length === 0">
    <DisplayState
      class="my-[80px]"
      message="No items to display. You don’t have any active promos at the moment"
      buttonText="Create New Promotion"
      @action="router.push({ name: GP_ROUTES.VENDOR.PROMOTIONS_CREATE })"
    />
  </template>
  <template v-else
    ><div class="grid gap-10">
      <div class="flex justify-between">
        <Button class="rounded-full">All Promo</Button>
        <Button
          class="flex gap-x-2 bg-primary"
          @click="router.push({ name: GP_ROUTES.VENDOR.PROMOTIONS_CREATE })"
        >
          <AddCircleIcon class="h-5 w-5" />
          <span class="">Run new promo</span>
        </Button>
      </div>
      <div class="grid gap-4 md:gap-8 lg:grid-cols-3">
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
            <div class="text-[28px] font-semibold text-[#000000]">
              {{ card.value }}
            </div>
            <!-- <p class="text-xs text-muted-foreground">+20.1% from last month</p> -->
          </CardContent>
        </Card>
      </div>

      <VendorPromotTable :promotions="promotions" />
    </div>
  </template>
</template>

<script setup lang="ts">
import { GP_ROUTES } from "~/constants/route-names";
import { AddCircleIcon } from "@placetopay/iconsax-vue/outline";
import { useMarketPlaceStore } from "@/store/useMarketplace";

import { API_STATES } from "~/services/constants";

const { promotions, marketplaceLoadingStates } = storeToRefs(
  useMarketPlaceStore(),
);
const { getAllPromotions, updatePromotion } = useMarketPlaceStore();

const router = useRouter();
const overview = computed(() => [
  {
    title: "Total Promos",
    value: 138,
    titleColor: "text-[#6F727A]",
  },
  {
    title: "Active Promo",
    value: 10,
    titleColor: "text-[#249F5D]",
  },
  {
    title: "Cancelled",
    value: 18,
    titleColor: "text-[#249F5D]",
  },
]);

onMounted(async () => {
  await getAllPromotions();
});
</script>

<style scoped></style>
