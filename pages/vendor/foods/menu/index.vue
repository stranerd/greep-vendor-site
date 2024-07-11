<template>
  <div class="flex items-center">
    <h1 class="text-lg font-semibold md:text-2xl">Food Manager > Menu</h1>
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
</script>

<style></style>
