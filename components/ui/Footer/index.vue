<template>
  <footer class="relative py-[40px] md:py-[80px]">
    <div
      class="container px-[20px] md:px-[2rem] flex flex-col gap-[30px] lg:gap-[0px] lg:flex-row justify-between pt-[0px] md:pt-[48px] py-[48px]"
    >
      <div class="grow">
        <img src="/images/logos/greep-full.svg" alt="Greep" />
      </div>
      <div
        v-for="(footerItem, i) in footerLinks"
        :key="i"
        class="grow hidden lg:block"
      >
        <h6 class="text-[16px] font-semibold mb-[16px]">
          {{ footerItem.name }}
        </h6>
        <nuxt-link
          v-for="link in footerItem.sublinks"
          :key="link.name"
          :to="link.to"
          class="py-2 text-[14px] text-[#001726] block"
        >
          {{ link.name }}
        </nuxt-link>
      </div>
      <div class="lg:max-w-[500px] w-full">
        <h6 class="text-[16px] font-semibold mb-[16px]">Subscribe</h6>
        <p class="text-[#001726] text-[16px]">
          We'll send you an update notification for you to know we are now live
        </p>
        <div class="flex flex-col md:flex-row mt-6 mb-4 gap-4 flex-grow">
          <input
            type="text"
            placeholder="Enter your email"
            class="border-[1px] border-[#001726] p-3 rounded-[12px] grow text-[#505050] text-[16px]"
          />
          <button
            class="border-[1px] max-w-[200px] md:max-w-[100%] rounded-[12px] border-[#001726] p-3"
          >
            Subscribe
          </button>
        </div>
        <small class="text-[12px] max-w-[500px]">
          By subscribing you agree to with our
          <nuxt-link to="/">Privacy Policy</nuxt-link> and provide consent to
          receive updates from our company.
        </small>
      </div>
      <div class="grid lg:hidden grid-cols-2 gap-[30px] lg:gap-[0px] w-full">
        <div v-for="(footerItem, i) in footerLinks" :key="i" class="grow">
          <h6 class="text-[16px] font-semibold mb-[16px]">
            {{ footerItem.name }}
          </h6>
          <nuxt-link
            v-for="link in footerItem.sublinks"
            :key="link.name"
            :to="link.to"
            class="py-2 text-[14px] text-[#001726] block"
          >
            {{ link.name }}
          </nuxt-link>
        </div>
      </div>
    </div>
    <div
      class="container px-[20px] md:px-[2rem] flex flex-col lg:flex-row gap-[30px] justify-between items-center"
    >
      <div class="flex text-[14px] flex-wrap align-center gap-6">
        <p>© {{ new Date().getFullYear() }} Greep. All rights reserved.</p>
        <nuxt-link class="underline" to="/"> Privacy Policy </nuxt-link>
        <nuxt-link class="underline" to="/"> Terms of Service </nuxt-link>
        <p class="underline" to="/">Cookies Settings</p>
      </div>
      <div class="flex gap-[10px]">
        <div
          v-for="(link, i) in socialIcons"
          :key="i"
          class="bg-[#009260] rounded-full h-[32px] w-[32px] md:h-[64px] md:w-[64px] flex items-center justify-center"
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
        to: "/",
      },
      {
        name: "About us",
        to: "/",
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
        to: "/",
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
        to: "/",
      },
      {
        name: "Support",
        to: "/",
      },
      {
        name: "Contact us",
        to: "/",
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
