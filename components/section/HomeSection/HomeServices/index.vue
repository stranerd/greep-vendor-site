<template>
  <div class="mt-20">
    <div class="flex w-full items-center justify-center text-center">
      <CursiveTitle>Greep Services</CursiveTitle>
    </div>
    <h2
      class="mx-auto my-5 mt-10 w-3/4 text-center text-6xl font-semibold text-white"
    >
      Explore the World of Our Amazing Services
    </h2>
    <p class="mx-auto my-10 w-3/4 text-center text-2xl text-white">
      Scan, Pay, and Go!. Make payments easily with GreepPay. Simply scan the QR
      code, enter the amount, and confirm to pay.
    </p>

    <div
      class="mx-auto my-10 flex w-fit items-center justify-center gap-3 rounded-full bg-white p-2"
    >
      <Button
        v-for="service in serviceTypes"
        @click="activeServiceType = service"
        :class="{ '!bg-black !text-white': activeServiceType === service }"
        class="flex h-12 w-[160px] gap-x-4 rounded-full bg-white text-black hover:bg-gray-500/10"
      >
        <component :is="service.icon" class="h-5 w-5" />
        <span class="">{{ service.title }}</span>
      </Button>
    </div>

    <transition name="fade" mode="out-in">
      <div
        class="grid grid-cols-2 gap-8"
        v-if="activeServiceType.title === 'Customers'"
      >
        <div class="grid grid-cols-2 gap-8" v-for="cards in servicesCard">
          <ServicesCard
            class="h-[428px] w-full overflow-hidden border-none"
            v-for="item in cards"
            :item="item"
          >
          </ServicesCard>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-8" v-else>
        <div
          class="grid grid-cols-2 gap-8"
          v-for="cards in vendorsServicesCard"
        >
          <ServicesCard
            class="h-[428px] w-full overflow-hidden border-none"
            v-for="item in cards"
            :item="item"
          >
          </ServicesCard>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { Profile2UserIcon, ShopIcon } from "@placetopay/iconsax-vue/bold";

const serviceTypes = shallowRef([
  { title: "Customers", icon: Profile2UserIcon },
  { title: "Vendors", icon: ShopIcon },
]);
const activeServiceType = shallowRef(serviceTypes.value[1]);

const servicesCard = ref([
  [
    {
      type: "IMAGE",
      source: "/images/news/0.jpg",
      style: {},
    },
    {
      type: "CARD",
      style: { background: "#FFFFFF" },
      content: {
        title: "Market",
        body: "Explore, Purchase, and List with Our User-Friendly Marketplace. Where buyers find great deals and sellers thrive in a secure, hassle-free environment.",
        actionText: "More Information",
        action: () => {},
      },
    },
  ],
  [
    {
      type: "IMAGE",
      source: "/images/news/0.jpg",
      style: {},
    },
    {
      type: "CARD",
      style: { background: "#009260", color: "#FFFFFF" },
      content: {
        title: "Food",

        body: "Order, Deliver, and Discover with Our User-Friendly Food Marketplace. Where food meets passion, and every meal is a celebration of taste.",
        actionText: "More Information",
        action: () => {},
      },
    },
  ],
  [
    {
      type: "CARD",
      style: { background: "#009260", color: "#FFFFFF" },
      content: {
        title: "Delivery",
        body: "Ship, Track, and Deliver with Our User-Friendly Logistics Platform. Experience the power of seamless logistics, where every shipment is a success story.",
        actionText: "More Information",
        action: () => {},
      },
    },
    {
      type: "IMAGE",
      source: "/images/news/0.jpg",
      style: {},
    },
  ],
  [
    {
      type: "CARD",
      style: { background: "#FFFFFF" },
      content: {
        title: "Car Rent",
        body: "Book, Ride, and Return with Our User-Friendly Car Rental Platform. Experience the freedom of hassle-free travel, where every journey is a smooth ride.",
        actionText: "More Information",
        action: () => {},
      },
    },
    {
      type: "IMAGE",
      source: "/images/news/0.jpg",
      style: { background: "#FFFFFF" },
    },
  ],
]);
const vendorsServicesCard = ref([
  [
    {
      type: "IMAGE",
      source: "/images/news/0.jpg",
      style: { gridColumn: "span 2 / span 2" },
    },
  ],

  [
    {
      type: "CARD",
      style: { background: "#FFFFFF", gridColumn: "span 2 / span 2" },
      content: {
        title: "Partner with us to sell",
        body: "Explore, Purchase, and List with Our User-Friendly Marketplace. Where buyers find great deals and sellers thrive in a secure, hassle-free environment.",
        actionText: "More Information",
        action: () => {},
      },
    },
  ],
  [
    {
      type: "CARD",
      style: { background: "#009260", color: "#FFFFFF" },
      content: {
        title: "Greep Pay",

        body: "Order, Deliver, and Discover with Our User-Friendly Food Marketplace. Where food meets passion, and every meal is a celebration of taste.",
        actionText: "More Information",
        action: () => {},
      },
    },
    {
      type: "IMAGE",
      source: "/images/news/0.jpg",
      style: {},
    },
  ],
  [
    {
      type: "CARD",
      style: { background: "#009260", color: "#FFFFFF" },
      content: {
        title: "Deliver With Us",
        body: "Ship, Track, and Deliver with Our User-Friendly Logistics Platform. Experience the power of seamless logistics, where every shipment is a success story.",
        actionText: "More Information",
        action: () => {},
      },
    },
    {
      type: "IMAGE",
      source: "/images/news/0.jpg",
      style: {},
    },
  ],
]);
</script>

<style scoped></style>
