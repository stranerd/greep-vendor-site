<template>
  <section class="mt-[40px]">
    <div class="container">
      <CursiveTitle> Users </CursiveTitle>
      <h2 class="mb-[50px] font-bold text-[48px] mt-4">Greep Mobile App</h2>
      <p
        class="max-w-[581px] text-center mx-auto text-[20px] leading-[24px] text-[#000E18]"
      >
        <strong>{{ activeIndex + 1 }}.</strong>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra nunc
        ante velit vitae. Est tellus vitae, nullam lobortis enim. Faucibus amet
        etiam tincidunt rhoncus, ullamcorper velit. Ullamcorper risus tempor, ac
        nunc libero urna, feugiat.
      </p>
      <div class="max-w-[1253.84px] mx-auto my-[50px]">
        <client-only>
          <swiper
            class="product-main-slider"
            :slides-per-view="5"
            :space-between="0"
            :navigation="true"
            :modules="modules"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
          >
            <swiper-slide
              v-for="(img, i) in items"
              :key="i"
              :class="i === activeIndex + 2 ? 'active-slide' : getClass(i)"
            >
              <img :src="img" :alt="img" class="max-h-[622px]" />
            </swiper-slide>
          </swiper>
        </client-only>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
//:centeredSlides="true"
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const activeIndex = ref(0);
    const onSwiper = (swiper: any) => {
      console.log(swiper);
    };
    const onSlideChange = (swiper: any) => {
      console.log("slide change", { swiper });
      activeIndex.value = swiper.activeIndex;
    };

    const items = [
      "/images/products/4.jpg",
      "/images/products/5.jpg",
      "/images/products/1.jpg",
      "/images/products/2.jpg",
      "/images/products/3.jpg",
      "/images/products/1.jpg",
      "/images/products/4.jpg",
      "/images/products/5.jpg",
      "/images/products/1.jpg",
      "/images/products/2.jpg",
      "/images/products/3.jpg",
    ];

    const getClass = (i: number) => {
      const middleNum = activeIndex.value + 2;

      const smallerleft = middleNum - 2;
      const higherRight = middleNum + 2;
      const isRight = i > middleNum;
      if (i === smallerleft) {
        return `smaller-left`;
      }
      if (i === higherRight) {
        return "smaller-right";
      }
      return `${isRight ? "big-right" : "big-left"}`;
    };

    return {
      onSwiper,
      onSlideChange,
      items,
      modules: [Navigation, Pagination],
      activeIndex,
      getClass,
    };
  },
};
</script>

<style>
.product-main-slider .swiper-slide {
  transform: scale(0.75) !important;
  transition: all 0.6s;
  background-color: white;
}
.product-main-slider .swiper-slide img {
  opacity: 1;
  transition: all 0.6s;
}
.product-main-slider .smaller-left {
  transform: scale(0.65) translateX(210px) !important;
}
.product-main-slider .smaller-left img {
  opacity: 0.3;
}
.product-main-slider .smaller-right {
  transform: scale(0.65) translateX(-210px) !important;
  z-index: -1 !important;
}
.product-main-slider .smaller-right img {
  opacity: 0.3;
}
.product-main-slider .big-right {
  transform: scale(0.75) translateX(-35px) !important;
}
.product-main-slider .big-right img {
  opacity: 0.5;
}
.product-main-slider .big-left {
  transform: scale(0.75) translateX(35px) !important;
}
.product-main-slider .big-left img {
  opacity: 0.5;
}
.swiper-slide-active {
}
.product-main-slider .active-slide {
  transform: scale(1) !important;
}

.product-main-slider .swiper-button-next {
  background-image: url("/images/icons/right-icon.svg");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 10rem;
  opacity: 0.8;
  width: 84px;
  height: 84px;
  right: 0rem;
  transition: all 0.3s ease;
  /* @include screenMax("mobile") {
        right: 1.6rem;
        width: 4rem;
        height: 4rem;
        // border-top: 2rem solid transparent;
        // border-left: 2rem solid $black;
        // border-bottom: 2rem solid transparent;
      } */
}
.product-main-slider .swiper-button-next::after,
.product-main-slider .swiper-button-prev::after {
  display: none;
}
.product-main-slider .swiper-button-prev {
  background-image: url("/images/icons/left-icon.svg");
  background-position: center;
  background-size: contain;
  border-radius: 10rem;
  background-repeat: no-repeat;
  opacity: 0.8;
  width: 84px;
  height: 84px;
  left: 0rem;
  transition: all 0.3s ease;
  /* @include screenMax("mobile") {
        left: 1.6rem;
        width: 4rem;
        height: 4rem;
        // border-top: 2rem solid transparent;
        // border-right: 2rem solid $black;
        // border-bottom: 2rem solid transparent;
      } */
}
</style>
