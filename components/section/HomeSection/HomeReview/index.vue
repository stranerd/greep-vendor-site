<template>
  <section class="relative py-[80px]">
    <div class="container">
      <CursiveTitle> Our Reviews </CursiveTitle>
      <h2
        class="mb-[30px] md:mb-[50px] text-[24px] md:text-[32px] lg:text-[48px] font-bold"
      >
        What Our Customer Say
      </h2>
      <client-only>
        <swiper
          items
          :slides-per-view="'auto'"
          class="team-slider review-slide"
          :centeredSlides="true"
          :space-between="48"
          :navigation="true"
          :modules="modules"
          :loop="true"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <swiper-slide
            v-for="(_, index) in 5"
            :key="index"
            class="w-[600px] max-w-[600px]"
          >
            <div
              class="rounded-[6px] transition-all p-[30px] py-[48px] md:p-[48px] review-card bg-[#F4F6F4] text-[#777E90]"
            >
              <div class="flex items-center">
                <img
                  src="/images/avatar/01.jpg"
                  alt="Awatar"
                  class="rounded-full w-[60px] h-[60px] mr-4"
                />
                <div>
                  <h6 class="text-[16px] font-semibold leading-[24px]">
                    Angel Uriostegui
                  </h6>
                  <p class="text-[14px]">Powerkit</p>
                </div>
              </div>
              <hr class="my-[32px]" />
              <p class="text-[14px] italic mb-[32px]">
                “Leverage agile frameworks to provide a robust synopsis for
                strategy foster collaborative thinking to further the overall
                value proposition. Organically grow the holistic world view of
                disruptive innovation via workplace diversity and empowerment."
              </p>
              <div class="flex">
                <img
                  v-for="i in 4"
                  :key="i"
                  src="/images/icons/star.svg"
                  alt="Star"
                  class="w-[16px] h-[16px]"
                />
              </div>
            </div>
          </swiper-slide>
        </swiper>

        <div class="flex justify-between items-center mb-[10px] md:mb-[80px]">
          <div class="flex items-center gap-[8px]">
            <div
              v-for="(_, i) in 5"
              :key="i"
              class="h-[8px] w-[8px] rounded-full cursor-pointer"
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
              class="h-[48px] w-[48px] rounded-full object-contain cursor-pointer"
              @click="swiperInstance?.slidePrev()"
            />
            <img
              src="/images/icons/arrow-right-sm.svg"
              alt="Right"
              class="h-[48px] w-[48px] rounded-full object-contain cursor-pointer"
              @click="swiperInstance?.slideNext()"
            />
          </div>
        </div>
      </client-only>
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
    };
  },
};
</script>

<style>
.review-slide .swiper-slide-active .review-card {
  background-color: #000e18 !important;
  color: white !important;
}
</style>
