<template>
  <main>
    <div
      class="grid h-[100vh] w-full lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[700px]"
    >
      <div class="order-last max-w-[100%] bg-[#000E18] p-[58px] lg:order-first">
        <nuxt-link to="/" class="absolute left-[59px] top-[47px]">
          <img src="/images/logos/greep-green.svg" alt="Logo" />
        </nuxt-link>
        <img
          src="/images/app-preview.png"
          alt="App preview"
          class="h: auto m-auto mb-[16px] w-full object-contain md:ml-[90px] md:mt-[48px] md:h-[360px] md:w-auto"
        />
        <h1
          class="text-center text-[30px] font-bold leading-[48px] text-[#FFFFFF]"
        >
          Download <span class="notranslate" translate="no">Greep</span> Today!
        </h1>
        <p
          class="mb-2 text-center text-[18px] font-medium leading-[48px] text-[#fff]"
        >
          Get the App
        </p>
        <div class="flex items-center justify-center gap-[12px]">
          <a href="#">
            <img
              class="h-auto w-full max-w-[135px]"
              src="/images/app-store.png"
              alt="App store download"
            />
          </a>
          <a href="#">
            <img
              class="h-auto w-full max-w-[135px]"
              src="/images/play-store.png"
              alt="App store download"
            />
          </a>
        </div>
      </div>
      <div class="mt-14 flex items-center justify-center px-4 lg:mt-0">
        <slot />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts"></script>

<style></style>
