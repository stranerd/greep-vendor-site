<template>
  <div class="flex items-center">
    <h1 class="flex gap-x-4 text-lg font-semibold md:text-2xl">
      <ArrowLeftIcon
        class="font- w-8"
        @click="router.push({ name: GP_ROUTES.VENDOR.PROMOTIONS })"
      />Run Promo
    </h1>
  </div>
  <CreatePromoForm />
</template>

<script setup lang="ts">
import { GP_ROUTES } from "~/constants/route-names";
import { ArrowLeftIcon } from "@placetopay/iconsax-vue/outline";

const router = useRouter();
definePageMeta({
  layout: "dashboard",
  middleware: ["authenticated"],
  name: GP_ROUTES.VENDOR.PROMOTIONS_CREATE,
});
useHead({
  title: "Vendors - Promotion Manager",
});
</script>

<style></style>
