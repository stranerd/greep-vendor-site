<template>
  <div
    class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
  >
    <Sidebar />
    <div class="max-h-[100vh] overflow-y-scroll">
      <div class="flex flex-col">
        <DashboardNav />

        <div
          v-if="!hasVerifiedEmail"
          class="sticky top-[75px] z-[10] flex justify-center bg-[#009260] py-3 text-[14px] text-[#fff]"
        >
          ⚠️ Please verify your email address to continue
          <nuxt-link class="ml-2 underline" to="/vendor/settings">
            Here
          </nuxt-link>
        </div>
        <div
          v-else-if="!hasCompletedVendorProfile || !hasCompletedProfile"
          class="sticky top-[75px] z-[10] flex justify-center bg-[#009260] py-3 text-[14px] text-[#fff]"
        >
          ⚠️ Please update your profile
          <nuxt-link
            v-if="route.path !== '/vendor/settings'"
            class="ml-2 underline"
            to="/vendor/settings"
          >
            Here
          </nuxt-link>
        </div>
        <main class="relative flex flex-1 flex-col gap-4 py-6 lg:gap-6">
          <div
            v-if="
              (!hasCompletedVendorProfile || !hasCompletedProfile) &&
              route.path !== '/vendor/settings'
            "
            class="absolute left-0 top-0 z-[5] h-full w-full"
            style="
              /* From https://css.glass */
              background: rgba(255, 255, 255, 0.34);
              border-radius: 16px;
              box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
              backdrop-filter: blur(6.4px);
              -webkit-backdrop-filter: blur(6.4px);
            "
          ></div>

          <div
            class="container flex flex-1 flex-col gap-4 px-[20px] md:px-[2rem] lg:gap-6"
          >
            <slot />
          </div>
        </main>
      </div>
    </div>

    <FileUploader
      @upload="uploadStore.upload()"
      @cancelled="uploadStore.cancel()"
      @close="uploadStore.cancel()"
      v-if="uploadStore.showModal"
    />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/useAuthStore";
import { useMarketPlaceStore } from "~/store/useMarketplace";
import { usePaymentStore } from "~/store/usePayment";
import { useSupportStore } from "~/store/useSupport";
import { useUploadStore } from "~/store/useUploadStore";

const { $moment } = useNuxtApp();
const uploadStore = useUploadStore();
const authStore = useAuthStore();
const marketplaceStore = useMarketPlaceStore();
const paymentStore = usePaymentStore();
const supportStore = useSupportStore();

const { hasCompletedVendorProfile, hasCompletedProfile, hasVerifiedEmail } =
  storeToRefs(authStore);

const route = useRoute();

onBeforeMount(async () => {
  authStore.getUser();
  authStore.getUserProfile();

  paymentStore.getUserWallet();
  paymentStore.getUserTransactionHistory();

  marketplaceStore.getAllProducts({});
  marketplaceStore.getAllPromotions();
  marketplaceStore.getVendorProductTags();
  marketplaceStore.getRecentOrders();
  marketplaceStore.getVendorOrders();
  marketplaceStore.getProductFoodsTags();

  supportStore.getChatList();

  marketplaceStore.getDashboardData({
    start: new Date($moment().startOf("M")),
    end: new Date($moment().endOf("M")),
  });
});
</script>
