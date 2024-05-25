<template>
  <div class="flex items-center">
    <h1 class="text-lg font-semibold md:text-2xl">Sales Overview</h1>
  </div>
  <VendorDashboard />
</template>

<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  middleware: ["authenticated"],
});

const date = ref("today");
</script>

<style></style>
