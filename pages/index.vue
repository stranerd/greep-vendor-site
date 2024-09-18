<template>
  <img
    class="absolute left-0 top-20 z-[-1] hidden h-auto w-full md:block"
    src="/images/hero-illustration.svg"
    alt="Background"
  />
  <img
    class="absolute left-0 top-[0px] z-[-1] h-auto w-full md:hidden"
    src="/images/mobile-hero-bg.png"
    alt="Background"
  />
  <Hero />
  <HomeCarousel />
  <HomePartners />
  <HomeFeatures />
  <HomeCompany />
  <HomeReview />
  <Faq />
  <AppDownload />
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Greep - Home",
  ogTitle: "Greep - Home",
  applicationName: "Greep",
  description:
    "Greep is your go-to platform for ordering affordable and authentic African food items, designed specifically for Africans living in the diaspora. We bring the taste of home right to your doorstep, with a mission to make your favorite African meals accessible, no matter where you are in the world",
  ogDescription:
    "Greep is your go-to platform for ordering affordable and authentic African food items, designed specifically for Africans living in the diaspora. We bring the taste of home right to your doorstep, with a mission to make your favorite African meals accessible, no matter where you are in the world",
  ogImage:
    "https://res.cloudinary.com/dindu/image/upload/v1715005640/Sign_up_umcf0p.svg",
  twitterCard: "summary_large_image",
  ogType: "website",
  ogLocale: "en_UK",
  twitterImage:
    "https://res.cloudinary.com/dindu/image/upload/v1715005640/Sign_up_umcf0p.svg",
  themeColor: "5b29d6",
});
</script>

<style></style>
