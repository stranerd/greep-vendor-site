<template>
  <PaymentLayout />
</template>

<script setup lang="ts">
import { GP_ROUTES } from "~/constants/route-names";

definePageMeta({
  layout: "public",
  middleware: ["authenticated"],
  name: GP_ROUTES.PAYMENT,
});
</script>

<style></style>
