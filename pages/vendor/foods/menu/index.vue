<template>
  <div class="flex items-center">
    <BreadCrumb :routes="routes" />
  </div>
  <VendorMenu />
</template>

<script setup lang="ts">
import { GP_ROUTES } from "~/constants/route-names";
definePageMeta({
  layout: "dashboard",
  middleware: ["authenticated", "vendor-foods"],
  name: GP_ROUTES.VENDOR.FOOD.MENU,
});
useHead({
  title: "Vendor Menu",
});

const routes = ref([
  { route: { name: GP_ROUTES.VENDOR.FOOD.MENU }, title: "Food Manager" },
  { route: { name: GP_ROUTES.VENDOR.FOOD.MENU }, title: "Menu" },
]);
</script>

<style></style>
