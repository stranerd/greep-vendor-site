<template>
  <div class="flex items-center">
    <BreadCrumb :routes="routes" />
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
const routes = ref([
  {
    route: { name: GP_ROUTES.VENDOR.ITEMS.ITEMS_MANAGER },
    title: "Item Manager",
  },
  { route: { name: GP_ROUTES.VENDOR.ITEMS.ITEMS_MANAGER }, title: "Items" },
]);
</script>

<style></style>
