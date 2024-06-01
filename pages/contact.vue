<template>
  <HeroWrapper class="mt-[33px] mb-[30px] md:mb-[96px]">
    <h1
      class="text-center text-[32px] md:text-[48px] lg:text-[68px] text-[#1A1A1A] font-semibold mb-[14px] leading-[48px] md:leading-[60px] lg:leading-[81.6px]"
    >
      Contact Us
    </h1>
    <div
      class="flex flex-col lg:flex-row items-center gap-[8px] md:gap-[32px] lg:gap-[64px]"
    >
      <a
        href="mailto:email@address.com"
        class="flex gap-[14px] items-center font-mullish text-[16px] md:text-[20px] leading-[24px] md:leading-[32px] font-bold"
      >
        <img
          src="/images/icons/mail-dark.svg"
          alt="Mail"
          class="h-[18px] w-[18px] md:h-[28px] md:w-[28px] object-contain"
        />
        contact@technologycal.com
      </a>

      <a
        href="tel:+6543 8974 210"
        class="flex gap-[14px] items-center font-mullish text-[16px] md:text-[20px] leading-[24px] md:leading-[32px] font-bold"
      >
        <img
          src="/images/icons/phone-icon.svg"
          alt="Call"
          class="h-[18px] w-[18px] md:h-[28px] md:w-[28px] object-contain"
        />
        +(011) 6543 8974 210
      </a>
    </div>
  </HeroWrapper>
  <ContactForm />
  <Faq />
</template>

<script setup lang="ts"></script>

<style></style>
