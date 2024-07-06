<template>
  <PageHeader :isInnerPage="true">
    Orders > Order #{{ route?.params?.id?.slice(0, 9) || "" }}
  </PageHeader>
  <div class="mx-auto w-full max-w-[848px]">
    <OrderFoodDetails />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "dashboard",
  middleware: ["authenticated", "vendor-foods"],
  name: GP_ROUTES.VENDOR.FOOD.ORDER_DETAILS,
});

const route = useRoute();
import { useMarketPlaceStore } from "@/store/useMarketplace";
import { GP_ROUTES } from "~/constants/route-names";

const marketPlaceStore = useMarketPlaceStore();
const { getSingleOrder } = marketPlaceStore;

onMounted(() => {
  const id = (route?.params?.id || "") as string;
  getSingleOrder(id);
});
</script>

<style></style>
