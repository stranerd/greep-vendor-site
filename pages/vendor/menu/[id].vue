<template>
  <div class="flex items-center">
    <h1 class="text-lg font-semibold md:text-2xl">Food > Menu> Jollof Rice</h1>
  </div>
  <VendorMenuDetails />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: ['authenticated'],
  name: 'ROUTE_NAMES_SINGLE_MENU',
});

useHead({
  title: 'Vendor Menu',
});

const router = useRouter();
const route = useRoute();
</script>

<style scoped></style>
