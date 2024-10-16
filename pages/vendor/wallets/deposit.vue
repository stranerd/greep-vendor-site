<template>
  <div class="">
    <BreadCrumb :routes="routes" backType />
    <h1 class="mb-5 ml-5 mt-10 text-lg font-semibold md:text-2xl">Deposit</h1>
    <WalletDeposit />
  </div>
</template>

<script setup lang="ts">
import { GP_ROUTES } from "~/constants/route-names";
definePageMeta({
  layout: "dashboard",
  middleware: ["authenticated"],
  name: GP_ROUTES.VENDOR.WALLETS.DEPOSIT,
});
useHead({
  title: "Vendors Wallet",
});

const routes = ref([
  {
    title: "Wallet",
    route: { name: GP_ROUTES.VENDOR.WALLETS.OVERVIEW },
  },
  {
    title: "Deposit",
    route: { name: GP_ROUTES.VENDOR.WALLETS.DEPOSIT },
  },
]);
</script>

<style></style>
