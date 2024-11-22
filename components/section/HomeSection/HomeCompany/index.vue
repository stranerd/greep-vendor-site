<template>
  <section class="">
    <div
      style="
        background-image: url(&quot;/images/know-greep.svg&quot;);
        background-size: contain;
        background-position: top center;
        background-repeat: no-repeat;
      "
      class="bg-[#000E18] pb-[238px] pt-[80px] text-[white]"
    >
      <div class="container bg-[#000E18] px-[20px] md:px-[2rem]">
        <CursiveTitle> Our Company </CursiveTitle>
        <h2 class="mt-4 text-4xl font-bold leading-[57.6px] lg:text-[48px]">
          <span class="notranslate" translate="no">Greep</span> Company
        </h2>
        <p
          class="mx-auto mt-[10px] max-w-[1182px] text-sm lg:mb-[83px] lg:text-center lg:text-[18px]"
        >
          This company is dedicated to celebrating and promoting the cultural
          heritage of the African diaspora while also economically empowering
          entrepreneurs and artisans within this community. Through a global
          marketplace, it offers authentic products, services, and experiences,
          connecting them with a broader audience.
        </p>
      </div>
    </div>
    <div
      class="container -mt-[180px] flex items-center justify-center px-[20px] lg:px-[2rem]"
    >
      <video
        id="video1"
        class="main-vid mx-auto h-[307px] w-auto max-w-[95vw] overflow-hidden rounded-[20px] lg:h-[607px] lg:max-w-[1147px]"
        playsinline
        controls
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
