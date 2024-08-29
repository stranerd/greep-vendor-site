<template>
  <section
    style="
      background-image: url(&quot;/images/features-full-bg.png&quot;);
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      overflow: hidden;
    "
    class="bg-[#000E18] pt-[114px]"
  >
    <div class="container px-[20px] md:px-[2rem]">
      <div class="flex w-full items-center justify-center">
        <CursiveTitle> Features </CursiveTitle>
      </div>

      <h2
        class="mx-auto mb-[34px] max-w-[732px] text-center text-[24px] font-semibold text-[white] md:text-[48px] lg:text-[64px]"
      >
        The features <br />Both familiar and new.
      </h2>
      <div
        class="hidden items-center justify-center gap-[58px] text-[white] lg:flex"
      >
        <div class="flex flex-col gap-[86px]">
          <div
            v-for="(feature, i) in featuresOne"
            :key="i"
            @click="activeFeature = feature"
            :class="{ '!bg-white text-[#001726]': activeFeature === feature }"
            class="min-h-[194px] cursor-pointer rounded-[12px] bg-[#001726] p-4 duration-1000"
          >
            <div class="mb-[36px] flex items-center gap-[10px]">
              <img
                :src="feature.img"
                :alt="feature.name"
                class="h-[35px] w-[35px]"
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
        <transition mode="out-in" name="fade" :duration="400">
          <img
            :src="activeFeature.featureImage"
            :key="activeFeature.featureImage"
            alt="App features"
            class="w-full max-w-[298.21px] bg-black mix-blend-screen"
        /></transition>
        <div class="flex flex-col gap-[86px]">
          <div
            v-for="(feature, i) in featuresTwo"
            :key="i"
            @click="activeFeature = feature"
            :class="{ '!bg-white text-[#001726]': activeFeature === feature }"
            class="min-h-[194px] cursor-pointer rounded-[12px] bg-[#001726] p-4 duration-1000"
          >
            <div class="mb-[36px] flex items-center gap-[10px]">
              <img
                :src="feature.img"
                :alt="feature.name"
                class="h-[35px] w-[35px]"
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
        class="relative flex flex-col justify-center gap-[58px] text-[white] md:flex-row lg:hidden"
      >
        <div>
          <img
            src="/images/features.png"
            alt="App features"
            class="sticky top-[240px] mx-auto h-auto w-full max-w-[298.21px]"
          />
        </div>

        <div class="flex flex-col gap-[33px] md:gap-[86px]">
          <div
            v-for="(feature, i) in featuresOne"
            :key="i"
            class="min-h-[194px] rounded-[12px] bg-[#001726] p-4"
          >
            <div class="mb-[36px] flex items-center gap-[10px]">
              <img
                :src="feature.img"
                :alt="feature.name"
                class="h-[35px] w-[35px]"
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
            class="min-h-[194px] rounded-[12px] bg-[#001726] p-4"
          >
            <div class="mb-[36px] flex items-center gap-[10px]">
              <img
                :src="feature.img"
                :alt="feature.name"
                class="h-[35px] w-[35px]"
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
      <div class="mt-[70px] pt-[40px] text-[white] md:pt-[80px] lg:mt-[156px]">
        <div class="flex items-center justify-center md:justify-start">
          <CursiveTitle> Our Company </CursiveTitle>
        </div>

        <h2
          class="text-center text-[24px] font-bold leading-[57.6px] md:mt-4 md:text-left md:text-[32px] lg:text-[48px]"
        >
          Greep Company
        </h2>
        <p
          class="mx-auto mb-[63px] mt-[10px] max-w-[1182px] text-center text-[16px] md:text-[18px]"
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
          class="absolute bottom-0 left-[-50%] z-0 h-[65%] w-[250%] bg-[#fff]"
        ></div>
        <video
          id="video1"
          class="main-vid relative z-[1] mx-auto w-auto max-w-[1147px] overflow-hidden rounded-[20px] lg:h-[607px]"
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
interface FeatureCard {
  name: string;
  img: string;
  description: string;
  featureImage: string;
}

const featuresOne = ref<FeatureCard[]>([
  {
    name: "Authenticity at Your Fingertips",
    img: "/images/llustrations/food-delivery.png",
    featureImage: "/images/products/2.jpg",
    description:
      "Explore a rich catalog of African food items from local suppliers, ensuring the authenticity of every dish. From jollof rice to suya, Greep has it all!",
  },
  {
    name: "Reliable Delivery",
    img: "/images/llustrations/truck.png",
    featureImage: "/images/products/3.jpg",
    description:
      "Our efficient logistics system ensures your orders are handled with care and delivered to your doorstep promptly. Track your packages in real-time for added peace of mind.",
  },
]);

const featuresTwo = ref<FeatureCard[]>([
  {
    name: "Stellar-Powered Payments",
    img: "/images/llustrations/corruption.png",
    featureImage: "/images/products/4.jpg",
    description:
      "Say goodbye to currency conversion headaches! Greep integrates with Stellar blockchain for seamless transactions in your local African currency, reducing costs and simplifying payments.",
  },
  {
    name: "Global Marketplace",
    img: "/images/llustrations/globe.png",
    featureImage: "/images/products/1.jpg",
    description:
      "Discover a global marketplace connecting businesses and individuals. Greep opens the door to a world of possibilities for those wanting to share their love for African cuisine on a global scale.",
  },
]);

const activeFeature = ref<FeatureCard>(featuresOne.value[0]);
</script>

<style></style>
