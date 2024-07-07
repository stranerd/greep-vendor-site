<template>
  <ChooseVendorType />
</template>

<script setup lang="ts">
import { GP_ROUTES } from "~/constants/route-names";
definePageMeta({
  layout: "auth",
  middleware: ["authenticated"],
  name: GP_ROUTES.VENDOR.USER_TYPE,
});
</script>

<style></style>
