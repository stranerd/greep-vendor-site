<template>
  <nav class="container sticky top-0 z-[40] pt-10">
    <div
      class="flex items-center justify-between p-6 bg-[#FCFCFD bg-[#fff] border-[#F1F1F3] border-[1px] rounded-[100px]"
    >
      <div class="flex items-center">
        <nuxt-link to="/" class="mr-[50px]">
          <Avatar size="base">
            <AvatarImage src="/images/logos/greep.svg" alt="Greep" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </nuxt-link>

        <div>
          <nuxt-link
            v-for="(link, i) in navLinks"
            :key="i"
            :to="link.to"
            class="px-6 py-[14px] rounded-[100px]"
            active-class="bg-[#F7F7F8] border-[1px] border-[#F1F1F3]"
            >{{ link.name }}</nuxt-link
          >
        </div>
      </div>
      <Button
        variant="withIcon"
        size="lg"
        rounded="lg"
        @click="router.push('/login')"
        >Get Started
        <div class="bg-[#000E18] rounded-full p-[14px] ml-[10px] mr-[-20px]">
          <img
            src="/images/icons/mail-white.svg"
            alt="Mail Icon"
            class="h-[20px] w-[20px] object-contain"
          />
        </div>
      </Button>
    </div>
  </nav>
</template>

<script setup lang="ts">
const router = useRouter();
const navLinks = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "About",
    to: "/about",
  },
  {
    name: "Product",
    to: "/product",
  },
  {
    name: "News",
    to: "/news",
  },
];
</script>

<style></style>
