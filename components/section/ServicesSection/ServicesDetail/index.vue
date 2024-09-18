<template>
  <div class="grid w-full gap-8 bg-black p-10">
    <section class="w-2/3 text-white">
      <CursiveTitle>Greep Services</CursiveTitle>
      <h2 class="my-5 w-3/5 text-5xl font-semibold">
        All Services Provided by Greep
      </h2>
      <p class="text-lg">
        Scan, Pay, and Go!. Make payments easily with GreepPay. Simply scan the
        QR code, enter the amount, and confirm to pay.
      </p>
    </section>

    <section
      style="
        background-image: url(&quot;/images/features-full-bg.png&quot;);
        background-size: contain;
        background-position: top;
        background-repeat: no-repeat;
        overflow: hidden;
      "
      class="h-[428px] bg-black pt-[114px]"
    >
      <h2 class="ml-[74px] text-[90px] font-medium text-white">Greep Pay</h2>
    </section>

    <div class="grid grid-cols-2 gap-8">
      <div class="grid grid-cols-2 gap-8" v-for="cards in services">
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
