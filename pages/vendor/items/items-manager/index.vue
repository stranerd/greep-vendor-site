<template>
  <div class="flex items-center">
    <h1 class="text-lg font-semibold md:text-2xl">Food Manager > Menu</h1>
  </div>
  <VendorItem />
</template>

<script setup lang="ts">
import { GP_ROUTES } from "~/constants/route-names";
definePageMeta({
  layout: "dashboard",
  middleware: ["authenticated", "vendor-items"],
  name: GP_ROUTES.VENDOR.ITEMS.ITEMS_MANAGER,
});
useHead({
  title: "Vendors Items",
});
</script>

<style></style>
