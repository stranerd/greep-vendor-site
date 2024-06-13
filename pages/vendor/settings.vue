<template>
  <div class="flex items-center">
    <h1 class="text-lg font-semibold md:text-2xl">Vendor’s Settings</h1>
  </div>
  <VendorProfile />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: ['authenticated'],
});
useHead({
  title: 'Vendors Settings',
});
</script>

<style></style>
