<template>
  <HeroWrapper class="mt-[33px] mb-[96px]">
    <h1
      class="text-center text-[68px] text-[#1A1A1A] font-semibold mb-[14px] leading-[81.6px]"
    >
      Contact Us
    </h1>
    <div class="flex items-center gap-[64px]">
      <a
        href="mailto:email@address.com"
        class="flex gap-[14px] items-center font-mullish text-[20px] leading-[32px] font-bold"
      >
        <img
          src="/images/icons/mail-dark.svg"
          alt="Mail"
          class="h-[28px] w-[28px] object-contain"
        />
        contact@technologycal.com
      </a>

      <a
        href="tel:+6543 8974 210"
        class="flex gap-[14px] items-center font-mullish text-[20px] leading-[32px] font-bold"
      >
        <img
          src="/images/icons/phone-icon.svg"
          alt="Call"
          class="h-[28px] w-[28px] object-contain"
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
