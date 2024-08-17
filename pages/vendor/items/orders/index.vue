<template>
  <div class="">
    <VendorOrders />
  </div>
</template>

<script setup lang="ts">
import { Search } from "lucide-vue-next";
import { GP_ROUTES } from "~/constants/route-names";
definePageMeta({
  layout: "dashboard",
  middleware: ["authenticated", "vendor-items"],
  name: GP_ROUTES.VENDOR.ITEMS.ORDERS,
});
</script>
