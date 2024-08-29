<template>
  <div class="flex items-center">
    <h1 class="text-lg font-semibold md:text-2xl">Settings</h1>
  </div>
  <VendorProfile />
</template>

<script setup lang="ts">
import { GP_ROUTES } from "~/constants/route-names";
definePageMeta({
  layout: "dashboard",
  middleware: ["authenticated"],
  name: GP_ROUTES.VENDOR.SETTINGS,
});
useHead({
  title: "Vendors Settings",
});
</script>

<style></style>
