<template>
  <div
    class="flex h-[209px] w-full flex-col justify-between overflow-hidden rounded-lg text-[#001726]"
    :style="{ backgroundColor: getOrderColor(type).secondary }"
  >
    <div
      class="flex gap-2 p-2"
      :style="{ backgroundColor: getOrderColor(type).primary }"
    >
      <MenuIcon class="h6 w-4" />
      <h2 class="font-medium uppercase">ORDER ID #{{ order.id.slice(-6) }}</h2>
    </div>

    <div class="p-2 pb-0 font-medium">
      <div class="flex items-center gap-1 text-sm">
        <img src="/images/orders/location.png" alt="" class="block h-4 w-4" />
        <span class="text-[#616161]">Location : </span>
        <h2 class="">{{ order.to.location }}</h2>
      </div>
      <div class="flex items-center gap-1 text-sm">
        <img src="/images/orders/cash.png" alt="" class="block h-4 w-4" />
        <span class="text-[#616161]">Amount : </span>
        <h2 class="">
          <!-- {{ gpNumbers.formatCurrency(order.data.products[0].amount) }} -->
        </h2>
      </div>
      <div class="flex items-center gap-1 text-sm">
        <img src="/images/orders/plates.png" alt="" class="block h-4 w-4" />
        <span class="text-[#616161]">No of Plates: </span>
        <!-- <h2 class="">{{ order.data.products.length }}</h2> -->
      </div>

      <!-- Customer -->

      <div class="mt-4 flex items-center gap-2">
        <img
          :src="order.users[order.userId].bio.photo.link"
          alt=""
          class="h-10 w-10 rounded-[50%]"
        />
        <div class="font-normal">
          <h2 class="text-sm">
            {{ order.users[order.userId].bio.name.full }}
          </h2>
          <h2 class="flex text-xs text-gray-400">
            {{ $moment(order.status.created.at).format("MMM Do") }} •
            {{ $moment(order.status.created.at).format("h:mm:ss A") }}
          </h2>
        </div>
      </div>
    </div>
    <h2
      class="w-full self-center pb-4 text-center text-xs text-blue-500 underline"
    >
      <span class="cursor-pointer" @click="getSingleCustomerOrder(order.id)"
        >view full details</span
      >

      <OrderDetailsModal
        :status="type"
        :isOpen="openDetailsModal"
        @close="openDetailsModal = false"
      />
    </h2>
  </div>
</template>

<script setup lang="ts">
import {
  MenuIcon,
  LocationIcon,
  Money2Icon,
  LayerIcon,
} from "@placetopay/iconsax-vue/bold";
import type { IOrders } from "~/types/modules/marketPlaceModel";
import { useMarketPlaceStore } from "~/store/useMarketplace";

type OrderTypes = "created" | "accepted" | "shipped";
const props = defineProps({
  type: { type: String as PropType<OrderTypes>, required: true },
  order: { type: Object as PropType<IOrders>, required: true },
});
const { getSingleOrder } = useMarketPlaceStore();

const openDetailsModal = ref(false);
const getSingleCustomerOrder = async (id: string) => {
  await getSingleOrder(id);
  openDetailsModal.value = true;
};

const getOrderColor = (activeStatus: OrderTypes) => {
  if (activeStatus === "created") {
    return {
      primary: "#AB68FF",
      secondary: "#F0E3FF",
    };
  }
  if (activeStatus === "accepted") {
    return {
      primary: "#68DBFF",
      secondary: "#E3F8FF",
    };
  } else {
    return {
      primary: "#68FFA4",
      secondary: "#E3FFEE",
    };
  }
};
</script>

<style scoped></style>
