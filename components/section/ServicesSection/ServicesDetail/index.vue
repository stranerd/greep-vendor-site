<template>
  <div class="grid w-full gap-8 bg-black p-4 lg:p-10">
    <section class="text-white lg:w-2/3">
      <CursiveTitle>
        <span class="notranslate" translate="no">Greep</span>
        Services</CursiveTitle
      >
      <h2 class="my-5 text-4xl font-semibold lg:w-3/5 lg:text-5xl">
        All Services Provided by
        <span class="notranslate" translate="no">Greep</span>
      </h2>
      <p class="lg:text-lg">
        Scan, Pay, and Go!. Make payments easily with GreepPay. Simply scan the
        QR code, enter the amount, and confirm to pay.
      </p>
    </section>

    <section
      style="
        background-image: url(&quot;/images/services/greep-pay-fill.png&quot;);
        /* background-size: contain; */
        background-position: top;
        background-repeat: no-repeat;
        overflow: hidden;
      "
      class="h-[240px] w-full bg-black bg-cover pt-[114px] lg:h-[428px] lg:bg-contain"
    >
      <h2 class="ml-[74px] text-[45px] font-medium text-white lg:text-[90px]">
        <span class="notranslate" translate="no">Greep</span> Pay
      </h2>
    </section>

    <div class="grid gap-4 lg:grid-cols-2 lg:gap-8">
      <div class="grid grid-cols-2 gap-4 lg:gap-8" v-for="cards in services">
        <ServicesCard
          class="h-[428px] w-full overflow-hidden border-none"
          v-for="item in cards"
          :item="item"
        >
        </ServicesCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Profile2UserIcon, ShopIcon } from "@placetopay/iconsax-vue/bold";
import { customerServices, vendorServices } from "~/data/services.json";
const serviceTypes = shallowRef([
  { title: "Customers", icon: Profile2UserIcon },
  { title: "Vendors", icon: ShopIcon },
]);
const activeServiceType = shallowRef(serviceTypes.value[1]);

const services = computed(() => [...customerServices, ...vendorServices]);
</script>

<style scoped></style>
