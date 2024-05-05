<template>
  <section>
    <div class="container">
      <h3 class="text-center text-[#1A1A1A] text-[35px] font-semibold italic">
        “Trusted by some of the world's best companies”
      </h3>
    </div>

    <div
      class="flex align-center justify-center gap-[80px] mt-[43px] mb-[92px]"
    >
      <img
        v-for="(partner, i) in partners"
        :key="i"
        class="h-[52px] w-auto"
        :src="partner.img"
        :alt="partner.name"
      />
    </div>
    <div class="container flex justify-between w-full">
      <div class="grow max-w-[391px] mr-[98px]">
        <div class="flex items-center">
          <div
            class="h-[16px] w-[16px] border-[2px] border-[#10BB76] bg-[#04D28C14] rounded-full mr-1"
          ></div>
          <h4 class="text-[#CBCBCB] font-cursive text-[32px]">What we do</h4>
        </div>
        <h5 class="text-[35px] font-semibold text-[#000E18]">
          Safe & Reliable Cargo Solutions
        </h5>
      </div>

      <div class="grid grid-cols-2 gap-x-[89px] gap-y-[70px]">
        <div v-for="(property, i) in properties" :key="i" class="flex">
          <img
            :src="property.img"
            :alt="property.title"
            class="mr-[4px] w-[62px] h-auto"
          />
          <div
            class="border-r-[1px] border-[#D8D8D8] h-[139px] mx-[25px]"
          ></div>
          <div>
            <h6 class="mb-[13px] text-[25px] font-semibold">
              {{ property.title }}
            </h6>
            <p class="text-[#777E90] text-[16px] font-medium max-w-[320px]">
              {{ property.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const partners = ref([
  {
    img: "/images/logos/smartfinder.svg",
    name: "SmartFinder",
  },
  {
    img: "/images/logos/zoomer.svg",
    name: "Zoomer",
  },
  {
    img: "/images/logos/shells.png",
    name: "Shells",
  },
  {
    img: "/images/logos/waves.svg",
    name: "Shells",
  },
  {
    img: "/images/logos/art-avenue.svg",
    name: "Art avenue",
  },
  {
    img: "/images/logos/smartfinder.svg",
    name: "SmartFinder",
  },
  {
    img: "/images/logos/zoomer.svg",
    name: "Zoomer",
  },
]);

const properties = ref([
  {
    img: "/images/llustrations/browse.svg",
    title: "Browse & Select",
    description:
      "Explore our diverse range of African food items, select your favorites, and add them to your cart.",
  },
  {
    img: "/images/llustrations/stellar-payment.svg",
    title: "Stellar Payment",
    description:
      "Pay with ease using Stellar, making transactions in your local African currency secure and hassle-free.",
  },
  {
    img: "/images/llustrations/delivery.svg",
    title: "Swift Delivery",
    description:
      "Sit back and relax as we handle the logistics. Our reliable delivery partners ensure your order reaches you on time.",
  },
  {
    img: "/images/llustrations/expansion.svg",
    title: "Global Expansion",
    description:
      "Join a thriving community of businesses and individuals as Greep expands globally. Share the taste of Africa with the world!",
  },
]);
</script>

<style>
.element {
  clip-path: url(#svgPath);
  width: 100%;
  background-position: center;
  min-height: 841px;
}
</style>
