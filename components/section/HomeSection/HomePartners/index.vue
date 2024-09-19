<template>
  <section>
    <div class="container px-[20px] md:px-[2rem]">
      <h3
        class="text-center text-[20px] font-semibold italic text-[#1A1A1A] md:text-[28px] lg:text-[35px]"
      >
        “Trusted by some of the world's best companies”
      </h3>
    </div>

    <div
      class="align-center partners-img-container relative mb-[40px] mt-[43px] flex h-[52px] justify-center md:mb-[92px]"
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
      class="container flex w-full flex-col justify-between px-[20px] pb-[60px] md:px-[2rem] xl:mb-0 xl:flex-row"
    >
      <div
        class="mb-[30px] mr-[30px] flex max-w-[391px] grow flex-col justify-center xl:mr-[80px]"
      >
        <CursiveTitle>What we do</CursiveTitle>
        <h5
          class="text-center text-[24px] font-semibold text-[#000E18] md:text-left md:text-[28px] lg:text-[35px]"
        >
          Why Choose Greep ?
        </h5>
      </div>

      <div class="grid grid-cols-1 gap-x-[40px] gap-y-[70px] md:grid-cols-2">
        <div v-for="(property, i) in properties" :key="i" class="flex w-full">
          <img
            :src="property.img"
            :alt="property.title"
            class="mr-[4px] h-[40px] w-auto md:h-auto md:w-[62px]"
          />
          <div
            class="mx-[14px] h-full border-r-[1px] border-[#D8D8D8] md:mx-[25px] md:h-[139px]"
          ></div>
          <div>
            <h6 class="mb-[13px] text-[20px] font-semibold md:text-[25px]">
              {{ property.title }}
            </h6>
            <p
              class="text-[14px] font-medium text-[#777E90] md:max-w-[400px] md:text-[14px]"
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
