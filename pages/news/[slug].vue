<template>
  <HeroWrapper class="mt-[33px] mb-[96px]">
    <h1
      class="text-center text-[68px] text-[#1A1A1A] font-semibold mb-[14px] leading-[81.6px]"
    >
      Become an investor at greep
    </h1>
    <div class="flex items-center">
      <img
        src="/images/avatar/article-writer.png"
        alt="Angel Uriostegui"
        class="w-[57px] h-[57px] rounded-full mr-[13px]"
      />
      <h6 class="font-semibold text-[24px] leading-[32px] text-[#000E18]">
        Angel Uriostegui
      </h6>

      <p
        class="text-[#191919] font-medium text-[20px] flex items-center leading-[29px] ml-2"
      >
        <span
          class="bg-[#000E18] h-[5px] w-[5px] rounded-full mr-[20px]"
        ></span>
        January 05, 2024
      </p>
      <p
        class="text-[#191919] font-medium text-[20px] flex items-center leading-[29px] ml-2"
      >
        <span
          class="bg-[#000E18] h-[5px] w-[5px] rounded-full mr-[20px]"
        ></span>
        5 min read
      </p>
    </div>
  </HeroWrapper>
  <div class="container mt-[55px] mb-[77px]">
    <img
      src="/images/single-news.jpg"
      alt="Become an investor at greep"
      class="h-[681px] w-full rounded-[10px] object-cover"
    />
  </div>
  <div class="container">
    <div class="mx-auto max-w-[1248px]">
      <h2 class="font-extrabold text-[40px] leading-[44px] mb-[22px]">
        Automated Google Search Ads Autopilot
      </h2>
      <p class="text-[#808080] font-light text-[20px] leading-[30px]">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum been the industry's standard dummy text ever since
        the 1500s, when an unknown printegalley of type and scrambled it to make
        a type specimen book. It has survived not only five centuries, but also
        the leap into electronic typesetting.
        <br />
        <br />
        remaining essentially unchanged. It was popularised in the 1960s with
        the release of Letrsheets containing Lorem Ipsum passages, and more
        recently with desktop publishing software like Aldus PageMaker including
        versions of Lorem Ipsum.
        <br />
        <br />
        <span class="block ml-[80px] flex items-center mb-[22px]">
          <strong class="mr-3 text-[#2F2F2F] font-bold">01.</strong>
          Listen to what they say about you
        </span>

        <span class="block ml-[80px] flex items-center mb-[22px]">
          <strong class="mr-3 text-[#2F2F2F] font-bold">02.</strong>
          Randomised words which don't look even slightly believable.
        </span>
        <span class="block ml-[80px] flex items-center mb-[22px]">
          <strong class="mr-3 text-[#2F2F2F] font-bold">03.</strong>
          Lorem Ipsum generators on the Internet tend to repeat predefined
          chunks
        </span>
        <span class="block ml-[80px] flex items-center">
          <strong class="mr-3 text-[#2F2F2F] font-bold">04.</strong>
          Automate multiple scenarios and eliminate tedious tasks.
        </span>
        <br />
        <br />
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum been the industry's standard dummy text ever since
        the 1500s, when an unknown printegalley of type and scrambled it to make
        a type specimen book.
      </p>
      <img
        src="/images/news-img-2.jpg"
        alt="News"
        class="max-w-[970px] w-full h-[472px] object-cover mx-auto my-[56px]"
      />
      <p class="text-[#777E90] font-light text-[20px] leading-[30px] mb-[80px]">
        The rich text element allows you to create and format headings,
        paragraphs, block-quotes, images, and video all in one place instead of
        having to add and format them individually. Just double-click and easily
        create content.
        <br />
        <br />
        For dynamic content, add a rich text field to any collection and then
        connect a rich text element to that field in the settings panel.
        Headings, paragraphs, block-quotes, figures, images, and figure captions
        can all be styled.
      </p>
      <h5 class="mb-4 font-semibold text-[24px] leading-[32px]">
        We love design beautiful things.
      </h5>
      <p class="text-[#777E90] font-light text-[20px] leading-[30px] mb-[80px]">
        Headings, paragraphs, blockquotes, figures, images, and figure captions
        can all be styled after a class is added to the rich text element using
        the "When inside of" nested selector system. A rich text element can be
        used with static or dynamic content. For static content, just drop it
        into any page and begin editing.
      </p>
    </div>
  </div>
  <div class="container">
    <CursiveTitle>News </CursiveTitle>
    <h2 class="text-[64px] font-semibold leading-[75px] mt-[8px] mb-10">
      Related Posts
    </h2>
    <div class="grid grid-cols-3 gap-y-[40px] gap-x-[30px]">
      <NewsCard v-for="(card, i) in newsItems" :key="i" :cardData="card" />
    </div>
  </div>
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
]);
</script>

<style></style>
