<template>
  <PageHeader :isInnerPage="true">
    Orders > Order #{{ route?.params?.id?.slice(0, 9) || "" }}
  </PageHeader>
  <div class="mx-auto w-full max-w-[848px]">
    <OrderDetails />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "dashboard",
  middleware: ["authenticated"],
  name: GP_ROUTES.VENDOR.ITEMS.ORDER_DETAILS,
});
const route = useRoute();

useHead({
  title: "Vendors Order - " + route?.params?.id,
});

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
