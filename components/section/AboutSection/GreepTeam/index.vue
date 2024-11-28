<template>
  <section class="py-[40px] md:py-[80px]">
    <div class="container px-[20px] md:px-[2rem]">
      <div>
        <CursiveTitle> Meet our team </CursiveTitle>
      </div>
      <h2
        class="mb-6 mt-[16px] text-[32px] font-semibold leading-[48px] md:text-[48px] md:leading-[60px] lg:text-[64px] lg:leading-[75px]"
      >
        Our team
      </h2>
      <p class="mb-[80px] text-[16px] leading-[27px] md:text-[18px]">
        Meet the resilient team behind GREEP.
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
            class="w-full max-w-[404px] md:w-[404px]"
          >
            <div>
              <img :src="member.img" :alt="member.name" />
              <div class="bg-[#FCFCFD] p-[32px]">
                <h4
                  class="mb-2 min-h-[32px] text-[18px] font-semibold leading-[32px] text-[#23262F] md:min-h-[64px] md:text-[20px] lg:text-[24px]"
                >
                  {{ member.name }}
                </h4>
                <p
                  class="text-[14px] leading-[24px] text-[#777E90] md:text-[16px]"
                >
                  {{ member.position }}
                </p>
                <div
                  class="mt-[24px] flex items-center gap-4 md:mt-[32px] md:gap-6"
                >
                  <a :href="member.socials.linkedin">
                    <img
                      src="/images/icons/linkedin-black.svg"
                      alt="Linked In"
                      class=""
                    />
                  </a>
                  <a :href="member.socials.x">
                    <img src="/images/icons/x.svg" alt="X" />
                  </a>
                  <a :href="member.socials.instagram">
                    <img
                      src="/images/icons/instagram-black.svg"
                      alt="Instagram"
                      class=""
                    />
                  </a>
                </div>
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
        position: "CEO",
        socials: { linkedin: "", x: "", instagram: "" },
      },
      {
        img: "/images/team/wisdom.jpg",
        name: "Wisdom Agunta",
        position: "COO",
        socials: { linkedin: "", x: "", instagram: "" },
      },
      {
        img: "/images/team/david.jpg",
        name: "Abasifreke David",
        position: "CMO",
        socials: { linkedin: "", x: "", instagram: "" },
      },
      {
        img: "/images/team/josiah.jpg",
        name: "Josiah Ayanfeoluwa Opaleke",
        position: "Product Designer",
        socials: { linkedin: "", x: "", instagram: "" },
      },
      // {
      //   img: "/images/team/jerry.jpg",
      //   name: "Jeremiah Godwin Nwachukwu",
      //   position: "COO",
      // },
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
