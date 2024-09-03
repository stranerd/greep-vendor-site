<template>
  <div class="flex items-center">
    <h1 class="text-lg font-semibold md:text-2xl">Promo Manager</h1>
  </div>
  <VendorPromotion />
</template>

<script setup lang="ts">
import { GP_ROUTES } from "~/constants/route-names";
definePageMeta({
  layout: "dashboard",
  middleware: ["authenticated"],
  name: GP_ROUTES.VENDOR.PROMOTIONS,
});
useHead({
  title: "Vendors - Promotion Manager",
});
</script>

<style></style>
