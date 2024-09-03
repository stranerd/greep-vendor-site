<template>
  <div class="flex items-center">
    <h1 class="text-lg font-semibold md:text-2xl">Sales Overview</h1>
  </div>
  <VendorDashboard />
</template>

<script setup lang="ts">
import { GP_ROUTES } from "~/constants/route-names";
definePageMeta({
  layout: "dashboard",
  middleware: ["authenticated"],
  name: GP_ROUTES.VENDOR.DASHBOARD,
});
useHead({
  title: "Vendors Dashboard",
});
</script>

<style></style>
