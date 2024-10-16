<template>
  <div class="">
    <BreadCrumb :routes="routes" backType />
    <h1 class="mb-5 ml-5 mt-10 text-lg font-semibold md:text-2xl">Withdraw</h1>
    <WalletWithdraw />
  </div>
</template>

<script setup lang="ts">
import { GP_ROUTES } from "~/constants/route-names";
definePageMeta({
  layout: "dashboard",
  middleware: ["authenticated"],
  name: GP_ROUTES.VENDOR.WALLETS.WITHDRAW,
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
    title: "Withdraw",
    route: { name: GP_ROUTES.VENDOR.WALLETS.WITHDRAW },
  },
]);
</script>

<style></style>
