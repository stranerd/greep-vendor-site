<template>
  <PaymentLayout />
</template>

<script setup lang="ts">
definePageMeta({
  layout: "public",
  middleware: ["authenticated"],
});
</script>

<style></style>
