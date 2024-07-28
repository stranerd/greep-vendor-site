<template>
  <div
    class="flex h-60 w-full flex-col justify-between overflow-hidden rounded-lg text-[#001726]"
    :style="{ backgroundColor: getOrderColor(type).secondary }"
  >
    <div
      class="flex gap-2 p-2"
      :style="{ backgroundColor: getOrderColor(type).primary }"
    >
      <MenuIcon class="h6 w-4" />
      <h2 class="font-medium">ORDER ID #{{ order.id.slice(0, 7) }}</h2>
    </div>

    <div class="p-2 pb-0 font-medium">
      <div class="flex items-center gap-1 text-sm">
        <LocationIcon
          class="h-6 w-6"
          :style="{ color: getOrderColor(type).primary }"
        />
        <span class="text-[#616161]">Location : </span>
        <h2 class="">{{ order.to.location }}</h2>
      </div>
      <div class="flex items-center gap-1 text-sm">
        <Money2Icon
          class="h-6 w-6"
          :style="{ color: getOrderColor(type).primary }"
        />
        <span class="text-[#616161]">Amount : </span>
        <h2 class="">
          {{ gpNumbers.formatCurrency(order.data.products[0].amount) }}
        </h2>
      </div>
      <div class="flex items-center gap-1 text-sm">
        <LayerIcon
          class="h-6 w-6"
          :style="{ color: getOrderColor(type).primary }"
        />
        <span class="text-[#616161]">No of Plates: </span>
        <h2 class="">{{ order.data.products.length }}</h2>
      </div>

      <!-- Customer -->

      <div class="mt-8 flex items-center gap-2">
        <img
          :src="order.users[0].bio.photo.link"
          alt=""
          class="h-10 w-10 rounded-[50%]"
        />
        <div class="font-normal">
          <h2 class="text-sm">{{ order.users[0].bio.name.full }}</h2>
          <h2 class="flex text-xs text-gray-400">
            {{ $moment(order.status.created.at).format("MMM Do") }} •
            {{ $moment(order.status.created.at).format("h:mm:ss A") }}
          </h2>
        </div>
      </div>
    </div>
    <h2
      class="w-full self-center pb-1 text-center text-xs text-blue-500 underline"
    >
      <span class="cursor-pointer" @click="openDetailsModal = true"
        >view full details</span
      >

      <OrderDetailsViewModal
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
type OrderTypes = "created" | "accepted" | "shipped";

const props = defineProps({
  type: { type: String as PropType<OrderTypes>, required: true },
  order: { type: Object as PropType<IOrders>, required: true },
});

const openDetailsModal = ref(false);

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
