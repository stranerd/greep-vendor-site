<template>
  <!-- <div v-if="marketplaceLoadingStates.singleOrder === API_STATES.LOADING">
    <Skeleton class="mb-6 h-[340px] w-full" />
    <Skeleton class="h-[540px] w-full" />
  </div> -->

  <!-- The main scroll items -->
  <div class="max-h-[80vh] w-full overflow-auto pr-2">
    <!-- Customer descriptions -->
    <div class="grid grid-cols-2 items-center gap-4">
      <div
        class="text-sm"
        v-for="(details, index) in customerDetails"
        :class="{ 'text-end': index % 2 === 1 }"
      >
        <h2 class="">{{ details.title }}</h2>
        <h2 class="text-black">{{ details.value }}</h2>
      </div>
    </div>

    <!-- Items table -->
    <div
      class="mt-4 grid grid-cols-[3fr,1.5fr,1fr,1fr] border-y border-[#E0E2E4] p-2 text-black"
    >
      <h2 class="">Items</h2>
      <h2 class="">Quantity</h2>
      <h2 class="">Price</h2>
      <h2 class="text-end">Total</h2>
    </div>

    <!-- Items List -->
    <div
      class="grid grid-cols-[3fr,1.5fr,1fr,1fr] p-2 text-black"
      v-for="item in itemList"
    >
      <h2 class="">
        <h2 class="">{{ item.title }} ></h2>
        <h2 class="max-w-[80%] text-xs text-[#999999]">{{ item.addOns }}</h2>
      </h2>
      <h2 class="">{{ item.quantity }}x</h2>
      <h2 class="">{{ currencyConverter("TRY", item.price) }}</h2>
      <h2 class="text-end">
        {{ currencyConverter("TRY", item.price * item.quantity) }}
      </h2>
    </div>

    <div class="my-4 flex flex-col items-end gap-2 border-t py-4 text-black">
      <div class="flex w-60 items-center justify-between gap-x-16">
        <h2 class="text-[#999999]">Subtotal</h2>
        <h2 class="">{{ currencyConverter("TRY", subTotalPrice) }}</h2>
      </div>
      <div class="flex w-60 items-center justify-between gap-x-16">
        <h2 class="text-[#999999]">Delivery Fee</h2>
        <h2 class="">{{ currencyConverter("TRY", deliveryFee) }}</h2>
      </div>
      <div class="flex w-60 items-center justify-between gap-x-16">
        <h2 class="text-[#999999]">VAT</h2>
        <h2 class="">{{ currencyConverter("TRY", VAT) }}</h2>
      </div>
      <div class="flex w-60 items-center justify-between gap-x-16">
        <h2 class="font-medium text-[#000]">Total</h2>
        <h2 class="">{{ currencyConverter("TRY", totalPrice) }}</h2>
      </div>
    </div>
  </div>

  <!-- <DisplayState
    v-else-if="marketplaceLoadingStates.singleOrder === API_STATES.ERROR"
    class="my-[80px]"
    message="Something went wrong"
    buttonText="Reload"
    @action="getSingleOrder(route?.params?.id || '')"
  /> -->
</template>

<script lang="ts" setup>
import { Ellipsis } from "lucide-vue-next";
import { API_STATES } from "~/services/constants";
import { useMarketPlaceStore } from "@/store/useMarketplace";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";

const marketPlaceStore = useMarketPlaceStore();
const { marketplaceLoadingStates, singleOrder } = storeToRefs(marketPlaceStore);
const {
  getSingleOrder,
  cancelOrder,
  rejectOrAcceptOrder,
  dispatchOrder,
  markOrderAsShipped,
} = marketPlaceStore;
import { currencyConverter, orderStatus, paymentStatus } from "@/lib/utils";

const route = useRoute();
const { $moment } = useNuxtApp();
const openDialog = ref(false);

const deliveryFee = ref(100);
const VAT = ref(10);

const customerDetails = ref([
  { title: "Customer Name", value: "John Oseni" },
  { title: "Order ID", value: "673784" },
  { title: "Delivery Type", value: "Instant Delivery" },
  { title: "Payment Type", value: "Wallet Paper" },
  { title: "Address", value: "11 Orkun Tibsoba, Lefkosa " },
  { title: "Extra Details", value: "City building, apartment 15" },
]);

const itemList = ref([
  {
    title: "Jollof Rice",
    addOns: "Lamb, Mashed Potatoes, Veggies & Sprite",
    quantity: 3,
    price: 223,
  },
  {
    title: "Fried Rice",
    addOns: "Beef, Fried Plantains, Mixed Salad & Juice",
    quantity: 1,
    price: 288,
  },
  {
    title: "Spaghetti Bolognese",
    addOns: "Pork, Rice Balls, Coleslaw & Fanta",
    quantity: 5,
    price: 251,
  },
  {
    title: "Chicken Curry",
    addOns: "Chicken, Plantain, Salad & Coke",
    quantity: 2,
    price: 457,
  },
]);

const subTotalPrice = computed(() =>
  itemList.value.reduce((accumulator: any, dish: any) => {
    return accumulator + dish.price;
  }, 0),
);

const totalPrice = computed(
  () => subTotalPrice.value + VAT.value + deliveryFee.value,
);
</script>

<style></style>
