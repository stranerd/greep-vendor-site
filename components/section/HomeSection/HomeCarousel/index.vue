<template>
  <div>
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
      class="flex gap-[31px] mt-[60px] align-center justify-center w-full overflow-hidden w-full element"
    >
      <img
        v-for="(img, i) in images"
        :key="i"
        :src="img"
        class="min-h-[851px] cover min-w-[500px] max-w-[500px]"
        alt="Carousel"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
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
  min-height: 841px;
}
</style>
