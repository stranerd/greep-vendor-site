<template>
  <section>
    <div class="container px-[20px] md:px-[2rem]">
      <CursiveTitle> Vendor </CursiveTitle>
      <h2
        class="mb-[50px] font-bold text-[24px] md:text-[32px] lg:text-[48px] mt-4"
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
                class="flex flex-col lg:flex-row w-full items-center gap-[24px] md:gap-[40px] lg:gap-[69px] justify-between"
              >
                <div class="max-w-[1006px] w-full lg:min-w-[500px] grow">
                  <img
                    src="/images/vendor-img.jpg"
                    alt="Vendor admin"
                    class="w-full h-auto object-cover"
                  />
                </div>

                <div class="grow max-w-[584px]">
                  <p
                    class="text-[14px] md:text-[16px] lg:text-[20px] leading-[26px] md:leading-[30px] text-[#000E18] mb-6"
                  >
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printegalley of type and scrambled it to make a type
                    specimen book. It has survived not only five centuries, but
                    also the leap into electronic typesetting.
                  </p>
                  <button
                    class="py-[18px] flex items-center px-[24px] bg-[#FFFFFF] border-[1px] rounded-[100px]"
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

          <div class="flex justify-between items-center mb-[80px]">
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
