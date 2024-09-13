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

    <div class="grid grid-cols-2 gap-8">
      <div class="grid grid-cols-2 gap-8" v-for="cards in servicesCard">
        <div class="h-[428px]" v-for="item in cards">
          <Card
            v-if="item.type === 'IMAGE'"
            class="h-full w-full overflow-hidden border-none"
          >
            <img :src="item.source" alt="" class="h-full w-full object-cover" />
          </Card>
          <Card
            v-if="item.type === 'CARD'"
            class="flex h-full w-full flex-col justify-between border-none p-[36px]"
            :style="item.content?.style"
          >
            <h2 class="text-[40px] font-medium">{{ item.content?.title }}</h2>
            <div class="grid gap-8">
              <p class="">{{ item.content?.body }}</p>
              <p class="underline">{{ item.content?.actionText }}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const servicesCard = ref([
  [
    { type: "IMAGE", source: "/images/news/0.jpg" },
    {
      type: "CARD",
      content: {
        title: "Market",
        style: { background: "#FFFFFF" },
        body: "Explore, Purchase, and List with Our User-Friendly Marketplace. Where buyers find great deals and sellers thrive in a secure, hassle-free environment.",
        actionText: "More Information",
        action: () => {},
      },
    },
  ],
  [
    { type: "IMAGE", source: "/images/news/0.jpg" },
    {
      type: "CARD",
      content: {
        title: "Food",
        style: { background: "#009260", color: "#FFFFFF" },
        body: "Order, Deliver, and Discover with Our User-Friendly Food Marketplace. Where food meets passion, and every meal is a celebration of taste.",
        actionText: "More Information",
        action: () => {},
      },
    },
  ],
  [
    {
      type: "CARD",
      content: {
        title: "Delivery",
        style: { background: "#009260", color: "#FFFFFF" },
        body: "Ship, Track, and Deliver with Our User-Friendly Logistics Platform. Experience the power of seamless logistics, where every shipment is a success story.",
        actionText: "More Information",
        action: () => {},
      },
    },
    { type: "IMAGE", source: "/images/news/0.jpg" },
  ],
  [
    {
      type: "CARD",
      content: {
        title: "Car Rent",
        style: { background: "#FFFFFF" },
        body: "Book, Ride, and Return with Our User-Friendly Car Rental Platform. Experience the freedom of hassle-free travel, where every journey is a smooth ride.",
        actionText: "More Information",
        action: () => {},
      },
    },
    { type: "IMAGE", source: "/images/news/0.jpg" },
  ],
]);
</script>

<style scoped></style>
