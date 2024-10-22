<template>
  <div class="m-auto w-full max-w-[456px]">
    <img
      src="/images/logos/greep.svg"
      alt="Greep"
      class="mx-auto mb-2 h-[45.45px] w-[45.45px] object-contain"
    />
    <h3
      class="text-center text-[22px] font-semibold leading-[33px] text-[#001726]"
    >
      Online Payment
    </h3>
    <p class="mb-[10px] text-center text-[14px] text-[#999999]">
      Make payment for your purchase
    </p>

    <div
      class="rounded-[16px] p-5"
      style="box-shadow: 0px 0px 4px 0px #00000040"
    >
      <h5 class="mb-[26px] text-[16px] font-semibold leading-[24px]">
        Order Details
      </h5>
      <div class="mb-[19px] flex items-center justify-between">
        <div>
          <p class="text-[12px] leading-[20px] text-[#999999]">Customer Name</p>
          <h6 class="text-[14px] font-normal leading-[20px] text-[#001726]">
            {{ user?.allNames?.full }}
          </h6>
        </div>
        <div>
          <p class="text-[12px] leading-[20px] text-[#999999]">Order ID</p>
          <h6 class="text-[14px] font-normal leading-[20px] text-[#001726]">
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
      <table class="w-full">
        <thead>
          <tr>
            <th
              v-for="(header, i) in tableHeaders"
              :key="i"
              class="leaidng-[18px] border-b-[1px] border-t-[1px] border-b-[#E0E2E4] border-t-[#E0E2E4] py-[9px] pr-[8px] text-left text-[12px] font-normal"
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
                <span class="block text-[#999999]">{{
                  Object.values(pack.addOnsMap)
                    .map((i) => i.itemName)
                    .join(", ")
                }}</span>
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
                    pack?.price?.amount || 0,
                  )
                }}
              </p>
            </td>
            <td class="py-[19px]">
              <p class="text-[12px] leading-[18px]">
                {{
                  currencyConverter(
                    pack?.price?.currency,
                    pack?.price?.amount * pack?.quantity,
                  )
                }}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="my-[19px] border-t-[1px] border-t-[#E0E2E4]"></div>
      <div class="ml-auto max-w-[200px]">
        <div class="mb-[10px] flex items-center justify-between gap-[8px]">
          <p class="text-[12px] leading-[18px] text-[#616161]">Subtotal</p>
          <p class="text-[12px] leading-[18px]">{{ productTotal }}</p>
        </div>
      </div>
      <Button class="mt-[26px] w-full" @click="isDialogOpen = true">
        Make Payment
      </Button>
      <client-only>
        <CheckoutCartlinkModal
          :cartLinkId="cartLinkDetails.id"
          v-if="isDialogOpen"
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
