<template>
  <HeroWrapper class="mt-[33px] mb-[30px] md:mb-[96px]">
    <h1
      class="text-center text-[32px] md:text-[48px] lg:text-[68px] text-[#1A1A1A] font-semibold mb-[14px] leading-[48px] md:leading-[60px] lg:leading-[81.6px]"
    >
      Latest News & article
    </h1>
    <p
      class="text-[#4C4C4D] font-medium font-urbanist max-w-[439px] text-[18px] leading-[27px] text-center"
    >
      Stay up to date and get to know the latest stories and news on Greep
    </p>
  </HeroWrapper>
  <section class="pb-[40px] md:pb-[60px] lg:pb-[80px]">
    <div class="container">
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[20px] md:gap-y-[40px] gap-x-[30px]"
      >
        <NewsCard v-for="(card, i) in newsItems" :key="i" :cardData="card" />
      </div>
    </div>
  </section>
  <AppDownload />
</template>

<script setup lang="ts">
const newsItems = ref([
  {
    tag: "News",
    date: "Jan 07, 2024",
    title: "Curating a workspace that inspires all of us",
    details:
      "Lorem Ipsum is simply dummy text the printing and typesetting industry. Lorem Ipsum has been the standard dummy.",
    img: "/images/news/0.jpg",
  },
  {
    tag: "Article",
    date: "Jan 07, 2024",
    title: "Curating a workspace that inspires all of us",
    details:
      "Lorem Ipsum is simply dummy text the printing and typesetting industry. Lorem Ipsum has been the standard dummy.",
    img: "/images/news/1.jpg",
  },
  {
    tag: "News",
    date: "Jan 07, 2024",
    title: "Curating a workspace that inspires all of us",
    details:
      "Lorem Ipsum is simply dummy text the printing and typesetting industry. Lorem Ipsum has been the standard dummy.",
    img: "/images/news/2.jpg",
  },
  {
    tag: "News",
    date: "Jan 07, 2024",
    title: "Curating a workspace that inspires all of us",
    details:
      "Lorem Ipsum is simply dummy text the printing and typesetting industry. Lorem Ipsum has been the standard dummy.",
    img: "/images/news/3.jpg",
  },
  {
    tag: "News",
    date: "Jan 07, 2024",
    title: "Curating a workspace that inspires all of us",
    details:
      "Lorem Ipsum is simply dummy text the printing and typesetting industry. Lorem Ipsum has been the standard dummy.",
    img: "/images/news/0.jpg",
  },
  {
    tag: "News",
    date: "Jan 07, 2024",
    title: "Curating a workspace that inspires all of us",
    details:
      "Lorem Ipsum is simply dummy text the printing and typesetting industry. Lorem Ipsum has been the standard dummy.",
    img: "/images/news/1.jpg",
  },
  {
    tag: "News",
    date: "Jan 07, 2024",
    title: "Curating a workspace that inspires all of us",
    details:
      "Lorem Ipsum is simply dummy text the printing and typesetting industry. Lorem Ipsum has been the standard dummy.",
    img: "/images/news/2.jpg",
  },
  {
    tag: "News",
    date: "Jan 07, 2024",
    title: "Curating a workspace that inspires all of us",
    details:
      "Lorem Ipsum is simply dummy text the printing and typesetting industry. Lorem Ipsum has been the standard dummy.",
    img: "/images/news/1.jpg",
  },
  {
    tag: "News",
    date: "Jan 07, 2024",
    title: "Curating a workspace that inspires all of us",
    details:
      "Lorem Ipsum is simply dummy text the printing and typesetting industry. Lorem Ipsum has been the standard dummy.",
    img: "/images/news/3.jpg",
  },
]);
</script>

<style></style>
