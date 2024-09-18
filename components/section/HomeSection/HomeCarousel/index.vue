<template>
  <div class="align-center flex justify-center overflow-hidden">
    <svg height="0" width="0">
      <defs>
        <clipPath id="svgPath" clipPathUnits="objectBoundingBox">
          <path
            d="M0 0.182717C0 0.182717 0.300421 0 0.5 0C0.699579 0 1 0.182717 1 0.182717V1C1 1 0.69806 0.853201 0.5 0.853201C0.30194 0.853201 0 1 0 1V0.182717Z"
            fill="black"
          />
        </clipPath>
      </defs>
    </svg>
    <div
      class="align-center element max-w-screen flexs mt-[60px] w-full justify-center overflow-hidden"
    >
      <Carousel
        :autoplay="1"
        :transition="1200"
        :breakpoints="{
          400: {
            itemsToShow: 4,
          },
          700: {
            itemsToShow: 5,
          },
          1024: {
            itemsToShow: 6,
          },
        }"
        :wrap-around="true"
        :autoplay-hover-pause="false"
        :speed="10"
      >
        <Slide v-for="(img, i) in images" :key="i">
          <img
            :src="img"
            alt="Carousel"
            class="carousel__item h-[300px] min-h-[300px] w-full object-cover md:min-h-[500px] lg:min-h-[511px]"
          />
        </Slide>
      </Carousel>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

const images = ref([
  "/images/carousel-0.jpg",
  "/images/carousel-1.jpg",
  "/images/carousel-2.jpg",
  "/images/carousel-3.jpg",
  "/images/carousel-4.jpg",
]);
</script>

<style>
.element {
  clip-path: url(#svgPath);
  width: 100%;
  background-position: center;
  min-height: 300px;
  min-width: 700px;
  overflow: hidden;
}
@media (min-width: 768px) {
  .element {
    min-width: 1200px;
    min-height: 400px;
  }
}
@media (min-width: 1024px) {
  .element {
    min-width: 2000px;
    min-height: 500px;
  }
}
.carousel__slide {
  padding: 0 10px;
}
</style>
