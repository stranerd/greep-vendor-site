<template>
  <div class="max-w-[456px] m-auto w-full">
    <img
      src="/images/logos/greep.svg"
      alt="Greep"
      class="mx-auto w-[45.45px] h-[45.45px] object-contain mb-2"
    />
    <h3
      class="text-center text-[22px] text-[#001726] leading-[33px] font-semibold"
    >
      Online Payment
    </h3>
    <p class="text-center text-[#999999] text-[14px] mb-[10px]">
      Make payment for your purchase
    </p>
    <div
      class="rounded-[16px] p-5"
      style="box-shadow: 0px 0px 4px 0px #00000040"
    >
      <h5 class="text-[16px] leading-[24px] font-semibold mb-[26px]">
        Order Details
      </h5>
      <div class="flex items-center justify-between mb-[19px]">
        <div>
          <p class="text-[12px] leading-[20px] text-[#999999]">Customer Name</p>
          <h6 class="text-[#001726] text-[14px] leading-[20px] font-normal">
            {{ user?.allNames?.full }}
          </h6>
        </div>
        <div>
          <p class="text-[12px] leading-[20px] text-[#999999]">Order ID</p>
          <h6 class="text-[#001726] text-[14px] leading-[20px] font-normal">
            {{ cartLinkDetails?.id?.slice(0, 7) }}...
          </h6>
        </div>
      </div>
      <!-- <div class="mb-[19px]">
        <p class="text-[12px] leading-[20px] text-[#999999]">Delivery type</p>
        <h6 class="text-[#001726] text-[14px] leading-[20px] font-normal">
          Instant Delivery
        </h6>
      </div>
      <div class="mb-[19px]">
        <p class="text-[12px] leading-[20px] text-[#999999]">Address</p>
        <h6 class="text-[#001726] text-[14px] leading-[20px] font-normal">
          City building, apartment 15
        </h6>
      </div> -->
      <table>
        <thead>
          <tr>
            <th
              v-for="(header, i) in tableHeaders"
              :key="i"
              class="border-t-[1px] border-t-[#E0E2E4] border-b-[1px] border-b-[#E0E2E4] pr-[8px] text-left font-normal py-[9px] text-[12px] leaidng-[18px]"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody v-if="cartLinkDetails?.packs?.[0]?.length > 0">
          <tr v-for="(pack, i) in cartLinkDetails.packs?.[0]" :key="i">
            <td class="py-[19px] pr-[8px]">
              <p class="text-[12px] leading-[18px]">
                {{ pack.title }}
                <span class="text-[#999999] block">{{ pack.description }}</span>
              </p>
            </td>
            <td class="py-[19px] pr-[8px]">
              <p class="text-[12px] leading-[18px]">{{ pack.quantity }}x</p>
            </td>
            <td class="py-[19px] pr-[8px]">
              <p class="text-[12px] leading-[18px]">
                {{
                  currencyConverter(
                    pack?.price?.currency,
                    pack?.price?.amount || 0
                  )
                }}
              </p>
            </td>
            <td class="py-[19px]">
              <p class="text-[12px] leading-[18px]">
                {{
                  currencyConverter(
                    pack?.price?.currency,
                    pack?.price?.amount * pack?.quantity
                  )
                }}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="border-t-[1px] border-t-[#E0E2E4] my-[19px]"></div>
      <div class="max-w-[200px] ml-auto">
        <div class="flex items-center justify-between gap-[8px] mb-[10px]">
          <p class="text-[12px] leading-[18px] text-[#616161]">Subtotal</p>
          <p class="text-[12px] leading-[18px]">{{ productTotal }}</p>
        </div>
        <!-- <div class="flex items-center justify-between gap-[8px] mb-[10px]">
          <p class="text-[12px] leading-[18px] text-[#616161]">Delivery fee</p>
          <p class="text-[12px] leading-[18px]">₺431.56</p>
        </div>
        <div class="flex items-center justify-between gap-[8px] mb-[10px]">
          <p class="text-[12px] leading-[18px] text-[#616161]">VAT</p>
          <p class="text-[12px] leading-[18px]">₺431.56</p>
        </div>
        <div class="flex items-center justify-between gap-[8px]">
          <p class="text-[12px] leading-[18px] text-[#616161] font-semibold">
            Total
          </p>
          <p class="text-[12px] leading-[18px]">₺431.56</p>
        </div> -->
      </div>
      <Button class="mt-[26px] w-full" @click="isDialogOpen = true">
        Make Payment
      </Button>
      <client-only>
        <CheckoutCartlinkModal
          :cartLinkId="cartLinkDetails.id"
          :isOpen="isDialogOpen"
          @close="isDialogOpen = false"
          @completed="isDialogOpen = false"
        />
      </client-only>
    </div>
  </div>
</template>

<script setup lang="ts">
import { API_STATES } from "~/services/constants";
import { useMarketPlaceStore } from "@/store/useMarketplace";
import { useAuthStore } from "@/store/useAuthStore";
const marketPlaceStore = useMarketPlaceStore();
const authStore = useAuthStore();
import { currencyConverter } from "@/lib/utils";

const { marketplaceLoadingStates } = storeToRefs(marketPlaceStore);
const { user } = storeToRefs(authStore);

const { getCartLinkDetails } = marketPlaceStore;

const tableHeaders = ref(["Items", "Quantity", "Price", "Total"]);
const route = useRoute();

const cartLinkDetails = ref({});
const isDialogOpen = ref(false);

const productTotal = computed(() => {
  return cartLinkDetails.value.packs?.[0]?.reduce((acc: any, product: any) => {
    return acc + (product?.price?.amount || product.amount) * product.quantity;
  }, 0);
});

onMounted(async () => {
  cartLinkDetails.value = await getCartLinkDetails(route?.query?.id);
});
</script>

<style></style>
