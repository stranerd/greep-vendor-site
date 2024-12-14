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
  <HomeFeatures id="features" />
  <HomeCompany />
  <HomeReview />
  <Faq id="faqs" />
  <AppDownload />
</template>

<style></style>
