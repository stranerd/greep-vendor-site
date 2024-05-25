<template>
  <div class="flex items-center">
    <h1 class="text-lg font-semibold md:text-2xl">Orders</h1>
  </div>
  <VendorOrders />
</template>

<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  middleware: ["authenticated"],
});
</script>

<style></style>
