<template>
  <div class="flex items-center">
    <BreadCrumb
      :routes="
        marketplaceLoadingStates.getSingleProduct !== API_STATES.LOADING
          ? routes
          : []
      "
      :loading="
        marketplaceLoadingStates.getSingleProduct === API_STATES.LOADING
      "
    />
  </div>
  <VendorMenuDetails />
</template>

<script setup lang="ts">
import { GP_ROUTES } from "~/constants/route-names";
import { useMarketPlaceStore } from "@/store/useMarketplace";
import { API_STATES } from "~/services/constants";

const marketplaceStore = useMarketPlaceStore();
const { singleProduct: product, marketplaceLoadingStates } =
  storeToRefs(marketplaceStore);
definePageMeta({
  layout: "dashboard",
  middleware: ["authenticated", "vendor-items"],
  name: GP_ROUTES.VENDOR.ITEMS.ITEM_DETAILS,
});

useHead({
  title: "Vendor Menu",
});

const route = useRoute();

const routes = computed(() => [
  {
    route: { name: GP_ROUTES.VENDOR.ITEMS.ITEMS_MANAGER },
    title: "Item Manager",
  },
  {
    route: { name: GP_ROUTES.VENDOR.ITEMS.ITEMS_MANAGER },
    title: "Items",
  },
  {
    route: {
      name: GP_ROUTES.VENDOR.FOOD.MENU_DETAILS,
      params: { id: route.params.id },
    },
    title: product.value?.title ?? "",
  },
]);
</script>

<style scoped></style>
