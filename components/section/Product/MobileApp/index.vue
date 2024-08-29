<template>
  <section class="mt-[40px]">
    <div class="container px-[20px] md:px-[2rem]">
      <CursiveTitle> Users </CursiveTitle>
      <h2
        class="mb-[50px] mt-4 text-[24px] font-bold md:text-[32px] lg:text-[48px]"
      >
        Greep Mobile App
      </h2>
      <p
        class="mx-auto max-w-[581px] text-left text-[14px] leading-[24px] text-[#000E18] md:text-center md:text-[16px] lg:text-[20px]"
      >
        <!-- <strong>{{ activeIndex + 1 }}.</strong> -->
        {{ productItems[activeIndex].description }}
      </p>

      <swiper
        :modules="[Navigation, Pagination, Autoplay, Keyboard, Virtual]"
        :slides-per-view="5"
        :navigation="true"
        :virtual="true"
        :pagination="true"
      >
        <swiper-slide v-for="i in 20">
          <div class="h-40 w-40 bg-green-500">{{ i }}</div>
        </swiper-slide>
        <template v-slot:container-start><span>Container start</span></template>
        <template v-slot:container-end><span>Container end</span></template>
        <template v-slot:wrapper-start><span>Wrapper start</span></template>
        <template v-slot:wrapper-end><span>Wrapper end</span></template>
      </swiper>

      <div class="mx-auto my-[50px] max-w-[1253.84px]">
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
              v-for="(img, i) in productItems"
              :key="i"
              :class="i === activeIndex + 2 ? 'active-slide' : getClass(i)"
            >
              <img :src="img.image" :alt="img.image" class="max-h-[622px]" />
            </swiper-slide>
          </swiper>
        </client-only>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import {
  Navigation,
  Pagination,
  Autoplay,
  Keyboard,
  Virtual,
} from "swiper/modules";

// Import Swiper styles
//:centeredSlides="true"
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const activeIndex = ref(0);
const onSwiper = (swiper: any) => {
  console.log(swiper);
};
const onSlideChange = (swiper: any) => {
  console.log("slide change", { swiper });
  activeIndex.value = swiper.activeIndex;
};

const modules = [Navigation, Pagination];

const productItems = ref([
  {
    image: "/images/products/4.jpg",
    description:
      "Browse thousands of products from various vendors with ease using the Greep mobile app. Our app allows you to search, filter, and discover new products from the comfort of your own home. With high-quality product images and detailed descriptions, you'll be able to make informed purchasing decisions on the go.",
  },
  {
    image: "/images/products/5.jpg",
    description:
      "Discover a world of quality products at your fingertips with the Greep mobile app. Our user-friendly interface makes it easy to find exactly what you need, whether you're shopping for electronics, fashion, or home goods.",
  },
  {
    image: "/images/products/1.jpg",
    description:
      "Enjoy the convenience of online shopping with the Greep mobile app. Our secure payment options and fast shipping ensure a hassle-free experience. Plus, with exclusive deals and discounts, you'll always get the best value for your money.",
  },
  {
    image: "/images/products/2.jpg",
    description:
      "Greep is more than just an app; it's your personal shopping assistant. Our personalized recommendations and saved favorites make it easy to find the products you love.",
  },
  {
    image: "/images/products/3.jpg",
    description:
      "Upgrade your shopping experience with the Greep mobile app. Our intuitive design and seamless navigation make it a joy to use. Whether you're a seasoned shopper or just starting out, Greep has something for everyone.",
  },
  {
    image: "/images/products/1.jpg",
    description:
      "Enjoy the convenience of online shopping with the Greep mobile app. Our secure payment options and fast shipping ensure a hassle-free experience. Plus, with exclusive deals and discounts, you'll always get the best value for your money.",
  },
  {
    image: "/images/products/4.jpg",
    description:
      "Browse thousands of products from various vendors with ease using the Greep mobile app. Our app allows you to search, filter, and discover new products from the comfort of your own home. With high-quality product images and detailed descriptions, you'll be able to make informed purchasing decisions on the go.",
  },
  {
    image: "/images/products/5.jpg",
    description:
      "Discover a world of quality products at your fingertips with the Greep mobile app. Our user-friendly interface makes it easy to find exactly what you need, whether you're shopping for electronics, fashion, or home goods.",
  },
  {
    image: "/images/products/1.jpg",
    description:
      "Enjoy the convenience of online shopping with the Greep mobile app. Our secure payment options and fast shipping ensure a hassle-free experience. Plus, with exclusive deals and discounts, you'll always get the best value for your money.",
  },
  {
    image: "/images/products/2.jpg",
    description:
      "Greep is more than just an app; it's your personal shopping assistant. Our personalized recommendations and saved favorites make it easy to find the products you love.",
  },
  {
    image: "/images/products/3.jpg",
    description:
      "Upgrade your shopping experience with the Greep mobile app. Our intuitive design and seamless navigation make it a joy to use. Whether you're a seasoned shopper or just starting out, Greep has something for everyone.",
  },
]);

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
@media (max-width: 600px) {
  .product-main-slider .smaller-left {
    transform: scale(0.65) translateX(100px) !important;
  }
  .product-main-slider .smaller-right {
    transform: scale(0.65) translateX(-80px) !important;
    z-index: -1 !important;
  }
  .product-main-slider .big-right {
    transform: scale(0.75) translateX(-15px) !important;
  }
  .product-main-slider .big-left {
    transform: scale(0.75) translateX(15px) !important;
  }
}
</style>
