<template>
  <section>
    <div class="container">
      <h3
        class="text-center text-[#1A1A1A] text-[20px] md:text-[28px] lg:text-[35px] font-semibold italic"
      >
        “Trusted by some of the world's best companies”
      </h3>
    </div>

    <div
      class="flex align-center relative justify-center mt-[43px] h-[52px] mb-[40px] md:mb-[92px] partners-img-container"
    >
      <div class="partners-img"></div>
      <div class="partners-blur"></div>
      <!-- <img
        v-for="(partner, i) in partners"
        :key="i"
        class="h-[52px] w-auto"
        :src="partner.img"
        :alt="partner.name"
      /> -->
    </div>
    <div
      class="container flex justify-between w-full mb-[60px] xl:mb-0 flex-col xl:flex-row"
    >
      <div class="grow max-w-[391px] mr-[30px] mb-[30px] xl:mr-[98px]">
        <div class="flex items-center">
          <div
            class="h-[16px] w-[16px] border-[2px] border-[#10BB76] bg-[#04D28C14] rounded-full mr-1"
          ></div>
          <h4
            class="text-[#CBCBCB] font-cursive text-[18px] md:text-[24px] lg:text-[32px]"
          >
            What we do
          </h4>
        </div>
        <h5
          class="text-[24px] md:text-[28px] text-center md:text-left lg:text-[35px] font-semibold text-[#000E18]"
        >
          Safe & Reliable Cargo Solutions
        </h5>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-[89px] gap-y-[70px]">
        <div v-for="(property, i) in properties" :key="i" class="flex w-full">
          <img
            :src="property.img"
            :alt="property.title"
            class="mr-[4px] w-auto h-[40px] md:w-[62px] md:h-auto"
          />
          <div
            class="border-r-[1px] border-[#D8D8D8] h-full md:h-[139px] mx-[14px] md:mx-[25px]"
          ></div>
          <div>
            <h6 class="mb-[13px] text-[20px] md:text-[25px] font-semibold">
              {{ property.title }}
            </h6>
            <p
              class="text-[#777E90] text-[14px] md:text-[16px] font-medium md:max-w-[320px]"
            >
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
@-webkit-keyframes slideleft {
  0% {
    background-position: 385000px;
  }
  100% {
    background-position: 0;
  }
}

@keyframes slideleft {
  0% {
    background-position: 385000px;
  }
  100% {
    background-position: 0;
  }
}
.partners-img-container {
  width: 100%;
  overflow: auto;
}

.partners-img-container::-webkit-scrollbar {
  width: 0 !important;
}
.partners-img-container {
  scrollbar-width: none;
}
.partners-img-container {
  -ms-overflow-style: none;
}

.partners-img-container .partners-img {
  width: 200%;
  height: 32px;
  background: transparent url(/images/partners-bg.png) repeat-x 50% 0;
  background-size: cover;
  -webkit-animation: slideleft 5000s linear infinite;
  animation: slideleft 5000s linear infinite;
  cursor: grab;
}
@media (min-width: 768px) {
  .partners-img-container .partners-img {
    width: 200%;
    height: 52px;
    background-size: contain;
  }
}
.partners-blur {
  position: absolute;
  top: 0;
  height: 100%;
  left: 0;
  background: url(/images/bg-blur.png);
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
}
/* .partners-blur::before {
  position: absolute;
  left: 0;
  height: 100%;
  content: "";
  background: linear-gradient(
    90deg,
    #ffffff 32.21%,
    rgba(255, 255, 255, 0) 139.8%
  );
  width: 10vw;
  transform: translateX(-10vw);
}
.partners-blur::after {
  position: absolute;
  right: 0;
  height: 100%;
  content: "";
  background: linear-gradient(
    90deg,
    #ffffff 32.21%,
    rgba(255, 255, 255, 0) 139.8%
  );

  width: 10vw;
  transform: translateX(10vw) rotate(180deg);
} */
</style>
