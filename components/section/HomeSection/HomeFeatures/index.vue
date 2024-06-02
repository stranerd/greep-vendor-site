<template>
  <section
    style="
      background-image: url('/images/features-bg.svg');
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      overflow: hidden;
    "
    class="bg-[#000E18] pt-[114px]"
  >
    <div class="container px-[20px] md:px-[2rem]">
      <div class="flex items-center w-full justify-center">
        <CursiveTitle> Features </CursiveTitle>
      </div>

      <h2
        class="text-center font-semibold text-[24px] md:text-[48px] lg:text-[64px] mb-[34px] text-[white] max-w-[732px] mx-auto"
      >
        The features <br />Both familiar and new.
      </h2>
      <div
        class="hidden lg:flex items-center justify-center gap-[58px] text-[white]"
      >
        <div class="flex flex-col gap-[86px]">
          <div
            v-for="(feature, i) in featuresOne"
            :key="i"
            class="bg-[#001726] p-4 rounded-[12px] min-h-[194px]"
          >
            <div class="flex items-center gap-[10px] mb-[36px]">
              <img
                :src="feature.img"
                :alt="feature.name"
                class="w-[35px] h-[35px]"
              />
              <h6 class="text-[22px] font-semibold">
                {{ feature.name }}
              </h6>
            </div>
            <p class="max-w-[431px] text-[16px] leading-[24px]">
              {{ feature.description }}
            </p>
          </div>
        </div>
        <img
          src="/images/features.png"
          alt="App features"
          class="max-w-[298.21px] w-full"
        />
        <div class="flex flex-col gap-[86px]">
          <div
            v-for="(feature, i) in featuresTwo"
            :key="i"
            class="bg-[#001726] p-4 rounded-[12px] min-h-[194px]"
          >
            <div class="flex items-center gap-[10px] mb-[36px]">
              <img
                :src="feature.img"
                :alt="feature.name"
                class="w-[35px] h-[35px]"
              />
              <h6 class="text-[22px] font-semibold">
                {{ feature.name }}
              </h6>
            </div>
            <p class="max-w-[431px] text-[16px] leading-[24px]">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
      <div
        class="lg:hidden flex flex-col md:flex-row justify-center gap-[58px] relative text-[white]"
      >
        <div>
          <img
            src="/images/features.png"
            alt="App features"
            class="max-w-[298.21px] mx-auto h-auto w-full sticky top-[240px]"
          />
        </div>

        <div class="flex flex-col gap-[33px] md:gap-[86px]">
          <div
            v-for="(feature, i) in featuresOne"
            :key="i"
            class="bg-[#001726] p-4 rounded-[12px] min-h-[194px]"
          >
            <div class="flex items-center gap-[10px] mb-[36px]">
              <img
                :src="feature.img"
                :alt="feature.name"
                class="w-[35px] h-[35px]"
              />
              <h6 class="text-[22px] font-semibold">
                {{ feature.name }}
              </h6>
            </div>
            <p class="max-w-[431px] text-[16px] leading-[24px]">
              {{ feature.description }}
            </p>
          </div>
          <div
            v-for="(feature, i) in featuresTwo"
            :key="i"
            class="bg-[#001726] p-4 rounded-[12px] min-h-[194px]"
          >
            <div class="flex items-center gap-[10px] mb-[36px]">
              <img
                :src="feature.img"
                :alt="feature.name"
                class="w-[35px] h-[35px]"
              />
              <h6 class="text-[22px] font-semibold">
                {{ feature.name }}
              </h6>
            </div>
            <p class="max-w-[431px] text-[16px] leading-[24px]">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
      <div class="text-[white] pt-[40px] md:pt-[80px] mt-[70px] lg:mt-[156px]">
        <div class="flex items-center justify-center md:justify-start">
          <CursiveTitle> Our Company </CursiveTitle>
        </div>

        <h2
          class="text-[24px] text-center md:text-left md:text-[32px] lg:text-[48px] md:mt-4 font-bold leading-[57.6px]"
        >
          Greep Company
        </h2>
        <p
          class="text-[16px] md:text-[18px] text-center mt-[10px] max-w-[1182px] mb-[63px] mx-auto"
        >
          This company is dedicated to celebrating and promoting the cultural
          heritage of the African diaspora while also economically empowering
          entrepreneurs and artisans within this community. Through a global
          marketplace, it offers authentic products, services, and experiences,
          connecting them with a broader audience.
        </p>
      </div>
      <div class="relative">
        <div
          class="absolute bottom-0 h-[65%] left-[-50%] w-[250%] bg-[#fff] z-0"
        ></div>
        <video
          id="video1"
          class="main-vid z-[1] relative max-w-[1147px] w-full mx-auto rounded-[20px] overflow-hidden w-auto lg:h-[607px]"
          playsinline
        >
          <source
            class="rounded-[20px]"
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const featuresOne = ref([
  {
    name: "Authenticity at Your Fingertips",
    img: "/images/llustrations/food-delivery.png",
    description:
      "Explore a rich catalog of African food items from local suppliers, ensuring the authenticity of every dish. From jollof rice to suya, Greep has it all!",
  },
  {
    name: "Reliable Delivery",
    img: "/images/llustrations/truck.png",
    description:
      "Our efficient logistics system ensures your orders are handled with care and delivered to your doorstep promptly. Track your packages in real-time for added peace of mind.",
  },
]);

const featuresTwo = ref([
  {
    name: "Stellar-Powered Payments",
    img: "/images/llustrations/corruption.png",
    description:
      "Say goodbye to currency conversion headaches! Greep integrates with Stellar blockchain for seamless transactions in your local African currency, reducing costs and simplifying payments.",
  },
  {
    name: "Global Marketplace",
    img: "/images/llustrations/globe.png",
    description:
      "Discover a global marketplace connecting businesses and individuals. Greep opens the door to a world of possibilities for those wanting to share their love for African cuisine on a global scale.",
  },
]);
</script>

<style></style>
