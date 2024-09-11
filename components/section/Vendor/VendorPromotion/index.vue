<template>
  <div class="grid gap-10">
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

    <Skeleton
      v-if="marketplaceLoadingStates.getAllPromotions === API_STATES.LOADING"
      class="h-[300px] w-full"
    />

    <VendorPromotTable
      v-else-if="
        marketplaceLoadingStates.getAllPromotions === API_STATES.SUCCESS
      "
      :promotions="promotions"
    />
  </div>
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
