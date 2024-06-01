<template>
  <section class="py-[40px] md:py-[80px]">
    <div class="container">
      <div>
        <CursiveTitle> Meet our team </CursiveTitle>
      </div>
      <h2
        class="text-[32px] md:text-[48px] lg:text-[64px] font-semibold leading-[48px] md:leading-[60px] lg:leading-[75px] mt-[16px] mb-6"
      >
        Our team
      </h2>
      <p class="text-[16px] md:text-[18px] leading-[27px] mb-[80px]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <client-only>
        <swiper
          items
          :slides-per-view="'auto'"
          class="team-slider"
          :space-between="48"
          :navigation="true"
          :modules="modules"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <swiper-slide
            v-for="(member, index) in team"
            :key="index"
            class="w-full md:w-[404px] max-w-[404px]"
          >
            <div>
              <img :src="member.img" :alt="member.name" />
              <div class="bg-[#FCFCFD] p-[32px]">
                <h4
                  class="text-[18px] md:text-[20px] lg:text-[24px] leading-[32px] font-semibold mb-2 text-[#23262F] min-h-[32px] md:min-h-[64px]"
                >
                  {{ member.name }}
                </h4>
                <p
                  class="text-[#777E90] text-[14px] md:text-[16px] leading-[24px]"
                >
                  {{ member.position }}
                </p>
                <div
                  class="flex items-center mt-[24px] md:mt-[32px] gap-4 md:gap-6"
                >
                  <a href="#">
                    <img src="/images/icons/linkedin.svg" alt="Linked In" />
                  </a>
                  <a href="#">
                    <img src="/images/icons/x.svg" alt="Linked In" />
                  </a>
                  <a href="#">
                    <img
                      src="/images/icons/instagram-team.svg"
                      alt="Linked In"
                    />
                  </a>
                </div>
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
    const team = [
      {
        img: "/images/team/jerry.jpg",
        name: "Jeremiah Godwin Nwachukwu",
        position: "COO",
      },
      {
        img: "/images/team/wisdom.jpg",
        name: "Wisdom Agunta",
        position: "COO",
      },
      {
        img: "/images/team/david.jpg",
        name: "Abasifreke David",
        position: "CMO",
      },
      {
        img: "/images/team/josiah.jpg",
        name: "Josiah Ayanfeoluwa Opaleke",
        position: "Product Designer",
      },
      {
        img: "/images/team/jerry.jpg",
        name: "Jeremiah Godwin Nwachukwu",
        position: "COO",
      },
    ];

    return {
      onSwiper,
      onSlideChange,
      modules: [Navigation, Pagination],
      swiperInstance,
      team,
    };
  },
};
</script>

<style>
.team-slider {
  padding-bottom: 30px;
}
.team-slider .swiper-button-next {
  display: none;
}
.team-slider .swiper-button-next::after,
.team-slider .swiper-button-prev::after {
  display: none;
}
.team-slider .swiper-button-prev {
  display: none;
}
</style>
