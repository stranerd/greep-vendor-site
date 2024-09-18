<template>
  <div class="mt-20">
    <div class="w-full items-center justify-center lg:flex lg:text-center">
      <CursiveTitle>Greep Services</CursiveTitle>
    </div>
    <h2
      class="mx-auto my-5 mt-10 text-4xl font-semibold text-white lg:w-3/4 lg:text-center lg:text-6xl"
    >
      Explore the World of Our Amazing Services
    </h2>
    <p
      class="mx-auto my-10 text-sm text-white lg:w-3/4 lg:text-center lg:text-2xl"
    >
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
        class="flex h-12 w-[160px] gap-x-4 rounded-full bg-white text-black duration-1000 hover:bg-gray-500/10"
      >
        <component :is="service.icon" class="h-5 w-5" />
        <span class="">{{ service.title }}</span>
      </Button>
    </div>

    <transition name="fade" mode="out-in">
      <div
        class="grid gap-4 lg:grid-cols-2 lg:gap-8"
        v-if="activeServiceType.title === 'Customers'"
      >
        <div
          class="grid grid-cols-2 gap-4 lg:gap-8"
          v-for="cards in customerServices"
        >
          <ServicesCard
            class="h-[428px] w-full overflow-hidden border-none"
            v-for="item in cards"
            :item="item"
          >
          </ServicesCard>
        </div>
      </div>
      <div v-else class="grid gap-4 lg:grid-cols-2 lg:gap-8">
        <div
          class="grid grid-cols-2 gap-4 lg:gap-8"
          v-for="cards in vendorServices"
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

    <NuxtLink to="/services">
      <Button
        class="button ml-auto mt-4 flex items-center gap-x-2 text-white underline"
        variant="ghost"
      >
        <span class="">View All</span>
        <ArrowRight1Icon class="icon h-5 w-5 text-white" />
      </Button>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { Profile2UserIcon, ShopIcon } from "@placetopay/iconsax-vue/bold";
import { ArrowRight1Icon } from "@placetopay/iconsax-vue/outline";
import { vendorServices, customerServices } from "~/data/services.json";
const serviceTypes = shallowRef([
  { title: "Customers", icon: Profile2UserIcon },
  { title: "Vendors", icon: ShopIcon },
]);

const activeServiceType = shallowRef(serviceTypes.value[0]);
</script>

<style scoped>
.button:hover > .icon {
  @apply text-black/90;
}
</style>
