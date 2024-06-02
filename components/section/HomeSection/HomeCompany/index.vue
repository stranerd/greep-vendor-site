<template>
  <section class="">
    <div
      style="
        background-image: url('/images/know-greep.svg');
        background-size: contain;
        background-position: top center;
        background-repeat: no-repeat;
      "
      class="bg-[#000E18] text-[white] pt-[80px] pb-[238px]"
    >
      <div class="container px-[20px] md:px-[2rem] bg-[#000E18]">
        <CursiveTitle> Our Company </CursiveTitle>
        <h2 class="text-[48px] mt-4 font-bold leading-[57.6px]">
          Greep Company
        </h2>
        <p
          class="text-[18px] text-center mt-[10px] max-w-[1182px] mb-[83px] mx-auto"
        >
          This company is dedicated to celebrating and promoting the cultural
          heritage of the African diaspora while also economically empowering
          entrepreneurs and artisans within this community. Through a global
          marketplace, it offers authentic products, services, and experiences,
          connecting them with a broader audience.
        </p>
      </div>
    </div>
    <div class="container px-[20px] md:px-[2rem] -mt-[180px]">
      <video
        id="video1"
        class="main-vid max-w-[1147px] mx-auto rounded-[20px] overflow-hidden w-auto h-[607px]"
        playsinline
      >
        <source
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style></style>
