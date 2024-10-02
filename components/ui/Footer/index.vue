<template>
  <footer class="relative py-[40px] md:py-[80px]">
    <div
      class="container flex flex-col justify-between gap-[30px] px-[20px] py-[48px] pt-[0px] md:px-[2rem] md:pt-[48px] lg:flex-row lg:gap-[0px]"
    >
      <div class="grow">
        <img src="/images/logos/greep-full.svg" alt="Greep" />
      </div>
      <div
        v-for="(footerItem, i) in footerLinks"
        :key="i"
        class="hidden grow lg:block"
      >
        <h6 class="mb-[16px] text-[16px] font-semibold">
          {{ footerItem.name }}
        </h6>
        <nuxt-link
          v-for="link in footerItem.sublinks"
          :key="link.name"
          :to="link.to"
          class="block py-2 text-[14px] text-[#001726]"
        >
          {{ link.name }}
        </nuxt-link>
      </div>
      <div class="w-full lg:max-w-[500px]">
        <h6 class="mb-[16px] text-[16px] font-semibold">Subscribe</h6>
        <p class="text-[16px] text-[#001726]">
          We'll send you an update notification for you to know we are now live
        </p>
        <div class="mb-4 mt-6 flex flex-grow flex-col gap-4 md:flex-row">
          <input
            type="text"
            placeholder="Enter your email"
            class="grow rounded-[12px] border-[1px] border-[#001726] p-3 text-[16px] text-[#505050]"
          />
          <button
            class="max-w-[200px] rounded-[12px] border-[1px] border-[#001726] p-3 md:max-w-[100%]"
          >
            Subscribe
          </button>
        </div>
        <small class="max-w-[500px] text-[12px]">
          By subscribing you agree to with our
          <nuxt-link to="/">Privacy Policy</nuxt-link> and provide consent to
          receive updates from our company.
        </small>
      </div>
      <div class="grid w-full grid-cols-2 gap-[30px] lg:hidden lg:gap-[0px]">
        <div v-for="(footerItem, i) in footerLinks" :key="i" class="grow">
          <h6 class="mb-[16px] text-[16px] font-semibold">
            {{ footerItem.name }}
          </h6>
          <nuxt-link
            v-for="link in footerItem.sublinks"
            :key="link.name"
            :to="link.to"
            class="block py-2 text-[14px] text-[#001726]"
          >
            {{ link.name }}
          </nuxt-link>
        </div>
      </div>
    </div>
    <div
      class="container flex flex-col items-center justify-between gap-[30px] px-[20px] md:px-[2rem] lg:flex-row"
    >
      <div class="align-center flex flex-wrap gap-6 text-[14px]">
        <p>© {{ new Date().getFullYear() }} Greep. All rights reserved.</p>
        <nuxt-link class="underline" to="/"> Privacy Policy </nuxt-link>
        <nuxt-link class="underline" to="/"> Terms of Service </nuxt-link>
        <p class="underline" to="/">Cookies Settings</p>
      </div>
      <div class="flex gap-[10px]">
        <div
          v-for="(link, i) in socialIcons"
          :key="i"
          class="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#009260] md:h-[64px] md:w-[64px]"
        >
          <img
            :src="link.icon"
            :alt="link.alt"
            class="h-[14px] w-[14px] md:h-[24px] md:w-[24px]"
          />
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const footerLinks = ref([
  {
    name: "Company",
    sublinks: [
      {
        name: "Features",
        to: "/#features",
      },
      {
        name: "About us",
        to: "/about",
      },
      {
        name: "Terms of service",
        to: "/",
      },
      {
        name: "Conditions",
        to: "/",
      },
    ],
  },
  {
    name: "Community",
    sublinks: [
      {
        name: "Blog",
        to: "/news",
      },
      {
        name: "Greep APP",
        to: "/",
      },
      {
        name: "Greep FX",
        to: "/",
      },
    ],
  },
  {
    name: "Help",
    sublinks: [
      {
        name: "FAQs",
        to: "/#faqs",
      },
      {
        name: "Support",
        to: "/",
      },
      {
        name: "Contact us",
        to: "/contact",
      },
    ],
  },
]);

const socialIcons = ref([
  {
    icon: "/images/icons/facebook-icon.svg",
    link: "/",
    alt: "Facebook",
  },
  {
    icon: "/images/icons/x-icon.svg",
    link: "/",
    alt: "X",
  },
  {
    icon: "/images/icons/instagram.svg",
    link: "/",
    alt: "Instagram",
  },
]);
</script>

<style></style>
