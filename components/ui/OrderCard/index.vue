<template>
  <div
    class="rounded-lg overflow-hidden flex flex-col justify-between w-72 h-60"
    :style="{ backgroundColor: getOrderColor(type).secondary }"
  >
    <div
      class="p-2 flex gap-2"
      :style="{ backgroundColor: getOrderColor(type).primary }"
    >
      <MenuIcon class="h6 w-4" />
      <h2 class="font-medium">ORDER ID #{{ order.id }}</h2>
    </div>

    <div class="p-2 pb-0">
      <div class="text-sm flex gap-1 items-center">
        <LocationIcon
          class="h-6 w-6"
          :style="{ color: getOrderColor(type).primary }"
        />
        <span class="">Location : </span>
        <h2 class="">{{ order.location }}</h2>
      </div>
      <div class="text-sm flex gap-1 items-center">
        <Money2Icon
          class="h-6 w-6"
          :style="{ color: getOrderColor(type).primary }"
        />
        <span class="">Amount : </span>
        <h2 class="">${{ order.amount }}</h2>
      </div>
      <div class="text-sm flex gap-1 items-center">
        <LayerIcon
          class="h-6 w-6"
          :style="{ color: getOrderColor(type).primary }"
        />
        <span class="">No of Plates: </span>
        <h2 class="">{{ order.no_of_order }}</h2>
      </div>

      <!-- Customer -->

      <div class="mt-8 gap-2 flex items-center">
        <img
          :src="order.customer.picture"
          alt=""
          class="rounded-[50%] h-10 w-10"
        />
        <div class="">
          <h2 class="text-sm">{{ order.customer.name }}</h2>
          <h2 class="text-xs text-gray-400">
            {{ new Date(order.customer.time as Date).toDateString() }}
          </h2>
        </div>
      </div>
    </div>
    <h2
      class="underline self-center text-center pb-1 w-full text-xs text-blue-500"
    >
      <span class="">view full details</span>
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

type OrderTypes = "new" | "kitchen" | "delivery";

interface OrderData {
  id: string | number;
  type: OrderTypes;
  location: string;
  amount: number;
  no_of_order: number;
  customer: {
    name: string;
    picture: string;
    time: Date | String;
  };
}
const props = defineProps({
  type: { type: String as PropType<OrderTypes>, required: true },
  order: { type: Object as PropType<OrderData>, required: true },
});

const getOrderColor = (type: OrderTypes) => {
  if (type === "new") {
    return {
      primary: "#AB68FF",
      secondary: "#F0E3FF",
    };
  }
  if (type === "kitchen") {
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
