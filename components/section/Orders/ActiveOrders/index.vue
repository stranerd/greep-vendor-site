<template>
  <div class="">
    <h1 class="text-lg font-semibold md:text-2xl">Orders</h1>
  </div>

  <div class="grid w-[96%] grid-cols-3 gap-4">
    <div class="flex w-full flex-col gap-2">
      <Button class="w-full bg-[#7C13FF] hover:bg-[#7C13FF]">
        New ({{ orders.filter(({ type }) => type === "new").length }})</Button
      >
      <OrderCard
        :order="order"
        v-for="order in orders.filter(({ type }) => type === 'new')"
        :type="order.type"
      />
    </div>
    <div class="flex w-full flex-col gap-2">
      <Button class="hover:bg-bg-[#0250C6] w-full bg-[#0250C6]">
        Kitchen ({{
          orders.filter(({ type }) => type === "kitchen").length
        }})</Button
      >

      <OrderCard
        :order="order"
        v-for="order in orders.filter(({ type }) => type === 'kitchen')"
        :type="order.type"
      />
    </div>
    <div class="flex w-full flex-col gap-2">
      <Button class="w-full bg-[#006D48] hover:bg-[#006D48]">
        New ({{
          orders.filter(({ type }) => type === "delivery").length
        }})</Button
      >
      <OrderCard
        :order="order"
        v-for="order in orders.filter(({ type }) => type === 'delivery')"
        :type="order.type"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from "lucide-vue-next";

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
const orders = ref<OrderData[]>([
  {
    type: "kitchen",
    id: "ORD19614",
    location: "Paris, France",
    amount: 107.0,
    no_of_order: 5,
    customer: {
      name: "Eva Blue",
      picture: "https://xsgames.co/randomusers/avatar.php?g=female",
      time: "2024-06-20T20:19:58.131434",
    },
  },
  {
    type: "new",
    id: "ORD12511",
    location: "Tokyo, Japan",
    amount: 87.0,
    no_of_order: 3,
    customer: {
      name: "Bob Smith",
      picture: "https://xsgames.co/randomusers/avatar.php?g=male",
      time: "2024-07-11T20:19:58.131532",
    },
  },
  {
    type: "kitchen",
    id: "ORD30304",
    location: "Berlin, Germany",
    amount: 132.0,
    no_of_order: 4,
    customer: {
      name: "Eva Blue",
      picture: "https://xsgames.co/randomusers/avatar.php?g=female",
      time: "2024-06-26T20:19:58.131559",
    },
  },
  {
    type: "new",
    id: "ORD82542",
    location: "Paris, France",
    amount: 225.0,
    no_of_order: 1,
    customer: {
      name: "Eva Blue",
      picture: "https://xsgames.co/randomusers/avatar.php?g=female",
      time: "2024-07-03T20:19:58.131567",
    },
  },
  {
    type: "delivery",
    id: "ORD76151",
    location: "Berlin, Germany",
    amount: 233.0,
    no_of_order: 4,
    customer: {
      name: "Bob Smith",
      picture: "https://xsgames.co/randomusers/avatar.php?g=female",
      time: "2024-06-26T20:19:58.131574",
    },
  },
  {
    type: "delivery",
    id: "ORD34271",
    location: "London, UK",
    amount: 136.0,
    no_of_order: 2,
    customer: {
      name: "David Green",
      picture: "https://xsgames.co/randomusers/avatar.php?g=male",
      time: "2024-06-19T20:19:58.131583",
    },
  },
  {
    type: "kitchen",
    id: "ORD86451",
    location: "New York, USA",
    amount: 96.0,
    no_of_order: 2,
    customer: {
      name: "David Green",
      picture: "https://xsgames.co/randomusers/avatar.php?g=female",
      time: "2024-06-29T20:19:58.131591",
    },
  },
  {
    type: "new",
    id: "ORD91061",
    location: "Tokyo, Japan",
    amount: 60.0,
    no_of_order: 1,
    customer: {
      name: "Eva Blue",
      picture: "https://xsgames.co/randomusers/avatar.php?g=male",
      time: "2024-06-23T20:19:58.131602",
    },
  },
  {
    type: "kitchen",
    id: "ORD12121",
    location: "Paris, France",
    amount: 163.0,
    no_of_order: 3,
    customer: {
      name: "David Green",
      picture: "https://xsgames.co/randomusers/avatar.php?g=male",
      time: "2024-06-23T20:19:58.131611",
    },
  },
  {
    type: "new",
    id: "ORD14708",
    location: "Paris, France",
    amount: 259.0,
    no_of_order: 5,
    customer: {
      name: "David Green",
      picture: "https://xsgames.co/randomusers/avatar.php?g=female",
      time: "2024-06-20T20:19:58.131619",
    },
  },
  {
    type: "kitchen",
    id: "ORD98836",
    location: "New York, USA",
    amount: 174.0,
    no_of_order: 2,
    customer: {
      name: "Eva Blue",
      picture: "https://xsgames.co/randomusers/avatar.php?g=female",
      time: "2024-06-29T20:19:58.131632",
    },
  },
  {
    type: "new",
    id: "ORD14198",
    location: "Tokyo, Japan",
    amount: 167.0,
    no_of_order: 1,
    customer: {
      name: "Eva Blue",
      picture: "https://xsgames.co/randomusers/avatar.php?g=male",
      time: "2024-06-21T20:19:58.131644",
    },
  },
  {
    type: "kitchen",
    id: "ORD19496",
    location: "Tokyo, Japan",
    amount: 165.0,
    no_of_order: 4,
    customer: {
      name: "Carol White",
      picture: "https://xsgames.co/randomusers/avatar.php?g=female",
      time: "2024-06-18T20:19:58.131655",
    },
  },
  {
    type: "delivery",
    id: "ORD90064",
    location: "Tokyo, Japan",
    amount: 127.0,
    no_of_order: 2,
    customer: {
      name: "Bob Smith",
      picture: "https://xsgames.co/randomusers/avatar.php?g=female",
      time: "2024-06-24T20:19:58.131675",
    },
  },
  {
    type: "kitchen",
    id: "ORD15257",
    location: "London, UK",
    amount: 173.0,
    no_of_order: 5,
    customer: {
      name: "Alice Johnson",
      picture: "https://xsgames.co/randomusers/avatar.php?g=male",
      time: "2024-06-26T20:19:58.131683",
    },
  },
  {
    type: "kitchen",
    id: "ORD89250",
    location: "Berlin, Germany",
    amount: 166.0,
    no_of_order: 3,
    customer: {
      name: "Bob Smith",
      picture: "https://xsgames.co/randomusers/avatar.php?g=female",
      time: "2024-07-01T20:19:58.131690",
    },
  },
  {
    type: "kitchen",
    id: "ORD13132",
    location: "New York, USA",
    amount: 66.0,
    no_of_order: 4,
    customer: {
      name: "Carol White",
      picture: "https://xsgames.co/randomusers/avatar.php?g=male",
      time: "2024-07-03T20:19:58.131701",
    },
  },
  {
    type: "delivery",
    id: "ORD20160",
    location: "Paris, France",
    amount: 72.0,
    no_of_order: 3,
    customer: {
      name: "Carol White",
      picture: "https://xsgames.co/randomusers/avatar.php?g=male",
      time: "2024-07-02T20:19:58.131712",
    },
  },
  {
    type: "delivery",
    id: "ORD69761",
    location: "Tokyo, Japan",
    amount: 80.0,
    no_of_order: 4,
    customer: {
      name: "Carol White",
      picture: "https://xsgames.co/randomusers/avatar.php?g=female",
      time: "2024-06-19T20:19:58.131727",
    },
  },
  {
    type: "delivery",
    id: "ORD10966",
    location: "Tokyo, Japan",
    amount: 254.0,
    no_of_order: 5,
    customer: {
      name: "Eva Blue",
      picture: "https://xsgames.co/randomusers/avatar.php?g=male",
      time: "2024-06-17T20:19:58.131735",
    },
  },
]);
</script>

<style scoped>
.router-link {
  @apply flex w-40 justify-center border-b-2 border-transparent p-2 text-black;
}
.router-link-exact-active {
  @apply border-b-2 border-black font-medium text-black;
}
</style>
