<template>
  <PageHeader :isInnerPage="true">
    Orders > Order #{{ route?.params?.id?.slice(0, 9) || "" }}
  </PageHeader>
  <div class="max-w-[848px] w-full mx-auto">
    <OrderDetails />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "dashboard",
  middleware: ["authenticated"],
});

const route = useRoute();
import { useMarketPlaceStore } from "@/store/useMarketplace";

const marketPlaceStore = useMarketPlaceStore();
const { getSingleOrder } = marketPlaceStore;

onMounted(() => {
  const id = (route?.params?.id || "") as string;
  getSingleOrder(id);
});
</script>

<style></style>
