<template>
  <section>
    <div class="container px-[20px] md:px-[2rem]">
      <CursiveTitle> Vendor </CursiveTitle>
      <h2
        class="mb-[50px] mt-4 text-[24px] font-bold md:text-[32px] lg:text-[48px]"
      >
        Greep Vendors
      </h2>
      <div>
        <client-only>
          <swiper
            class="vendor-slider"
            :navigation="true"
            :modules="modules"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
          >
            <swiper-slide v-for="(_, i) in 5" :key="i">
              <div
                class="flex w-full flex-col items-center justify-between gap-[24px] md:gap-[40px] lg:flex-row lg:gap-[69px]"
              >
                <div class="w-full max-w-[1006px] grow lg:min-w-[500px]">
                  <img
                    src="/images/vendor-img.jpg"
                    alt="Vendor admin"
                    class="h-auto w-full object-cover"
                  />
                </div>

                <div class="max-w-[584px] grow">
                  <p
                    class="mb-6 text-[14px] leading-[26px] text-[#000E18] md:text-[16px] md:leading-[30px] lg:text-[20px]"
                  >
                    Feature 1: Online Store CreationCreating an online store has
                    never been easier. With GreepVendor, entrepreneurs can
                    quickly set up a professional online presence, complete with
                    customizable templates, easy product uploads, and a secure
                    payment gateway. Our intuitive store builder guides you
                    through the process, so you can focus on selling rather than
                    coding. Whether you're just starting out or expanding your
                    existing business, our online store creation feature has got
                    you covered.
                  </p>
                  <button
                    class="flex items-center rounded-[100px] border-[1px] bg-[#FFFFFF] px-[24px] py-[18px]"
                    @click="router.push('/news/curating-a-workspace')"
                  >
                    Get Started Now
                    <img
                      src="/images/icons/arrow-up-right.svg"
                      alt=""
                      class="ml-[10px] h-[20px] w-[20px]"
                    />
                  </button>
                </div>
              </div>
            </swiper-slide>
          </swiper>

          <div class="mb-[80px] flex items-center justify-between">
            <div class="flex items-center gap-[8px]">
              <div
                v-for="(_, i) in 5"
                :key="i"
                class="h-[8px] w-[8px] cursor-pointer rounded-full"
                :class="
                  swiperInstance?.activeIndex === i
                    ? 'bg-[#000000]'
                    : 'bg-[#8D8D8D]'
                "
                @click="swiperInstance?.slideTo(i)"
              ></div>
            </div>
            <div class="flex items-center gap-2">
              <img
                src="/images/icons/arrow-left-sm.svg"
                alt="Left"
                class="h-[48px] w-[48px] cursor-pointer rounded-full object-contain"
                @click="swiperInstance?.slidePrev()"
              />
              <img
                src="/images/icons/arrow-right-sm.svg"
                alt="Right"
                class="h-[48px] w-[48px] cursor-pointer rounded-full object-contain"
                @click="swiperInstance?.slideNext()"
              />
            </div>
          </div>
        </client-only>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const router = useRouter();
    const swiperInstance = ref<any>(null);
    const onSwiper = (swiper: any) => {
      console.log(swiper);
      swiperInstance.value = swiper;
    };
    const onSlideChange = (swiper: any) => {
      console.log("slide change", { swiper });
      swiperInstance.value = swiper;
    };

    return {
      onSwiper,
      onSlideChange,
      modules: [Navigation, Pagination],
      swiperInstance,
      router,
    };
  },
};
</script>

<style>
.vendor-slider {
  padding-bottom: 30px;
}
.vendor-slider .swiper-button-next {
  display: none;
}
.vendor-slider .swiper-button-next::after,
.vendor-slider .swiper-button-prev::after {
  display: none;
}
.vendor-slider .swiper-button-prev {
  display: none;
}
</style>
