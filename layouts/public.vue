<template>
  <main>
    <div
      class="w-full grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[700px] h-[100vh]"
    >
      <div class="bg-[#000E18] max-w-[100%] p-[58px] order-last lg:order-first">
        <nuxt-link to="/" class="absolute top-[47px] left-[59px]">
          <img src="/images/logos/greep-green.svg" alt="Logo" />
        </nuxt-link>
        <img
          src="/images/app-preview.png"
          alt="App preview"
          class="h: auto md:h-[585px] w-full md:w-auto md:mt-[148px] object-contain mb-[56px] md:ml-[90px] m-auto"
        />
        <h1
          class="text-[#FFFFFF] text-center leading-[48px] text-[36px] mb-4 font-bold"
        >
          Download Greep Today!
        </h1>
        <p
          class="text-[18px] leading-[48px] text-[#fff] text-center font-medium mb-2"
        >
          Get the App
        </p>
        <div class="flex gap-[12px] items-center justify-center">
          <a href="#">
            <img
              class="max-w-[135px] w-full h-auto"
              src="/images/app-store.png"
              alt="App store download"
            />
          </a>
          <a href="#">
            <img
              class="max-w-[135px] w-full h-auto"
              src="/images/play-store.png"
              alt="App store download"
            />
          </a>
        </div>
      </div>
      <div class="flex items-center justify-center py-12 px-4 mt-14 lg:mt-0">
        <slot />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts"></script>

<style></style>
