<template>
  <div class="flex items-center">
    <h1 class="text-lg font-semibold md:text-2xl">Food Manager > Menu</h1>
  </div>
  <VendorItem />
</template>

<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  middleware: ["authenticated"],
});
</script>

<style></style>
