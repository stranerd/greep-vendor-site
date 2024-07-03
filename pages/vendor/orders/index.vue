<template>
  <div class=""></div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  middleware: ["authenticated"],
});
onMounted(() => {
  navigateTo("/vendor/orders/active");
});
</script>

<style></style>
